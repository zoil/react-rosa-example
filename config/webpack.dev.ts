import * as webpack from "webpack";
import * as path from "path";
import * as HtmlWebpackPlugin from "html-webpack-plugin";

export const config: webpack.Configuration = {
  mode: "development",
  entry: {
    // main: "./src/main.js",
    ts: "./src/client/index.tsx"
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name]-bundle.js",
    publicPath: "/"
  },

  devServer: {
    contentBase: "dist",
    overlay: true,
    stats: {
      warning: false,
      colors: true
    }
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: "inline-source-map",

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
  },

  module: {
    rules: [
      // {
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   use: [
      //     {
      //       loader: "babel-loader"
      //     }
      //   ]
      // },
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/
        // options: {
        //   configFile: path.join(__dirname, "./config/tsconfig.json")
        // }
      },

      // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
      {
        test: /\.tsx?$/,
        loaders: ["react-hot-loader/webpack", "awesome-typescript-loader"],
        exclude: path.resolve(__dirname, "node_modules"),
        include: [
          path.resolve(__dirname, "src"),
          path.resolve(__dirname, "../shared")
        ]
      },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader",
        exclude: [/rosa\-shared/, /react\-rosa/, /rosa\-client/]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: "react-rosa-example",
      chunksSortMode: "dependency",
      template: path.resolve(__dirname, "../src/client/index.ejs")
    })
  ]
};

export default config;
