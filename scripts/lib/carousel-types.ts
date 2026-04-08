// Instagram 輪播圖生成系統 — 型別定義

export interface CarouselSlide {
  index: number;
  svgContent: string;
  filename: string; // e.g. "slide-01-cover.jpg"
}

export interface CarouselConfig {
  width: number;    // 1080
  height: number;   // 1350
  quality: number;  // JPG quality (90)
  outputDir: string;
}

export interface DeficiencyItem {
  rank: number;
  articleRef: string; // e.g. "第6條"
  title: string;
  responsible: string; // e.g. "社工"
  shortDesc: string;
}

export interface CarouselArticleData {
  slug: string;
  title: string;          // 顯示於封面的主標題（2 行，以 \n 分隔）
  subtitle: string;       // 副標題
  category: string;       // e.g. "日間照顧"
  highlightNumber: string; // 封面大數字，e.g. "10"
  highlightLabel: string;  // 大數字說明，e.g. "大常見缺失"
  tags: string[];          // 封面 pill 標籤（2-3 個）
  audience: string;        // 適用對象說明
  items: DeficiencyItem[];
  blogUrl: string;         // 完整文章網址
  checklistItems: string[]; // 自查清單項目（含條文）
  hashTags: string;        // caption hashtags
}
