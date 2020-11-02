/* eslint-disable filenames/match-regex */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const CleanTerminalPlugin = require('clean-terminal-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

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
  target: 'node',
  externals: [nodeExternals()],
  plugins: [new CleanTerminalPlugin()],
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