const webpack = require('webpack');
const conf = require('tasks/config.js');
const pkg = require('package.json');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
// Doing a webpack hack for es6: https://github.com/webpack-contrib/uglifyjs-webpack-plugin/issues/33
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const FailPlugin = require('webpack-fail-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

//Our current environment
const env = {};

// Our environment aliases
const ENV_ALIAS = {
  PROD: [
    'production',
    'prod'
  ],
  DEV: [
    'dev'
  ],
  TEST: [
    'test'
  ]
}

/**
* Function to return if the environment matched the environment alias
*/
function isEnv(envAlias) {
  // Check for default case
  if(envAlias === ENV_ALIAS.DEV && Object.keys(env).length === 0) {
    return true;
  }

  return envAlias.some(function(alias) {
    if(env[alias]) {
      return true;
    }
    return false;
  });
}

function isNotEnv(envAlias) {
  return !isEnv(envAlias);
}


module.exports = function(webpackEnv) {

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
  if(isEnv(ENV_ALIAS.PROD)) {
    webpackConf.module.loaders.push({
      test: /\.css$/,
      loaders: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader?minimize!postcss-loader'
      })
    });
  } else if(isENV(ENV_ALIAS.DEV)) {
    webpackConf.module.loaders.push({
      test: /\.css$/,
      loaders: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader?minimize!postcss-loader'
      })
    });
  }

  //PLUGINS
  if(isNotEnv(ENV_ALIAS.TEST)) {
    // Add shared plugins
    webpackConf.module.plugins =
      webpackConf.module.plugins.concat([
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      FailPlugin,
      new HtmlWebpackPlugin({
        template: `${conf.configurator_app}/index.html`
      }),
    ]);
  }

  if(isEnv(ENV_ALIAS.DEV)) {
    webpackConf.module.plugins =
      webpackConf.module.plugins.concat([
        new webpack.HotModuleReplacementPlugin(),
        new webpack.LoaderOptionsPlugin({
          options: {
            postcss: () => [autoprefixer]
          },
          debug: true
        })
      ]);
  } else if(isEnv(ENV_ALIAS.PROD)) {
    webpackConf.module.plugins =
      webpackConf.module.plugins.concat([
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
  } else if(isEnv(ENV_ALIAS.TEST)) {
    webpackConf.module.plugins =
      webpackConf.module.plugins.concat([
        new webpack.LoaderOptionsPlugin({
          options: {},
          debug: true
        })
      ]);
  }

  //DEVTOOL
  if(isNotEnv(ENV_ALIAS.PROD)) {
    webpackConf.module.devtool = 'source-map';
  }

  //OUTPUT
  if(isENV(ENV_ALIAS.DEV)) {
    webpackConf.module.output = {
      path: path.join(process.cwd(), conf.paths.tmp),
      filename: 'index.js'
    }
  } else if(isENV(ENV_ALIAS.PROD)) {
    webpackConf.module.output = {
      path: path.join(process.cwd(), conf.paths.dist),
      filename: '[name]-[hash].js'
    }
  }

  //ENTRY
  if(isENV(ENV_ALIAS.DEV)) {
    webpackConf.module.entry = [
      'webpack/hot/dev-server',
      'webpack-hot-middleware/client',
      `./${conf.configurator_app}/index`
    ]
  } else if(isENV(ENV_ALIAS.PROD)) {
    webpackConf.module.entry = {
      app: `./${conf.configurator_app}/index`,
      vendor: pkg.configuratorDependencies
    }
  }

  //EXTERNALS
  if(isENV(ENV_ALIAS.TEST)) {
    webpackConf.module.externals = {}
  }

  return webpackConf;
};
