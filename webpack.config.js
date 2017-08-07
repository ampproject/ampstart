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
  if (envAlias === ENV_ALIAS.DEV && (!env || Object.keys(env).length === 0)) {
    return true;
  }

  return envAlias.some(alias => {
    if (env[alias]) {
      return true;
    }
    return false;
  });
}

function isNotEnv(envAlias) {
  return !isEnv(envAlias);
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

  // LOADERS
  if (isEnv(ENV_ALIAS.PROD)) {
    webpackConf.module.loaders.push({
      test: /\.css$/,
      loaders: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader?minimize!postcss-loader'
      })
    });
  } else if (isEnv(ENV_ALIAS.DEV)) {
    webpackConf.module.loaders.push({
      test: /\.css$/,
      loaders: [
        'style-loader',
        'css-loader',
        'postcss-loader'
      ]
    });
  }

  // PLUGINS
  if (isNotEnv(ENV_ALIAS.TEST)) {
    // Add shared plugins
    webpackConf.plugins =
      webpackConf.plugins.concat([
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        FailPlugin,
        new HtmlWebpackPlugin({
          template: `${conf.src.configurator}/index.html`
        })
      ]);
  }

  if (isEnv(ENV_ALIAS.DEV)) {
    webpackConf.plugins =
      webpackConf.plugins.concat([
        new webpack.HotModuleReplacementPlugin(),
        new webpack.LoaderOptionsPlugin({
          options: {
            postcss: () => [autoprefixer]
          },
          debug: true
        })
      ]);
  } else if (isEnv(ENV_ALIAS.PROD)) {
    webpackConf.plugins =
      webpackConf.plugins.concat([
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
  } else if (isEnv(ENV_ALIAS.TEST)) {
    webpackConf.plugins =
      webpackConf.plugins.concat([
        new webpack.LoaderOptionsPlugin({
          options: {},
          debug: true
        })
      ]);
  }

  // DEVTOOL
  if (isNotEnv(ENV_ALIAS.PROD)) {
    webpackConf.devtool = 'source-map';
  }

  // OUTPUT
  if (isEnv(ENV_ALIAS.DEV)) {
    webpackConf.output = {
      path: path.join(process.cwd(), conf.dest.configurator_tmp),
      filename: 'index.js'
    };
  } else if (isEnv(ENV_ALIAS.PROD)) {
    webpackConf.output = {
      path: path.join(process.cwd(), conf.dest.configurator),
      filename: '[name]-[hash].js'
    };
  }

  // ENTRY
  if (isEnv(ENV_ALIAS.DEV)) {
    webpackConf.entry = [
      'webpack/hot/dev-server',
      'webpack-hot-middleware/client',
      `./${conf.src.configurator}/index`
    ];
  } else if (isEnv(ENV_ALIAS.PROD)) {
    webpackConf.entry = {
      app: `./${conf.src.configurator}/index`,
      vendor: pkg.configuratorDependencies
    };
  }

  // EXTERNALS
  if (isEnv(ENV_ALIAS.TEST)) {
    webpackConf.externals = {};
  }

  return webpackConf;
};
