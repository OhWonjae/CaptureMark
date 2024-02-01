const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    background: './src/background.js',
    popup: './src/popup.js',
    screenshot: './src/screenshot.js',
  },
  output: {
    filename: './src/[name].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      { test: /\.s?css$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
      { test: /\.png/, type: 'asset/resource' },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: './public', to: 'public' },
        { from: './popup.html', to: '' },
        { from: './screenshot.html', to: '' },
        { from: './manifest.json', to: '' },
      ],
    }),
  ],
};
