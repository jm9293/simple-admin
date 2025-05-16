import { FlatCompat } from '@eslint/eslintrc';
import eslintConfigPrettier from 'eslint-config-prettier';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    rules: {
      // 코드 품질
      'no-console': 'warn', // console.log 사용 경고
      'no-debugger': 'warn', // debugger 사용 경고
      'no-duplicate-imports': 'error', // 중복 import 금지
      'no-var': 'error', // var 대신 let/const 사용

      // 일관성 및 가독성
      indent: ['error', 2], // 들여쓰기 2칸
      quotes: ['error', 'double'], // 쌍따옴표 사용
      semi: ['error', 'always'], // 세미콜론 필수
      'comma-dangle': ['error', 'always-multiline'], // 여러 줄일 때 마지막 콤마 필수

      // React/Next.js
      'react/prop-types': 'off', // TypeScript 사용시 불필요
      'react/react-in-jsx-scope': 'off', // Next.js에서 불필요
      'react/jsx-filename-extension': ['warn', { extensions: ['.tsx'] }], // TSX 파일 확장자 강제
      'react-hooks/rules-of-hooks': 'error', // Hooks 규칙 준수
      'react-hooks/exhaustive-deps': 'warn', // useEffect 의존성 배열 검사

      // TypeScript
      '@typescript-eslint/explicit-function-return-type': 'off', // 반환 타입 명시 강제하지 않음
      '@typescript-eslint/no-explicit-any': 'warn', // any 타입 사용 경고
      '@typescript-eslint/no-unused-vars': 'warn', // TS 미사용 변수 경고
      '@typescript-eslint/ban-ts-comment': 'warn', // @ts_ignore 등 사용 경고
    },
  },
  eslintConfigPrettier,
];

export default eslintConfig;
