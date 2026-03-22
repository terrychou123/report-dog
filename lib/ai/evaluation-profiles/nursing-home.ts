export const nursingHomeProfile = {
  id: "nursing-home",
  label: "護理之家",
  description: "護理之家評鑑基準",
  sections: [
    // 待使用者提供評鑑指標內容後填入
  ] as Array<{
    name: string;
    shortCode: string;
    items: Array<{
      id: number;
      title: string;
      responsible: string;
      criteria: string[];
      reviewMethod: string;
    }>;
  }>,
};
