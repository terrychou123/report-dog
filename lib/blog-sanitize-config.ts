import sanitizeHtml from "sanitize-html";

/**
 * 部落格內容的 sanitize-html 設定
 * 同時用於：
 * - app/blog/[slug]/page.tsx（伺服器端渲染前清理）
 * - app/blog/[slug]/edit/edit-form.tsx（HTML 模式的即時預覽）
 */
export const blogSanitizeOptions: sanitizeHtml.IOptions = {
  allowedTags: sanitizeHtml.defaults.allowedTags.concat([
    "img",
    "figure",
    "figcaption",
    // SVG 標籤白名單
    "svg", "path", "circle", "rect", "ellipse", "line",
    "polyline", "polygon", "g", "defs", "clipPath",
    "linearGradient", "radialGradient", "stop",
    "text", "tspan", "use", "symbol", "mask",
    "filter", "feGaussianBlur", "feOffset",
    "feMerge", "feMergeNode", "pattern",
  ]),
  allowedAttributes: {
    ...sanitizeHtml.defaults.allowedAttributes,
    img: ["src", "alt", "style", "width", "height"],
    figure: ["style"],
    figcaption: ["style"],
    // SVG 屬性白名單
    svg: ["viewBox", "xmlns", "width", "height", "preserveAspectRatio", "style", "class", "id"],
    path: ["d", "fill", "stroke", "stroke-width", "opacity", "transform", "clip-path", "fill-opacity", "stroke-opacity", "stroke-linecap", "stroke-linejoin", "stroke-dasharray", "filter", "mask", "id", "class"],
    circle: ["cx", "cy", "r", "fill", "stroke", "stroke-width", "opacity", "transform", "id", "class"],
    rect: ["x", "y", "width", "height", "rx", "ry", "fill", "stroke", "stroke-width", "opacity", "transform", "id", "class"],
    ellipse: ["cx", "cy", "rx", "ry", "fill", "stroke", "stroke-width", "opacity", "transform", "id", "class"],
    line: ["x1", "y1", "x2", "y2", "stroke", "stroke-width", "opacity", "transform", "id", "class"],
    polyline: ["points", "fill", "stroke", "stroke-width", "opacity", "transform", "id", "class"],
    polygon: ["points", "fill", "stroke", "stroke-width", "opacity", "transform", "id", "class"],
    g: ["transform", "opacity", "fill", "stroke", "clip-path", "filter", "mask", "id", "class"],
    defs: [],
    clipPath: ["id"],
    linearGradient: ["id", "x1", "y1", "x2", "y2", "gradientUnits", "gradientTransform"],
    radialGradient: ["id", "cx", "cy", "r", "fx", "fy", "gradientUnits", "gradientTransform"],
    stop: ["offset", "stop-color", "stop-opacity", "style"],
    text: ["x", "y", "fill", "font-size", "font-family", "text-anchor", "dominant-baseline", "transform", "opacity", "id", "class"],
    tspan: ["x", "y", "dx", "dy", "fill", "font-size", "id", "class"],
    // href 僅允許 fragment 參照（#id），禁止外部 URL 以防 SVG sprite injection XSS
    use: ["x", "y", "width", "height", "transform", "id", "class"],
    symbol: ["id", "viewBox", "width", "height"],
    mask: ["id", "x", "y", "width", "height"],
    filter: ["id", "x", "y", "width", "height"],
    feGaussianBlur: ["in", "stdDeviation"],
    feOffset: ["in", "dx", "dy", "result"],
    feMerge: [],
    feMergeNode: ["in"],
    pattern: ["id", "x", "y", "width", "height", "patternUnits", "patternTransform"],
  },
  // img[src] 只允許 https/http，防止 javascript: 或 data: URI
  allowedSchemesByTag: {
    img: ["https", "http"],
  },
  // 關閉 protocol-relative URL（//attacker.com/...）繞過
  allowProtocolRelative: false,
  // style 標籤雖未列入 allowedTags，但確保其文字內容也被丟棄（SVG 內嵌 <style> 防護）
  nonTextTags: ["style", "script", "textarea", "option", "noscript"],
};
