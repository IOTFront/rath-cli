const path = require('path')
const Merge = require('webpack-merge')
const webpack = require('webpack')
const baseConfig = require('./webpack.config.base')
const webpackHotMiddleClient = 'webpack-hot-middleware/client?reload=true'

Object.keys(baseConfig.entry).forEach((name) => {
  // baseConfig.entry[name].push(path.join(__dirname, 'webpack.client.js'))
  baseConfig.entry[name].push(webpackHotMiddleClient)
})

module.exports = Merge(baseConfig, {
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
          {
            loader: 'sass-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              pulgins: () => {
                require('postcss-flexbugs-fixes'),
                autoprefixer({
                  browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9', // React doesn't support IE8 anyway
                  ],
                  flexbox: 'no-2009',
                })
              }
            }
          }
        ]
      },
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
})
