// 從 evaluation profile section 動態生成 school subpage 的 JSON-LD
// 涵蓋 LearningResource + HowTo + FAQPage，合併為單一 @graph
import { schoolReviewDates, schoolReviewerMap } from "@/lib/school-review-dates";

/**
 * 安全取得 profile section，找不到時拋出明確錯誤（避免 ! non-null assertion 在 build time 無聲崩潰）。
 */
export function requireSection<T extends { shortCode: string }>(
  sections: T[],
  code: string
): T {
  const s = sections.find((s) => s.shortCode === code);
  if (!s) throw new Error(`Evaluation profile section "${code}" not found — check profile shortCode definitions`);
  return s;
}
import {
  educationalContentJsonLd,
  howToJsonLd,
  faqPageJsonLd,
  mergeJsonLdGraph,
} from "@/lib/jsonld";

interface ProfileItem {
  id: number;
  title: string;
  criteria: string[];
  reviewMethod?: string;
  reviewBasis?: string;
}

interface ProfileSection {
  name: string;
  shortCode: string;
  items: ProfileItem[];
}

export interface SchoolSubpageJsonLdOpts {
  type: string;
  subpage: string;
  section: ProfileSection | ProfileSection[];
  name: string;
  description: string;
  /** 額外 FAQ：Q/A 陣列，合併至 FAQPage schema */
  extraFaq?: Array<{ question: string; answer: string }>;
}

/** 清除 title 中的分數標記、shortCode 前綴等，留下純文字 */
function cleanTitle(title: string): string {
  return title
    .replace(/\s*\(\d+%\)/, "")
    .replace(/\s*（\d+%）/, "")
    .replace(/^[A-Z]\d+\s+/, "")
    .replace(/^\d+\.\d+\s+/, "")
    .trim();
}

/** 從 review method/basis 自動生成基礎 FAQ */
export function buildSchoolSubpageFaqItems(opts: {
  section: ProfileSection | ProfileSection[];
  extraFaq?: Array<{ question: string; answer: string }>;
}): Array<{ question: string; answer: string }> {
  const sections = Array.isArray(opts.section) ? opts.section : [opts.section];
  const allItems = sections.flatMap((s) => s.items);
  return [...autoFaq(allItems), ...(opts.extraFaq ?? [])];
}

function autoFaq(items: ProfileItem[]): Array<{ question: string; answer: string }> {
  const pairs: Array<{ question: string; answer: string }> = [];

  // 以第一個 item 的 reviewMethod 為代表（通常全 section 相同）
  const firstReviewMethod = items[0]?.reviewMethod;
  if (firstReviewMethod) {
    pairs.push({
      question: "評鑑委員會用什麼方式查核這個項目？",
      answer: `主要查核方式：${firstReviewMethod}。`,
    });
  }

  // 條件：若有 reviewBasis，加第二個 FAQ
  const basisItems = items.filter((i) => i.reviewBasis);
  if (basisItems.length > 0) {
    const basisText = basisItems
      .slice(0, 3)
      .map((i) => `【${cleanTitle(i.title)}】${i.reviewBasis}`)
      .join("；");
    pairs.push({
      question: "評鑑時需要準備哪些書面資料？",
      answer: basisText,
    });
  }

  return pairs;
}

/**
 * 生成 school subpage 的合併 JSON-LD（LearningResource + HowTo + FAQPage）。
 * section 可傳入單個或陣列（多 section 合併為同一頁時）。
 */
export function schoolSubpageJsonLd(opts: SchoolSubpageJsonLdOpts): string {
  const sections = Array.isArray(opts.section) ? opts.section : [opts.section];
  const allItems = sections.flatMap((s) => s.items);
  const path = `/school/${opts.type}/${opts.subpage}`;

  const educational = educationalContentJsonLd({
    type: "LearningResource",
    name: opts.name,
    description: opts.description,
    path,
    dateModified: schoolReviewDates[opts.type],
    dateCreated: schoolReviewDates[opts.type],
    citation: schoolReviewerMap[opts.type],
  });

  // HowTo steps：每個 item 為一個步驟
  const steps = allItems.map((item) => ({
    name: cleanTitle(item.title),
    text: item.criteria[0] ?? undefined,
    url: `https://reportwang.com${path}#item-${item.id}`,
  }));

  const howto =
    steps.length >= 2
      ? howToJsonLd({
          name: `如何準備「${opts.name}」評鑑`,
          description: opts.description,
          path,
          steps,
        })
      : undefined;

  // FAQ：自動 + 手動 extraFaq（共用 buildSchoolSubpageFaqItems）
  const allFaqItems = buildSchoolSubpageFaqItems({ section: opts.section, extraFaq: opts.extraFaq });
  const faq =
    allFaqItems.length >= 2
      ? faqPageJsonLd(allFaqItems, path)
      : undefined;

  return mergeJsonLdGraph(educational, howto, faq);
}
