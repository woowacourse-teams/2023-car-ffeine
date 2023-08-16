/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const DotEnv = require('dotenv-webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const smp = new SpeedMeasurePlugin();

module.exports = function () {
  return smp.wrap({
    mode: 'development',
    entry: './src/index.tsx',
    output: {
      path: path.join(__dirname, '/dist'),
      filename: 'bundle.js',
      publicPath: '/',
    },
    devtool: 'source-map',
    devServer: {
      static: './dist',
      historyApiFallback: true,
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
          resolve: {
            extensions: ['.ts', '.tsx', '.js', '.json'],
            fallback: { process: false },
          },
        },
        {
          test: /\.svg$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'assets/',
              },
            },
          ],
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
      }),
      new DotEnv(),
      new CopyWebpackPlugin({
        patterns: [{ from: 'public/mockServiceWorker.js', to: '.' }],
      }),
      new ForkTsCheckerWebpackPlugin(),
    ],
  });
};
