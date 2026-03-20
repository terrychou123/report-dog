export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

export function excelJsonToText(jsonStr: string): string {
  try {
    const data = JSON.parse(jsonStr);
    if (Array.isArray(data)) {
      return data
        .map((row: Record<string, unknown>) =>
          Object.entries(row)
            .map(([k, v]) => `${k}: ${v}`)
            .join('、')
        )
        .join('\n');
    }
    return JSON.stringify(data, null, 2);
  } catch {
    return jsonStr;
  }
}

export function processContent(content: string | null, fileType: string | null): string {
  if (!content) return '';
  const type = fileType?.toLowerCase() ?? '';
  if (type === 'word' || type === 'docx') return stripHtml(content);
  if (type === 'excel' || type === 'xlsx' || type === 'csv') return excelJsonToText(content);
  return content;
}
