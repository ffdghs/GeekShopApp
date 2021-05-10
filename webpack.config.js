const Dotenv = require("dotenv-webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

const path = require("path");

module.exports = {
  target: "web",
  mode: "development",

  entry: {
    index: path.resolve(__dirname, "src/index.js"),
  },

  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "build"),
    clean: true,
  },

  resolve: {
    extensions: ["*", ".js"],
    fallback: {
      // assert: false,
    },
  },

  devtool: "inline-source-map",
  devServer: {
    contentBase: path.resolve(__dirname, "build"),
    historyApiFallback: true,
    hot: true,
    inline: true,
    port: 3000,
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "index.html"),
    }),
    new Dotenv(),
  ],
};
