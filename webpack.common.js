const path = require("path");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")

// const nodeExternals = require('webpack-node-externals');
module.exports = {
  mode: "development",
  entry: "./src/js/index.js",
  devtool: "inline-source-map",
  target: "web",
   node: {global: true},
  //  plugins: [
	// 	new NodePolyfillPlugin()
	// ],
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
      {  test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ["url-loader"]},
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          use: [
            {
              loader: 'file-loader',
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
};
