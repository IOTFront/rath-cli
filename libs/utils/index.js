
const path = require('path')
const fs = require('fs')
const os = require('os')
const util = require('util')

class Util {

  getRathPath () {
    let rathPath = path.join(this.homedir(), '.rath')
    if (!fs.existsSync(rathPath)) {
      fs.mkdirSync(rathPath)
    }
    return rathPath
  }

  homedir () {
    if (typeof os.homedir === 'function') {
      return os.homedir()
    } else {
      const env = process.env
      const home = env.HOME
      const user = env.LOGNAME || env.USER || env.LNAME || env.USERNAME

      if (process.platform === 'win32') {
        return env.USERPROFILE || env.HOMEDRIVE + env.HOMEPATH || home || null
      }

      if (process.platform === 'darwin') {
        return home || (user ? '/Users/' + user : null);
      }

      if (process.platform === 'linux') {
        return home || (process.getuid() === 0 ? '/root' : (user ? '/home/' + user : null));
      }

      return home || null
    }
  }
}

module.exports = new Util()
