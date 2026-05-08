import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import { join } from "node:path";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-dynamic";

export default async function Image() {
  const fontBold = readFileSync(join(process.cwd(), "fonts/NotoSansTC-Bold.ttf"));
  const fontRegular = readFileSync(join(process.cwd(), "fonts/NotoSansTC-Regular.ttf"));

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: "#faf9f6",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "56px 80px",
          position: "relative",
          fontFamily: '"NotoSansTC"',
        }}
      >
        {/* left accent bar */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 10,
            height: 630,
            background: "#E25F27",
          }}
        />

        {/* brand */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: 36, gap: 14 }}>
          <span style={{ fontSize: 22, color: "#2B7C96", fontWeight: 700 }}>報告汪</span>
          <span style={{ fontSize: 22, color: "#c0b8af" }}>·  AI 評鑑文書管理平台</span>
        </div>

        {/* badge */}
        <div
          style={{
            display: "inline-flex",
            background: "#dff0f4",
            borderRadius: 8,
            padding: "8px 20px",
            marginBottom: 28,
            alignSelf: "flex-start",
          }}
        >
          <span style={{ fontSize: 20, color: "#2B7C96", fontWeight: 700 }}>
            老人福利機構評鑑
          </span>
        </div>

        {/* facility name */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: "#2e2a26",
            lineHeight: 1.15,
            marginBottom: 20,
          }}
        >
          老人福利機構
        </div>

        {/* tagline */}
        <div style={{ fontSize: 28, color: "#5e7a82", lineHeight: 1.4 }}>
          評鑑備審・社工照護・品質監測指標
        </div>

        {/* url */}
        <div
          style={{
            position: "absolute",
            bottom: 48,
            right: 80,
            fontSize: 20,
            color: "#c0b8af",
          }}
        >
          reportwang.com/school/elderly-welfare
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "NotoSansTC", data: fontBold, weight: 700 },
        { name: "NotoSansTC", data: fontRegular, weight: 400 },
      ],
    }
  );
}
