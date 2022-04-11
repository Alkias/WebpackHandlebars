const path = require("path"),
  webpack = require("webpack"),
  HTMLWebpackPlugin = require('html-webpack-plugin'),
  { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: "./src/app.js",
  output: {
    filename: "bundle.[contenthash].js",
    path: path.resolve(__dirname, 'dist')
  },

  //see: https://webpack.js.org/configuration/dev-server/
  //see: https://github.com/webpack/webpack-dev-server
  devServer: { 
    compress: true,
    port: 9000,
    hot:true,
    open:true,
    liveReload:true
  },

  plugins: [
    new HTMLWebpackPlugin({
      title: "Test App", 
      template: "./src/index.html", //handlebar file 
      filename: 'index.html'
    }),
    new CleanWebpackPlugin(
      {
        cleanOnceBeforeBuildPatterns: ['**/*', path.join(process.cwd(), 'extra/**/*')]
      }
    )
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
          partialDirs: [
            path.join(__dirname, 'src', 'components')
          ]
        }
      }
    ]
  }
};