const path = require("path"),
  webpack = require("webpack"),
  HTMLWebpackPlugin = require('html-webpack-plugin'),
  { CleanWebpackPlugin } = require('clean-webpack-plugin'),
  TerserPlugin = require('terser-webpack-plugin');

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
    hot: true,
    open: true,
    liveReload: true
  },

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
  },

  plugins: [
    new HTMLWebpackPlugin({
      title: "Test App",
      template: "./src/index.html", //handlebar file 
      filename: 'index.html'
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/*', path.join(process.cwd(), 'extra/**/*')]
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    })
  ],

  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false, // prevents TerserPlugin from extracting a [chunkName].js.LICENSE.txt file
        terserOptions: {
          format: {
            // Tell terser to remove all comments except for the banner added via LicenseWebpackPlugin.
            // This can be customized further to allow other types of comments to show up in the final js file as well.
            // See the terser documentation for format.comments options for more details.
            comments: (astNode, comment) => (comment.value.startsWith('! licenses are at '))
          }
        }
      })
    ]
  }

};