const path  = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin")

const output = {
  filename: "bundle.js",
}
output.path = path.resolve(__dirname, "dist");

let entries = undefined;
if (process.env.NODE_ENV === 'production') {
  entries =  [
    "./src/app.tsx",
  ]
} else {
  entries =  [
    "webpack/hot/dev-server.js",
    "webpack-dev-server/client/index.js?hot=true&live-reload=true",
    "./src/app.tsx",
  ]
}

module.exports = {
  mode: process.env.NODE_ENV || "development",
  entry:  entries,
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
  },
  watch: false,
  output: output,
  plugins: [
    new HtmlWebpackPlugin({
      title: "PBM Setting Generator",
      filename: "index.html",
      template: "src/index.html",
      path: path.resolve(__dirname, 'dist/index.html'),
    }),
  ],
  module: {
    rules: [
      { test: /\.(js|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      { test: /\.(ts|tsx)$/,
        loader: 'ts-loader',
        exclude: [/node_modules/],
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader"
        ],
      },
    ]
  },

  devServer: {
    hot: true,
    client: {
      overlay: true,
      progress: true,
    }
  },
};
