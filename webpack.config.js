"use strict";

const fs = require("fs");
const execSync = require("child_process").execSync;
const webpack = require("webpack");
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const packageJson = require("./package.json");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const babelLoader = {
  loader: "babel-loader",
  options: {
    cacheDirectory: true,
    babelrc: true,
  }
};

module.exports = function(env) {
  let commitHash = "dev";
  let commitHashLong = "dev";
  
  if (!env) {
    console.log("No env specified. Use `--env {dev|prod}`. Using `--env dev`");
    env = "dev";
  }

  // common config
  const config = {
    devServer: {
      contentBase: path.join(__dirname, "dist"),
      disableHostCheck: true,
      host: "0.0.0.0",
      historyApiFallback: false,
      proxy: {
        '/api': {
          target: 'http://api:3001'
        },
      },
    },
    cache: true,
    entry: {
      app: "./src/index.tsx",
    },
    output: {
      path: path.join(__dirname, "dist"),
      filename: "[name].js",
      globalObject: "this",
      chunkFilename: "[chunkhash].chunk.js",
      publicPath: "/"
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /(pdfkit|linebreak|fontkit|unicode|brotli|png-js).*\.js$/,
          loader: "transform-loader?brfs",
        },
        {
          test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: "url-loader?limit=10000&mimetype=application/font-woff",
        },
        {
          test: /\.(ttf|otf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?|\.(jpg|gif|png)$/,
          include: [/node_modules/],
          loader: "file-loader",
        },
        {
          test: /\.svg$/,
          use: ['@svgr/webpack'],
        },
        {
          test: /\.ts(x?)$/,
          exclude: [/node_modules/],
          use: [
            babelLoader,
            {
              loader: "ts-loader",
            },
          ],
        },
        {
          test: /\.js(x?)$/,
          exclude: [/node_modules/],
          use: [
            babelLoader,
          ],
        },
      ],
    },
    resolve: {
      // Add `.ts` and `.tsx` as a resolvable extension.
      extensions: [".mjs", ".js", ".ts", ".tsx", ".jsx"],
      modules: [path.resolve(__dirname, "src"), "node_modules"],
    },
    optimization: {
      // `nodeEnv` defaults to `mode`, which sets NODE_ENV to "production" in production.
      // `minimize` defaults to `mode == "production"`, which enables uglifyjs for production.
      // `namedModules` defaults to `mode == "development"`. So webpack uses nice names in development.
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src/index.ejs'),
        title: "CovMapper",
        // favicon: "path/to/favicon",  // TODO you can set a favicon here
        minify: env == "prod" ? {
          collapseWhitespace: true,
          removeComments: true,
          minifyCSS: true,
          minifyURLs: true,
        } : false,
        meta: {
          viewport: "width=device-width, initial-scale=1, shrink-to-fit=no",
        },
      }),
      new CopyWebpackPlugin([
        { from: "static", to: "." },
        { from: path.resolve(__dirname, 'data'), to: "./data" },
      ]),
      new webpack.DefinePlugin({
        COMMIT_HASH: JSON.stringify(commitHash),
        COMMIT_HASH_LONG: JSON.stringify(commitHashLong),
        VERSION: JSON.stringify(packageJson.version),
        PRODUCTION: JSON.stringify(env === "prod"),
      }),
    ],
  };

  // env specific configuration
  if (env === "dev") {
    config.mode = "development";
    config.devtool = "inline-source-map";
    config.resolve.modules = config.resolve.modules || ["node_modules"];
  } else if (env === "prod") {
    config.mode = "production";
    config.devtool = "source-map";
    config.output.filename = "[name].[hash].js";
    config.plugins.push(new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
      reportFilename: path.resolve(__dirname, 'bundle-report.html')
    }));
  } else {
    console.error(`Undefined environment ${env}.`);
    process.exit(1);
  }

  return config;

};
