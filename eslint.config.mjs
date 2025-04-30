import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

// Konversi untuk mendukung __dirname di ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Gunakan kompatibilitas dengan konfigurasi lama
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// Konfigurasi ESLint lengkap
const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "react/no-unescaped-entities": "off",
    },
  },
];

export default eslintConfig;
