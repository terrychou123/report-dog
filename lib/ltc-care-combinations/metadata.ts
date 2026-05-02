/** 附表四照顧組合表修正規定——版本資訊 */
export const metadata: {
  regulation: string;
  attachment: string;
  gazetteRef: string;
  /** 衛福部公報公告日期，確認後填入 ISO 日期字串（e.g. "2026-04-15"）；尚未確認時為 null */
  publishedAt: string | null;
  /** 施行日期，確認後填入；尚未確認時為 null */
  effectiveDate: string | null;
  sourceFile: string;
  sourcePages: { from: number; to: number };
  datasetVersion: string;
  lastVerified: string;
} = {
  regulation: "長期照顧服務申請及給付辦法",
  attachment: "附表四 照顧組合表修正規定",
  gazetteRef: "衛生福利部公告（修正部分條文及附表）",
  publishedAt: null,
  effectiveDate: null,
  sourceFile: "修正長期照顧服務申請及給付辦法_部分條文及附表.pdf",
  sourcePages: { from: 7, to: 35 },
  datasetVersion: "1.0.0",
  lastVerified: "2026-04-30",
};
