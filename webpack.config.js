const path = require("path");

module.exports = {
  mode: "development",
  entry: "./client/index.jsx",
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "bundle.js"
  },
  watchOptions: {
    ignored: /node_modules/
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        loader: [
          {
            loader: "babel-loader",
            query: {
              presets: ["@babel/preset-react"]
            }
          }
        ]
      }
    ]
  }
};
