'use strict'

const anymatch  = require('anymatch')
const deepClone = require('@jsbits/deep-clone')
const jscc      = require('jscc')
const flatten   = require('flatten-brunch-map')

const reIgnore  = /\b(?:bower_components|node_modules|vendor)\//
const rePattern = /\.(?:js|ts)x?$/

const hasProp   = Object.prototype.hasOwnProperty

const parseOptions = (config) => {
  const opts = deepClone(config.plugins && config.plugins.jscc || {})

  opts.sourceMap = !!config.sourceMaps &&
    (opts.sourceMap === true || opts.sourceMaps === true)

  if (!hasProp.call(opts, 'keepLines')) {
    opts.keepLines = true
  }
  if (!hasProp.call(opts, 'prefixes')) {
    opts.prefixes = /(?:\/[/*]|<!--) ?/
  }
  return opts
}

class JsccPlugin {

  constructor (config) {
    const opts = parseOptions(config || {})

    if (opts.sourceMap) {
      this.canGenMap = anymatch(opts.sourceMapFor || rePattern)
    }
    if (opts.pattern) {
      this.pattern = opts.pattern
    }
    this.ignored = anymatch(opts.ignore || reIgnore)
    this.options = opts
  }

  compile (file) {

    if (this.ignored(file.path)) {
      return Promise.resolve(file)
    }

    return new Promise((resolve) => {
      const opts = deepClone(this.options)

      opts.sourceMap = opts.sourceMap && this.canGenMap(file.path)

      const output = jscc(file.data, file.path, opts)

      if (output.map) {
        output.map.file = file.path
      }

      resolve(flatten(file, output.code, output.map))
    })
  }

}

JsccPlugin.prototype.brunchPlugin = true
JsccPlugin.prototype.pattern = rePattern
JsccPlugin.prototype.type = 'javascript'

module.exports = JsccPlugin
