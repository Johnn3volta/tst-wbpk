const path = require('path'),
  ProgressBarPlugin = require('progress-bar-webpack-plugin'),
  CopyWebpackPlugin = require('copy-webpack-plugin'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  CleanWebpackPlugin = require('clean-webpack-plugin'),
  webpack = require('webpack'),
  VueLoaderPlugin = require('vue-loader/lib/plugin'),
  MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = (env) => {
  let devMode = env === 'dev' ? env : false;

  let conf = {

    entry: {
      main: [
        './src/js/main.js',
        './src/styles/style.scss'
      ],
    },
    output: {
      filename: 'js/[name].js',
      path: path.resolve(__dirname, 'build')
    },
    devtool: devMode ? 'source-map' : false,
    devServer: {
      open: true,
      overlay: true
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            loaders: {
              js: 'babel-loader'
            }
          }
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader?sourceMap',
            'postcss-loader',
            'sass-loader?sourceMap'
          ],
        },
        {
          test: /\.styl$/,
          loader: [
            devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader',
            'stylus-loader'],
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 8000,
              name(url) {
                const destination = path.relative(path.resolve(__dirname, 'src'), url);

                return destination.replace(/[\\\/]+/g, '/');
              },
              publicPath: '..'

            }
          }
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name(url) {
                  const destination = path.relative(path.resolve(__dirname, 'src'), url);

                  return destination.replace(/[\\\/]+/g, '/');
                },
                publicPath: '..'
              }
            }
          ]
        }
      ]
    },
    resolve: {
      alias: {
        vue: 'vue/dist/vue.common.js',
      },
      extensions: ['.vue', '.js', '.json']
    },

    plugins: [
      new ProgressBarPlugin(),
      new MiniCssExtractPlugin(
        {
          filename: 'css/[name].min.css'
        }
      ),
      new CopyWebpackPlugin([
        {
          from: './src/images',
          to: 'images'
        },
      ]),
      new VueLoaderPlugin(),
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html',
        chunks: [
          'main'
        ],
      }),
    ],
  };

  if (!devMode) {
    conf.plugins.push(new CleanWebpackPlugin())
  }

  if (env === 'babel') {
    conf.module.rules.push(
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    )
  }
  return conf;
};





