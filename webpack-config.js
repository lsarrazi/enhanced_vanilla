const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const fs = require('fs')
const examples = fs.readdirSync('./examples').filter(file => file !== '.' || file !== '..')

const examplesEntry = examples.reduce( (entry, example) => (entry[`./examples/${example}/index`] = path.resolve(__dirname, `./examples/${example}/index.tsx`), entry), {} );

const TerserPlugin = require("terser-webpack-plugin");

module.exports = {

  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },

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
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          MiniCssExtractPlugin.loader,
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          {
            loader: "sass-loader",
            options: {
              sassOptions: { includePaths: ['./node_modules'] }
            }
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".sass", ".scss"],
  },
  mode: "development",
  plugins: [
    ...examples.map(example => new HtmlWebpackPlugin({
      title: `examples/${example}`,
      template: `./examples/${example}/index.html`,
      filename: `./examples/${example}/index.html`,
      inject: false,
    })),
    new MiniCssExtractPlugin()
  ],

  
};
