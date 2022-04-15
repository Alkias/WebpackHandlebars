const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require("webpack");
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
TerserPlugin = require('terser-webpack-plugin');
//const autoprefixer = require('autoprefixer');

module.exports = {
  entry: "./src/app.js",
  output: {
    filename: "bundle.[contenthash].js",
    path: path.resolve(__dirname, 'dist')
  },

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
          inlineRequires: "/img/",
          helperDirs: [
            path.join(__dirname, 'src', 'helpers')
          ],
          partialDirs: [
            path.join(__dirname, 'src', 'components')
          ]
        }
      },

      {
        test: /\.s?[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              implementation: require('sass'),
              sassOptions: {
                fiber: require('fibers')
              }
            }
          }
        ],
      },

      {
        test: /\.(png|jpg|gif)$/,
        type: 'asset/resource',
        use: [ "file-loader?name=images/[name].[ext]" ] 
      },
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: "Test App",
      template: "./src/index.html", //handlebar file 
      filename: 'index.html'
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/*', path.join(process.cwd(), 'extra/**/*')]
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
      chunkFilename: "[id].css"
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