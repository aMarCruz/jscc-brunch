'use strict'

const jscc = require('jscc')
const anymatch = require('anymatch')
const reIgnore = /^(?:bower_components|vendor)\//

function jsccProxy (file, options, cb) {
  let res, err

  try {
    res = jscc(file.data, file.path, options)
  } catch (e) {
    err = e
  } finally {
    if (err) {
      cb(err, null)
    } else {
      if (res.map) file.map = res.map
      file.data = typeof res.code == 'string' ? res.code : res
      cb(null, file)
    }
  }
}

class JsccPlugin {

  constructor (config) {
    // 1. Build `pattern` from config
    const opts = config.plugins.jscc || (config.plugins.jscc = {})

    opts.sourceMap = !!config.sourceMaps && opts.sourceMap !== false

    if (opts.pattern) {
      this.pattern = opts.pattern
    }
    this.ignored = anymatch(opts.ignore || reIgnore)
    this.options = opts
  }

  // On-the-fly compilation.
  compile (file) {

    if (this.ignored(file.path)) {
      return Promise.resolve(file)
    }

    return new Promise((resolve, reject) => {

      process.nextTick(jsccProxy,
        file, this.options, (err, res) => {
          if (err) {
            reject(err)
          } else {
            resolve(res)
          }
        })

    })
  }
}

JsccPlugin.prototype.brunchPlugin = true
JsccPlugin.prototype.extension = '.js'
JsccPlugin.prototype.type = 'javascript'

module.exports = JsccPlugin
