
const path = require('path')
const fs = require('fs')
const chalk = require('chalk')
const inquirer = require('inquirer')

const package = require('../../../package.json')
const version = package.version

const Base = require('../Base')

class App extends Base {

  constructor (appName, option) {

    super(...arguments)
    this.conf = Object.assign({
      appName: appName,
      description: '',
      react: true
    }, option)

    this.create()
  }

  create () {
    this.getTemplate('react', () => {
      this.talk()
    })
  }

  talk () {
    const conf = this.conf
    const prompts = []
    if (fs.existsSync(conf.appName)) {
      prompts.push({
        type: 'input',
        name: 'appName',
        message: '项目名已存在，换个名字咯～',
        validate: (input) => {
          if (!input) return '项目名不能为空，请再次输入'
          if (fs.existsSync(this.destinationPath(input))) {
            return '项目名已存在，换个名字咯～'
          }
          return true
        }
      })
    }

    inquirer.prompt(prompts).then((answers) => {
      Object.assign(this.conf, answers)
      this.write()
    })
  }

  write () {
    const conf = this.conf
    const appPath = this.destinationPath(conf.appName)
    this.mkdir(`${conf.appName}/src/assets`)
    this.mkdir(`${conf.appName}/src/components/Test`)
    this.mkdir(`${conf.appName}/src/pages/index/src`)
    this.mkdir(`${conf.appName}/src/pages/index/components`)
    this.mkdir(`${conf.appName}/src/pages/index/assets`)
    this.copy('react', 'template.html', `${appPath}/src/template.html`)
    this.copy('react', 'components/Test/index.js', `${appPath}/src/components/Test/index.js`)
    this.copy('react', 'components/Test/index.scss', `${appPath}/src/components/Test/index.scss`)
    this.copy('react', 'pages/index/index.js', `${appPath}/src/pages/index/index.js`)
    this.copy('react', 'pages/index/index.scss', `${appPath}/src/pages/index/index.scss`)

    this.fs.commit(() => {
      console.log(chalk.green(`项目${conf.appName}创建成功~`))
      console.log('')
      console.log(`cd ${conf.appName} && npm install`)
      console.log(`rath start`)
    })
    this.writePackageJson()
    this.writeEslint()
  }

  writePackageJson () {
    const conf = this.conf
    const toolPackage = require('../../../package.json')
    const packageJson = {
      name: conf.appName,
      description: conf.description,
      version: '1.0.0',
      scripts: {
        start: 'rath start',
        build: 'rath build'
      },
      dependencies: {
        "react": toolPackage.devDependencies["react"],
        "react-dom": toolPackage.devDependencies["react-dom"]
      },
      devDependencies: {
        'babel-preset-react': toolPackage.dependencies['babel-preset-react'],
        'style-loader': toolPackage.dependencies['style-loader'],
        'css-loader': toolPackage.dependencies['css-loader'],
        'sass-loader': toolPackage.dependencies['sass-loader'],
        'node-sass': toolPackage.dependencies['node-sass'],
        'url-loader': toolPackage.dependencies['url-loader'],
        'eslint': toolPackage.dependencies['eslint'],
        'eslint-loader': toolPackage.dependencies['eslint-loader'],
        'file-loader': toolPackage.dependencies['file-loader'],
        'postcss-loader': toolPackage.dependencies['postcss-loader'],
        'babel-core': toolPackage.dependencies['babel-core'],
        'babel-loader': toolPackage.dependencies['babel-loader'],
        'babel-preset-env': toolPackage.dependencies['babel-preset-env'],
        'babel-preset-react': toolPackage.dependencies['babel-preset-react'],
        'webpack-hot-middleware': toolPackage.dependencies['webpack-hot-middleware']
      }
    }
    this.fs.writeJSON(path.join(conf.appName, 'package.json'), packageJson)
  }

  writeEslint () {
    const conf = this.conf
    this.fs.write(path.join(conf.appName, '.eslintrc'), '')
  }

}

module.exports = App
