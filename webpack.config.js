/* eslint-disable filenames/match-regex */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

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
    path: path.resolve(__dirname, './build/'),
    filename: 'index.js',
  },
  // node: {
  //   process: false,
  // },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.ts$/,
        use: [
          { 
            loader: 'ts-loader',
            options: {
              compilerOptions: {
                // declaration: true, // for compile d.ts
              },
            },
          },
        ],
      },
    ],
  },
  devtool: 'source-map',
};