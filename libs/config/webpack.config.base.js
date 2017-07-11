const path = require('path')
const chalk = require('chalk')
const glob = require('glob')
const webpack = require('webpack')
const HtmlWebpackPlugin  =require('html-webpack-plugin')
const autoprefixer = require('autoprefixer')
const context = process.cwd()

const getEntries = (globPath) => {
  const entries = {
    vendor: ['react', 'react-dom']
  }
  glob.sync(globPath).forEach((entry) => {
    const ext = path.extname(entry)
    const pathname = (entry.split('/').slice(-2, -1))
    entries[pathname] = [entry]
  })
  return entries
}

const entries = getEntries('./src/pages/*/index.js')
const chunks = Object.keys(entries)

let webpackConfig = {

  context: context,

  entry: entries,

  output: {
    publicPath: './',
    path: path.join(context, 'dist'),
    filename: '[name].js',
    chunkFilename: '[name][chunkhash:8].js'
  },

  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      'components': path.join(context, 'components'),
      'pages': path.join(context, 'pages'),
      '@': path.resolve(context)
    }
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        exclude: /node_modules/,
        options: {
          parserOptions: {
            ecmaVersion: 6,
            sourceType: "module",
            ecmaFeatures: {
              jsx: true
            }
          }
        }
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        options: {
          presets: [['env', { "es6": true }], 'react'],
          cacheDirectory: true
        },
        exclude: /node_modules/
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      },
      {
        exclude: [
          /\.html$/,
          /\.(js|jsx)$/,
          /\.(scss|css)$/,
          /\.json$/,
          /\.(png|svg|jpg|gif)$/,
          /\.(woff|woff2|eot|ttf|otf)$/
        ],
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'static/media/[name].[hash:8].[ext]',
            }
          }
        ]
      }
    ]
  },

  plugins: []
}
chunks.forEach((pathname) => {
  if (pathname === 'vendor') return
  const conf = {
    title: 'App',
    filename: `${pathname}.html`,
    template: './src/template.html'
  }
  if (pathname in webpackConfig.entry) {
    conf.chunks = ['vendor', pathname]
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf))
})

module.exports = webpackConfig
