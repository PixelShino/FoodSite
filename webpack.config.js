'use strict';

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // Импортируем плагин

module.exports = {
  mode: 'development',
  entry: './js/script.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve('./dist', 'dist'), // Измените путь на 'dist' для лучшей организации
  },
  watch: true,

  devtool: 'source-map',

  module: {
    rules: [
      {
        test: /\.scss$/, // Для SCSS файлов
        use: [
          MiniCssExtractPlugin.loader, // Извлекает CSS в файл
          'css-loader', // Обрабатывает CSS
          'sass-loader', // Компилирует SCSS в CSS
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles.css', // Имя итогового CSS файла
    }),
  ],
};
