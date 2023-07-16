import type { StorybookConfig } from '@storybook/react-webpack5';
import path from 'path';
import { Configuration } from 'webpack';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  webpackFinal: async (config: Configuration) => {
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@map': path.resolve(__dirname, '../src/components/google-maps/map'),
        '@marker': path.resolve(__dirname, '../src/components/google-maps/marker'),
        '@components': path.resolve(__dirname, '../src/components/ui'),
        '@utils': path.resolve(__dirname, '../src/utils'),
        '@hooks': path.resolve(__dirname, '../src/hooks'),
        '@stores': path.resolve(__dirname, '../src/stores'),
        '@constants': path.resolve(__dirname, '../src/constants/index'),
      };
    }

    return config;
  },
};
export default config;
