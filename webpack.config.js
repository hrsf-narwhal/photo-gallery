const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const path = require('path');

module.exports = {
  mode: 'production',
  entry: './client/manifest.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'main.js'
	},
	watch: false,
  
  module: {
    rules: [

      { 
        test: /\.jsx?$/, 
        loader: 'babel-loader',
        include: /client/,
        options: {
          presets: ['env', 'react']
        }
      },

      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader"
        ]
      }

    ]//rules
  },//module

  plugins: [

    new HtmlWebpackPlugin({
      title: 'Itsy Photo Component',
      template: 'client/index.html'
    }),

    new MiniCssExtractPlugin({
      filename: "style.css"
    })


  ]//plugins

};