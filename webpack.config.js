/* eslint-disable filenames/match-regex */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    main: [
      path.resolve(__dirname, './src/index.ts'),
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    path: path.resolve(__dirname, './dist/'),
    filename: 'index.js',
  },
  node: {
    process: false,
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          { 
            loader: 'ts-loader',
            options: {
              compilerOptions: {
                declaration: true,
                // outDir: 'dist/types',
              },
            },
          },
          // -------------------------//
          {
            loader: 'eslint-loader',
          },
          // -------------------------//
        ],
      },
    ],
  },
  // devtool: 'source-map',
  plugins: [
    new CleanWebpackPlugin(),
  ],
};