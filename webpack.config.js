const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  mode: 'development',

  entry: {
      main: path.resolve(__dirname, './src/scripts/index.js'),
  },

  output: {
      path: path.resolve(__dirname, './dist'),
      filename: '[name].bundle.js',
  },

  plugins: [
      new HtmlWebpackPlugin({
          template: path.resolve(__dirname, './src/index.html'),
          filename: 'index.html',
      }),
      new CleanWebpackPlugin(),
      new webpack.HotModuleReplacementPlugin(),
  ],

  devServer: {
    historyApiFallback: true,
    open: true,
    compress: true,
    hot: true,
    port: 8080,
  },

  module: {
    rules: [
      {
        test: /\.sass$/i,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              sassOptions: {
                indentedSyntax: true,
              },
              additionalData: '@import "@/styles/variables.sass"',
            },
          },
        ],
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.sass'],
    alias: {
      '@': path.resolve(__dirname, 'src/'),
      vue: 'vue/dist/vue.esm.js',
    },
  },
}