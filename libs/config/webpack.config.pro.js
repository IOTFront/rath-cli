const Merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const baseConfig = require('./webpack.config.base.js')

const extractSass = new ExtractTextPlugin({
    filename: "[name].[contenthash].css",
    disable: process.env.NODE_ENV === "development"
});

module.exports = Merge(baseConfig, {

  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: extractSass.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true
              }
            }, {
              loader: 'sass-loader'
            }, {
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
          ],
          fallback: 'style-loader'
        })
      },
    ]
  },

  plugins: [
    extractSass,
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      compress: {
        screw_ie8: true
      },
      comments: false
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: ["vendor", "manifest"], // vendor libs + extracted manifest
      minChunks: Infinity,
    }),
    new webpack.HashedModuleIdsPlugin(),
    new WebpackChunkHash(),
    new ChunkManifestPlugin({
      filename: "chunk-manifest.json",
      manifestVariable: "webpackManifest",
      inlineManifest: true
    })
  ]
})
