const chalk = require('chalk')
const opn = require('opn')
const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackConfig = require('../config/webpack.config.dev')

const app = express()
const compiler = webpack(webpackConfig)

app.use(webpackDevMiddleware(compiler, {
  publicPath: '/'
}))

app.use(webpackHotMiddleware(compiler, {
  log: console.log
}))

// compiler.plugin('compilation', (compilation) => {
//   compilation.plugin('html-webpack-plugin-after-emit', (data, cb) => {
//     console.log(webpackHotMiddleware, webpackHotMiddleware(compiler).publish)
//     webpackHotMiddleware(compiler).publish({ action: 'reload' })
//   })
// })

compiler.plugin('done', (stats) => {
  if (!stats.hasErrors()) {
    app.listen(3000, () => {
      console.log(chalk.green('listening on port 3000~'))
      opn('http://localhost:3000')
    })
  }
})
