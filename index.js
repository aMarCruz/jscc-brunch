'use strict'

const jscc = require('jscc')
const anymatch = require('anymatch')

const reIgnore = /^(?:bower_components|vendor)\//
const reTypes  = /^(?:javascript|stylesheet|template)$/i

function jsccProxy (file, options, cb) {

  let error = null
  options.errorHandler = (message) => {
    error = new Error(message)
  }

  const res = jscc(file.data, file.path, options)

  delete options.errorHandler

  if (error) {
    cb(error, null)
  } else {
    if (res.map) file.map = res.map
    file.data = typeof res.code == 'string' ? res.code : res
    cb(null, file)
  }
}

class JsccPlugin {

  constructor (config) {
    // 1. Build `pattern` from config
    const opts = config.plugins.jscc || (config.plugins.jscc = {})

    opts.sourceMap = !!config.sourceMaps && opts.sourceMap !== false
    if (opts.type && reTypes.test(opts.type)) {
      this.type = opts.type
    }
    this.pattern = opts.pattern || /\S/
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

module.exports = JsccPlugin
