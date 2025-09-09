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

// '@next/next/no-page-custom-font': 'off', // Next.js 기본 폰트 경고 제거

/*

console.log({
  "import.meta.url": import.meta.url,
  __filename,
  __dirname,
  compat,
  eslintConfig,
});

{
  "import.meta.url": "file:///Users/username/project/eslint.config.mjs",
  "__filename": "/Users/username/project/eslint.config.mjs",
  "__dirname": "/Users/username/project",
  "compat": {
    "baseDirectory": "/Users/username/project"
  },
  "eslintConfig": [
    {
      "extends": [
        "plugin:@next/next/recommended",
        "plugin:@next/next/core-web-vitals",
        "plugin:@typescript-eslint/recommended"
      ]
    }
  ]
}

*/
