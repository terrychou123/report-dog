export const hospitalNursingProfile = {
  id: "hospital-nursing",
  label: "醫院護理部",
  description: "醫院護理部評鑑基準",
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
