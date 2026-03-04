const path = require("path");
const { rspack } = require("@rspack/core");

module.exports = {
  mode: process.env.NODE_ENV || "development",
  entry: path.resolve(__dirname, "src/playground/site.jsx"),
  experiments: {
    css: true,
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "js/[name].[contenthash:8].js",
    clean: true,
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "builtin:swc-loader",
          options: {
            jsc: {
              parser: {
                syntax: "ecmascript",
                jsx: true,
              },
              transform: {
                react: {
                  runtime: "automatic",
                  importSource: "preact",
                },
              },
            },
          },
        },
      },
      {
        test: /\.css$/,
        type: "css",
      },
    ],
  },
  plugins: [
    new rspack.HtmlRspackPlugin({
      template: path.resolve(__dirname, "static/index.html"),
    }),
    new rspack.CopyRspackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "static/favicon.ico"),
          to: "favicon.ico",
        },
      ],
    }),
  ],
  devServer: {
    port: 2142,
    static: {
      directory: path.resolve(__dirname, "static"),
    },
    hot: true,
    open: false,
    historyApiFallback: true,
  },
};
