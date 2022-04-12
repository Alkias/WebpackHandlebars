const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');

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
          helperDirs: [
            path.join(__dirname, 'src', 'helpers')
          ],
          partialDirs: [
            path.join(__dirname, 'src', 'components')
          ]
        }
      },

      {
        test: /\.s[ac]ss$/i,
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
              autoprefixer: {
                browsers: [
                  'last 2 verions'
                ]
              },
              sourceMap: true,
              plugins: () => {
                autoprefixer
              }
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
        type: 'asset/resource'
      },
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
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
      chunkFilename: "[id].css"
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    })
  ],

};