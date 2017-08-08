const webpack = require('webpack');
const conf = require('./tasks/config.js');
const pkg = require('./package.json');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
// Doing a webpack hack for es6: https://github.com/webpack-contrib/uglifyjs-webpack-plugin/issues/33
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const FailPlugin = require('webpack-fail-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

// Our current environment
let env = {};

// Our environment aliases
const ENV_ALIAS = {
  PROD: [
    'production',
    'prod'
  ],
  DEV: [
    'development',
    'dev'
  ],
  TEST: [
    'test'
  ]
};

/**
* Function to return if the environment matched the environment alias
*/
function isEnv(envAlias) {
  // Check for default case
  if (envAlias === ENV_ALIAS.DEV && Object.keys(env).length === 0) {
    return true;
  }

  return envAlias.some(alias => env[alias]);
}

module.exports = function (webpackEnv) {
  // Set our environemnt
  env = webpackEnv;
  // Create our base webpack configuration
  const webpackConf = {
    module: {
      loaders: [
        {
          test: /\.json$/,
          loaders: [
            'json-loader'
          ]
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'eslint-loader',
          enforce: 'pre'
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loaders: [
            'babel-loader'
          ]
        }
      ]
    },
    plugins: [],
    output: {},
    entry: []
  };

  // DEV Environment
  if (isEnv(ENV_ALIAS.DEV)) {
    // Loaders
    webpackConf.module.loaders.push({
      test: /\.css$/,
      loaders: [
        'style-loader',
        'css-loader',
        'postcss-loader'
      ]
    });

    // Plugins
    webpackConf.plugins =
      webpackConf.plugins.concat([
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        FailPlugin,
        new HtmlWebpackPlugin({
          template: `${conf.src.configurator}/index.html`
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.LoaderOptionsPlugin({
          options: {
            postcss: () => [autoprefixer]
          },
          debug: true
        })
      ]);

    // Devtool
    webpackConf.devtool = 'source-map';

    // Output
    webpackConf.output = {
      path: path.join(process.cwd(), conf.dest.configurator_tmp),
      filename: 'index.js'
    };

    // Entry
    webpackConf.entry = [
      'webpack/hot/dev-server',
      'webpack-hot-middleware/client',
      `./${conf.src.configurator}/index`
    ];
  }

  // Prod Environment
  if (isEnv(ENV_ALIAS.PROD)) {
    // Loaders
    webpackConf.module.loaders.push({
      test: /\.css$/,
      loaders: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader?minimize!postcss-loader'
      })
    });

    // Plugins
    webpackConf.plugins =
      webpackConf.plugins.concat([
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        FailPlugin,
        new HtmlWebpackPlugin({
          template: `${conf.src.configurator}/index.html`
        }),
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': '"production"'
        }),
        new UglifyJsPlugin({
          output: {comments: false},
          compress: {unused: true, dead_code: true, warnings: false} // eslint-disable-line camelcase
        }),
        new ExtractTextPlugin('index-[contenthash].css'),
        new webpack.optimize.CommonsChunkPlugin({name: 'vendor'}),
        new webpack.LoaderOptionsPlugin({
          options: {
            postcss: () => [autoprefixer]
          }
        })
      ]);

    // Output
    webpackConf.output = {
      path: path.join(process.cwd(), conf.dest.configurator),
      filename: '[name]-[hash].js'
    };

    // Entry
    webpackConf.entry = {
      app: `./${conf.src.configurator}/index`,
      vendor: pkg.configuratorDependencies
    };
  }

  // TEST Environment
  if (isEnv(ENV_ALIAS.TEST)) {
    // Plugins
    webpackConf.plugins =
      webpackConf.plugins.concat([
        new webpack.LoaderOptionsPlugin({
          options: {},
          debug: true
        })
      ]);

    // Devtool
    webpackConf.devtool = 'source-map';

    // Output
    webpackConf.output = {
      path: path.join(process.cwd(), conf.dest.configurator_tmp),
      filename: 'index.js'
    };

    // Externals
    webpackConf.externals = {};
  }

  return webpackConf;
};
