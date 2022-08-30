const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");

const fs = require('fs')
const examples = fs.readdirSync('./examples').filter(file => file !== '.' || file !== '..')

const examplesEntry = examples.reduce( (entry, example) => (entry[`./examples/${example}/index`] = path.resolve(__dirname, `./examples/${example}/index.tsx`), entry), {} );

module.exports = {

  entry: {
    ...examplesEntry
  },

  devtool: 'eval-source-map',

  

  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].js",
  },

  module: {
    rules: [
      {
        test: /\.ts|\.tsx$/,
        exclude: /node_module/,
        use: "ts-loader",
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  mode: "development",
  plugins: [
    ...examples.map(example => new HtmlWebpackPlugin({
      title: `examples/${example}`,
      template: `./examples/${example}/index.html`,
      filename: `./examples/${example}/index.html`,
      inject: false,
    })),
  
  ],
};
