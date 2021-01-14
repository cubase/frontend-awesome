const fs = require('fs-extra')

class CopyAfterBuild {
  constructor(options) {
    this.options = options || {}
  }

  apply(compiler) {
    compiler.hooks.done.tap('CopyAfterBuildPlugin', () => {
      const { from, to } = this.options

      if (!from || !to) {
        throw new Error("Missing 'from' or 'to' parameter in CopyAfterBuild plugin")
      }

      return fs.copySync(from, to, { overwrite: true })
    })
  }
}

module.exports = CopyAfterBuild
