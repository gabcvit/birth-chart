import parser from 'vue-eslint-parser';
import pluginVue from 'eslint-plugin-vue';
import vueTsEslintConfig from '@vue/eslint-config-typescript';
import stylistic from '@stylistic/eslint-plugin'
import tsPlugin from '@typescript-eslint/eslint-plugin';

export default [
  ...pluginVue.configs['flat/essential'],
  ...pluginVue.configs['flat/strongly-recommended'],
  ...vueTsEslintConfig({
    extends: [
      'recommended',
      'stylistic',
    ]
  }),
  {
    files: ['**/*.ts', '**/*.vue'],
  },
  {
    ignores: ['dist/**', 'src/shims-vue.d.ts'],
  },
  {
    languageOptions: {
      parser,
      ecmaVersion: 'latest',

      parserOptions: {
        parser: '@typescript-eslint/parser',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      '@stylistic': stylistic,
    },
    rules: {
      '@stylistic/max-len': ['warn', { code: 120 }],
      'vue/attribute-hyphenation': ['warn', 'never'],
    },
  },
];