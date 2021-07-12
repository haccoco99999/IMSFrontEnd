const path = require("path");
// const webpack = require("webpack");
const Dotenv = require('dotenv-webpack');
// const nodeExternals = require('webpack-node-externals');
module.exports = {
  mode: "development",
  entry: "./src/js/index.js",
  devtool: "inline-source-map",
  target: "web",
  node: { global: true },
  //   externals: [nodeExternals({
  //     importType: 'umd'
  //  })],
  // externals:{
  //   lodash:{
  //     commonjs:'lodash',
  //    amd:'lodash',
  //    root:'_'
  //   }
  // },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  targets: {
                    esmodules: true,
                  },
                },
              ],
              "@babel/preset-react",
            ],
          },
        },
      },
      {
        test: [/\.s[ac]ss$/i, /\.css$/i],
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      { test: /\.(woff|woff2|eot|ttf|otf)$/, use: ["url-loader"] },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".js"],
  },
  output: {
    filename: "app.js",
    path: path.resolve(__dirname, "build", "js"),
  },
  plugins: [
    new Dotenv(),
    // fix "process is not defined" error:
    // (do "npm install process" before running the build)
    // new webpack.ProvidePlugin({
    //   process: "process/browser",
    // }),
    // new webpack.DefinePlugin({
    //   "process.env.REACT_APP_API": JSON.stringify(process.env.REACT_APP_API),
    // }),
  ],
};
