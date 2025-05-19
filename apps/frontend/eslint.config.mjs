import commonConfig from "@trpc-practice/eslint-config";
import reactPlugin from "eslint-plugin-react";
import hooksPlugin from "eslint-plugin-react-hooks";
import { defineConfig } from "eslint/config";

export default defineConfig([
  commonConfig,
  {
    files: ["**/*.js", "**/*.ts", "**/*.tsx"],
    plugins: {
      react: reactPlugin,
      "react-hooks": hooksPlugin,
    },
    rules: {
      ...reactPlugin.configs["jsx-runtime"].rules,
      ...hooksPlugin.configs.recommended.rules,

      // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
    },
  },
]);
