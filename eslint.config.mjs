import coreWebVitals from "eslint-config-next/core-web-vitals";
import typescript from "eslint-config-next/typescript";

const eslintConfig = [
  { ignores: [".next/**", "graphify-out/**"] },
  ...coreWebVitals,
  ...typescript,
  {
    rules: {
      // React Compiler 靜態分析規則 — 此專案未啟用 React Compiler，停用避免誤報
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/preserve-manual-memoization": "off",
      "react-hooks/refs": "off",
    },
  },
];

export default eslintConfig;
