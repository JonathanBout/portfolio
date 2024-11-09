import js from '@eslint/js'
import eslintPluginVue from 'eslint-plugin-vue'
import eslintConfigPrettier from "eslint-config-prettier";
import ts from 'typescript-eslint'

export default ts.config(
  js.configs.recommended,
  ...ts.configs.recommended,
  ...eslintPluginVue.configs['flat/recommended'],
  ...eslintConfigPrettier,
  {
    files: ['*.vue', '**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: '@typescript-eslint/parser'
      }
    },
    rules: {
        'vue/html-indent': ['warn', 4],
        'vue/max-attributes-per-line': ['warn', {
            singleline: {
                max: 4
            },
            multiline: {
                max: 1
            }
        }]
    }
  }
)