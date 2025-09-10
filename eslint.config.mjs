import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "off", // 사용되지 않는 변수
      "react-hooks/exhaustive-deps": "off", // useEffect 의존성 문제
      "react/no-unescaped-entities": "off", // 따옴표
    },
  },
  {
    files: ["**/types/globals.d.ts"],
    rules: { "no-var": "off" },
  },
];

export default eslintConfig;
