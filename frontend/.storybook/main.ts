import type { StorybookConfig } from '@storybook/react-webpack5';
import path from 'path';
import { Configuration, RuleSetUseItem } from 'webpack';

interface RuleSetRules {
  test: RegExp;
  use?: RuleSetUseItem[];
  exclude?: RegExp;
}

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  staticDirs: ['../public'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  previewHead: (head) => `${head}`,
  docs: {
    autodocs: 'tag',
  },
  webpackFinal: async (config: Configuration) => {
    const { module, resolve } = config;
    const imageRule = module?.rules?.find((rule) => {
      const test = (rule as RuleSetRules).test;

      return test.test('.svg');
    }) as RuleSetRules;

    imageRule.exclude = /\.svg$/;

    module?.rules?.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    if (resolve) {
      resolve.alias = {
        ...resolve.alias,
        '@mocks': path.resolve(__dirname, '../src/mocks'),
        '@map': path.resolve(__dirname, '../src/components/google-maps/map'),
        '@marker': path.resolve(__dirname, '../src/components/google-maps/marker'),
        '@ui': path.resolve(__dirname, '../src/components/ui'),
        '@common': path.resolve(__dirname, '../src/components/common'),
        '@components': path.resolve(__dirname, '../src/components'),
        '@utils': path.resolve(__dirname, '../src/utils'),
        '@hooks': path.resolve(__dirname, '../src/hooks'),
        '@stores': path.resolve(__dirname, '../src/stores'),
        '@style': path.resolve(__dirname, '../src/style'),
        '@constants': path.resolve(__dirname, '../src/constants'),
        '@assets': path.resolve(__dirname, '../src/assets'),
        '@type': path.resolve(__dirname, '../src/types'),
        '@tools': path.resolve(__dirname, '../src/tools'),
      };
    }

    return config;
  },
};
export default config;
