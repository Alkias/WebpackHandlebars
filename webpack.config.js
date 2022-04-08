const path = require("path"),
  webpack = require("webpack"),
  HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: "./src/app.js",
  mode: 'development', // "production" | "development" | "none"
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, 'dist')//"dist",    
  },

  // plugins: [
  //   new HTMLWebpackPlugin(
  //     {
  //       title: 'MF',
  //       filename: 'index.html',
  //       template: './index.hbs',
  //       templateParameters() {
  //         const tariffs = require('./src/json/tariffs')
  //         const performance = require('./src/json/performance')
  //         const info = require('./src/json/info')
  //         const cities = require('./src/json/cities')
  //         const unite = require('./src/json/unite')

  //         return { tariffs, performance, info, cities, unite }
  //       },
  //       minify: isProd
  //     },
  //   )
  // ],

  plugins:[
    new HTMLWebpackPlugin()
    // new HTMLWebpackPlugin({
    //   filename: './src/index.html',
    // })
  ],

  module: {
    rules: [
      {
        test: /\.handlebars$/,
        loader: "handlebars-loader",
        options: {
          helperDirs: [
            path.join(__dirname, 'src', 'helpers')
          ],
          partialDirs:[
            path.join(__dirname, 'src', 'components')
          ]
          // partialDirs: [
          //   path.join(__dirname, 'src', 'components'),
          //   path.join(__dirname, 'src', 'components', 'modals'),
          // ]
        }
      }
    ]
  }
};