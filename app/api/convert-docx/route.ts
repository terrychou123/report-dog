import { NextRequest, NextResponse } from "next/server";
import JSZip from "jszip";

export async function POST(req: NextRequest) {
  const { html, filename } = await req.json();

  const htmlToDocx = (await import("html-to-docx")).default;
  const buffer = await htmlToDocx(html, null, {
    pageSize: { width: 11906, height: 16838 }, // A4: 210mm × 297mm in TWIPs
    margins: {
      top: 1134,    // 2cm (1cm = 567 TWIPs)
      right: 1134,
      bottom: 1134,
      left: 1134,
      header: 709,  // ~1.25cm
      footer: 709,
      gutter: 0,
    },
    font: "Calibri",
    fontSize: 24,              // 12pt (half-points)
    complexScriptFontSize: 24, // CJK font size
    lang: "zh-TW",
    table: { row: { cantSplit: true } },
    footer: false,
    pageNumber: false,
  });

  // Post-process: fix OOXML compliance issues caused by html-to-docx
  const zip = await JSZip.loadAsync(buffer as Buffer);
  const docXmlFile = zip.file("word/document.xml");
  if (docXmlFile) {
    let docXml = await docXmlFile.async("string");

    // Fix 1: Remove ="undefined" attribute values generated for unset margins
    docXml = docXml.replace(/ w:\w+="undefined"/g, "");

    // Fix 2: html-to-docx places <w:sectPr> at the start of <w:body>.
    // OOXML spec requires sectPr to be the LAST direct child of body.
    // Word Online enforces this strictly; LibreOffice tolerates it.
    const sectPrMatch = docXml.match(/(<w:body[^>]*>)(\s*)(<w:sectPr[\s\S]*?<\/w:sectPr>)/);
    if (sectPrMatch) {
      const bodyOpen = sectPrMatch[1];
      const sectPrContent = sectPrMatch[3];
      // Remove sectPr from beginning of body
      docXml = docXml.replace(bodyOpen + sectPrMatch[2] + sectPrContent, bodyOpen);
      // Insert sectPr as the last child, before </w:body>
      docXml = docXml.replace(/<\/w:body>/, sectPrContent + "\n</w:body>");
    }

    // Fix 3: html-to-docx generates fractional gridCol widths (e.g. 1606.333...)
    // OOXML requires integer TWIPs. Word Online renders incorrectly with float values.
    // Strategy: round each column, then fix the last column to absorb rounding error.
    docXml = docXml.replace(
      /(<w:tblGrid>)([\s\S]*?)(<\/w:tblGrid>)/g,
      (_match, open, inner, close) => {
        const cols: number[] = [];
        inner.replace(/w:w="([^"]+)"/g, (_: string, val: string) => {
          cols.push(parseFloat(val));
          return _;
        });
        if (cols.length === 0) return open + inner + close;
        const rounded = cols.map(Math.round);
        const diff = Math.round(cols.reduce((a, b) => a + b, 0)) - rounded.reduce((a, b) => a + b, 0);
        rounded[rounded.length - 1] += diff; // absorb rounding error in last column
        let i = 0;
        const fixedInner = inner.replace(/w:w="[^"]+"/g, () => `w:w="${rounded[i++]}"`);
        return open + fixedInner + close;
      }
    );

    // Fix 4: Add tblLayout=fixed + switch jc=center to jc=left.
    // Without fixed layout, Word auto-expands columns beyond the page width.
    // jc=center on a full-width table causes symmetric overflow when Word Online
    // computes content width slightly differently → left edge gets clipped.
    // jc=left with tblInd=0 anchors the table to the left margin safely.
    docXml = docXml.replace(/<w:tblPr>([\s\S]*?)<\/w:tblPr>/g, (match, inner) => {
      let fixed = inner;
      if (!fixed.includes("w:tblLayout")) {
        fixed += '<w:tblLayout w:type="fixed"/>';
      }
      // Replace center/right alignment with left + explicit zero indent
      fixed = fixed.replace(/<w:jc w:val="center"\s*\/>/, '<w:jc w:val="left"/>');
      fixed = fixed.replace(/<w:jc w:val="right"\s*\/>/, '<w:jc w:val="left"/>');
      if (!fixed.includes("w:tblInd")) {
        fixed += '<w:tblInd w:w="0" w:type="dxa"/>';
      }
      return `<w:tblPr>${fixed}</w:tblPr>`;
    });

    // Fix 5: Add insideH/insideV borders that html-to-docx omits.
    // Without them, internal cell borders rely on auto layout rendering;
    // with fixed layout they become invisible.
    docXml = docXml.replace(/<w:tblBorders>([\s\S]*?)<\/w:tblBorders>/g, (match, inner) => {
      if (inner.includes("insideH")) return match;
      const inside =
        '\n          <w:insideH w:val="single" w:sz="2" w:space="0" w:color="000000"/>' +
        '\n          <w:insideV w:val="single" w:sz="2" w:space="0" w:color="000000"/>';
      return `<w:tblBorders>${inner}${inside}\n        </w:tblBorders>`;
    });

    // Fix 6: Add tcW to cells that lack it.
    // tblLayout=fixed requires explicit tcW on each cell to know column widths;
    // without it some renderers fall back to auto sizing and overflow again.
    // Derive each cell's width from its w:gridSpan × the corresponding gridCol widths.
    docXml = docXml.replace(
      /(<w:tbl>|<w:tbl[\s>])([\s\S]*?)(<\/w:tbl>)/g,
      (tblMatch, tblOpen, tblInner, tblClose) => {
        // Extract gridCol widths for this table
        const gridColMatch = tblInner.match(/<w:tblGrid>([\s\S]*?)<\/w:tblGrid>/);
        if (!gridColMatch) return tblMatch;
        const gridCols: number[] = [];
        gridColMatch[1].replace(/w:w="(\d+)"/g, (_: string, w: string) => {
          gridCols.push(parseInt(w, 10));
          return _;
        });
        if (gridCols.length === 0) return tblMatch;

        // For each row, assign tcW to cells that have none
        const fixedInner = tblInner.replace(
          /(<w:tr[\s\S]*?>)([\s\S]*?)(<\/w:tr>)/g,
          (_rowMatch: string, rowOpen: string, rowInner: string, rowClose: string) => {
            let colIdx = 0;
            const fixedRow = rowInner.replace(
              /(<w:tc>|<w:tc[\s>])([\s\S]*?)(<\/w:tc>)/g,
              (_cellMatch: string, cellOpen: string, cellInner: string, cellClose: string) => {
                // Read gridSpan
                const spanMatch = cellInner.match(/w:gridSpan[\s\S]*?w:val="(\d+)"/);
                const span = spanMatch ? parseInt(spanMatch[1], 10) : 1;
                // Sum up gridCol widths for this span
                const cellWidth = gridCols
                  .slice(colIdx, colIdx + span)
                  .reduce((a, b) => a + b, 0);
                colIdx += span;
                // Only add tcW if missing
                if (cellInner.includes("w:tcW")) {
                  return cellOpen + cellInner + cellClose;
                }
                // Insert tcW into tcPr, or create tcPr if absent
                let newInner: string;
                if (cellInner.includes("w:tcPr")) {
                  newInner = cellInner.replace(
                    /(<w:tcPr>|<w:tcPr[\s>])/,
                    `$1<w:tcW w:w="${cellWidth}" w:type="dxa"/>`
                  );
                } else {
                  newInner = `<w:tcPr><w:tcW w:w="${cellWidth}" w:type="dxa"/></w:tcPr>` + cellInner;
                }
                return cellOpen + newInner + cellClose;
              }
            );
            return rowOpen + fixedRow + rowClose;
          }
        );
        return tblOpen + fixedInner + tblClose;
      }
    );

    zip.file("word/document.xml", docXml);
  }

  const fixedBuffer = await zip.generateAsync({
    type: "nodebuffer",
    compression: "DEFLATE",
    compressionOptions: { level: 6 },
  });

  return new NextResponse(new Uint8Array(fixedBuffer), {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "Content-Disposition": `attachment; filename="${encodeURIComponent(filename)}.docx"`,
    },
  });
}
