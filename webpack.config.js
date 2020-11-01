"use strict";

const webpack = require("webpack");
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const packageJson = require("./package.json");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const os = require("os");
const HtmlPwaPlugin = require("./config/webpack/HtmlPwaPlugin/index.js");
const BundleServiceWorkerPlugin = require("./config/webpack/BundleServiceWorkerPlugin/index.js");
const { DefinePlugin, SplitChunksPlugin } = require("webpack");
const CompressionPlugin = require("compression-webpack-plugin");
const MomentLocalesPlugin = require("moment-locales-webpack-plugin");

const APP_CONFIG_PATH = process.env.APP_CONFIG_PATH || path.resolve(__dirname, "apps/official");
const buildConfig = require(path.resolve(APP_CONFIG_PATH, "build.json"));
const browserlistRegExp = require("browserslist-useragent-regexp");

const babelLoader = {
  loader: "babel-loader",
  options: {
    cacheDirectory: true,
    babelrc: true,
  },
};

const outputDir = path.join(__dirname, "dist");
const swDest = "sw.js";

module.exports = function (env) {
  const commitHash = "dev";
  const commitHashLong = "dev";

  if (!env) {
    console.log("No env specified. Use `--env {dev|prod}`. Using `--env dev`");
    env = "dev";
  }

  const staticResources = [
    { from: "static", to: "." },
    { from: path.resolve(APP_CONFIG_PATH, "static"), to: "./" },
  ];

  if (env === "dev") {
    staticResources.push({
      from: path.resolve(__dirname, "dev/data"),
      to: "./data",
    });
  }

  // common config
  const config = {
    devServer: {
      contentBase: path.join(__dirname, "dist"),
      disableHostCheck: true,
      host: "0.0.0.0",
      historyApiFallback: true,
      proxy: {
        "/api": {
          target: "http://api:3001",
        },
      },
    },
    cache: true,
    entry: {
      app: "./src/index.tsx",
      embed: "./src/embed.tsx",
    },
    output: {
      path: outputDir,
      filename: "[name].[hash].js",
      globalObject: "this",
      chunkFilename: "[chunkhash].chunk.js",
      publicPath: "/",
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
          use: ["@svgr/webpack"],
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
          use: [babelLoader],
        },
      ],
    },
    context: __dirname,
    resolve: {
      alias: {
        "app-config": APP_CONFIG_PATH,
        "src": path.resolve(__dirname, "src"),
      },
      // Add `.ts` and `.tsx` as a resolvable extension.
      extensions: [".mjs", ".js", ".ts", ".tsx", ".jsx"],
      modules: [path.resolve(__dirname, "src"), "node_modules"],
    },
    optimization: {
      splitChunks: {
        // include all types of chunks
        chunks: "all",
        maxAsyncRequests: 8,
        maxInitialRequests: 8,
      },
      // usedExports: true,
      // `nodeEnv` defaults to `mode`, which sets NODE_ENV to "production" in production.
      // `minimize` defaults to `mode == "production"`, which enables uglifyjs for production.
      // `namedModules` defaults to `mode == "development"`. So webpack uses nice names in development.
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "src/index.ejs"),
        chunks: ["app"],
        filename: "index.html",
        // inject: true,
        title: buildConfig.meta.title,
        url: buildConfig.meta.url,
        description: buildConfig.meta.description,
        keywords: buildConfig.meta.keywords,
        variables: {
          ...buildConfig,
          browserlistRegExp: browserlistRegExp.getUserAgentRegExp({ allowHigherVersions: true }),
        },
        minify:
          env == "prod"
            ? {
                collapseWhitespace: true,
                removeComments: true,
                minifyCSS: true,
                minifyURLs: true,
              }
            : false,
        meta: {
          // TODO: double trouble - is in the template index.ejs and here
          viewport: "width=device-width, initial-scale=1, shrink-to-fit=no",
        },
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "src/embed.ejs"),
        chunks: ["embed"],
        filename: "embed.html",
        // inject: true,
        title: buildConfig.meta.title,
        url: buildConfig.meta.url,
        description: buildConfig.meta.description,
        keywords: buildConfig.meta.keywords,
        variables: {
          ...buildConfig,
          browserlistRegExp: browserlistRegExp.getUserAgentRegExp({ allowHigherVersions: true }),
        },
        minify:
          env == "prod"
            ? {
                collapseWhitespace: true,
                removeComments: true,
                minifyCSS: true,
                minifyURLs: true,
              }
            : false,
        meta: {
          // TODO: double trouble - is in the template index.ejs and here
          viewport: "width=device-width, initial-scale=1, shrink-to-fit=no",
        },
      }),
      new CopyWebpackPlugin(staticResources),
      new BundleServiceWorkerPlugin({
        buildOptions: {
          swSrc: path.resolve(__dirname, "src/sw/sw.js"),
          swDest,
          targetDir: path.join(os.tmpdir(), "bundle-service-worker"),
          context: process.cwd(),
          swWebpackConfig: {
            devtool: "source-map",
            plugins: [
              new DefinePlugin({
                "process.env.SW_ENV": JSON.stringify(process.env.SW_ENV),
                "process.env.SW_LOG_ENV": JSON.stringify(process.env.SW_LOG_ENV),
                "process.env.SW_DEFAULT": JSON.stringify(process.env.SW_DEFAULT),
                "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
              }),
            ],
          },
          workBoxConfig: {
            exclude: [/\.map$/, /manifest\.json$/, /data\//],
            swDest,
            importWorkboxFrom: "disabled",
          },
        },
      }),
      // TODO: @patrick - does this event work?
      new HtmlPwaPlugin({
        name: buildConfig.meta.title,
        themeColor: "#003f97",
        msTileColor: "#ffffff",
        appleMobileWebAppCapable: "no",
        appleMobileWebAppStatusBarStyle: "default",
        assetsVersion: "",
        manifestPath: "manifest.json",
        iconPaths: {
          favicon32: "favicon-32x32.png",
          favicon16: "favicon-16x16.png",
          appleTouchIcon: "apple-touch-icon.png",
          maskIcon: "safari-pinned-tab.svg",
          msTileImage: "mstile-144x144.png",
        },
        ...(buildConfig.pwaOptions || {}),
      }),
      new webpack.DefinePlugin({
        COMMIT_HASH: JSON.stringify(commitHash),
        COMMIT_HASH_LONG: JSON.stringify(commitHashLong),
        VERSION: JSON.stringify(packageJson.version),
        PRODUCTION: JSON.stringify(env === "prod"),
        APP_CONFIG_PATH: JSON.stringify(APP_CONFIG_PATH),
      }),
      new MomentLocalesPlugin({
        localesToKeep: ["en", "de"],
      }),
    ],
  };

  // env specific configuration
  if (env === "dev") {
    config.mode = "development";
    config.devtool = "inline-source-map";
  } else if (env === "prod") {
    config.mode = "production";
    config.devtool = "source-map";
    config.plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: "static",
        generateStatsFile: true,
        openAnalyzer: false,
        reportFilename: path.resolve(__dirname, "bundle-report.html"),
        statsFilename: path.resolve(__dirname, "bundle-stats.json"),
      }),
    );
  } else {
    console.error(`Undefined environment ${env}.`);
    process.exit(1);
  }

  return config;
};
