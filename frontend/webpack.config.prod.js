/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const DotEnv = require('dotenv-webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  mode: 'production',
  entry: './src/index.prod.tsx',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  devServer: {
    static: './dist',
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)?$/,
        loader: 'esbuild-loader',
        options: {
          tsconfig: './tsconfig.json',
          target: 'es6',
          minify: true,
        },
        exclude: /node_modules/,
      },
      {
        test: /\.svg$/,
        use: '@svgr/webpack',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    alias: {
      '@mocks': path.resolve(__dirname, './src/mocks'),
      '@map': path.resolve(__dirname, './src/components/google-maps/map'),
      '@marker': path.resolve(__dirname, './src/components/google-maps/marker'),
      '@ui': path.resolve(__dirname, './src/components/ui'),
      '@common': path.resolve(__dirname, './src/components/common'),
      '@components': path.resolve(__dirname, './src/components'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@stores': path.resolve(__dirname, './src/stores'),
      '@constants': path.resolve(__dirname, './src/constants'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@style': path.resolve(__dirname, './src/style'),
      '@type': path.resolve(__dirname, './src/types'),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      hash: true,
      favicon: './public/favicon.ico',
      minify: true,
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'public', globOptions: { ignore: ['**/mockServiceWorker.js', '**/index.html'] } },
      ],
    }),
    new DotEnv(),
    new BundleAnalyzerPlugin({
      openAnalyzer: false,
      generateStatsFile: true,
      statsFilename: 'bundle-report.json',
    }),
  ],
};
