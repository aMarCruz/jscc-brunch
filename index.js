'use strict'

const anymatch  = require('anymatch')
const jscc      = require('jscc')
const flatten   = require('flatten-brunch-map')

const reIgnore  = /\b(?:bower_components|node_modules|vendor)\//
const rePattern = /\.jsx?$/

const dup = (src) => Object.assign({}, src)


class JsccPlugin {

  constructor (config) {
    const opts = dup(config.plugins && config.plugins.jscc)

    opts.sourceMap = !!config.sourceMaps &&
       (opts.sourceMap === true || opts.sourceMaps === true)
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

    try {
      const opts = dup(this.options)

      opts.sourceMap = opts.sourceMap && this.canGenMap(file.path)
      if (!opts.sourceMap) {
        opts.keepLines = true
      }

      const output = jscc(file.data, file.path, opts)

      if (output.map) {
        output.map.file = file.path
      }
      return Promise.resolve(flatten(file, output.code, output.map))

    } catch (err) {
      return Promise.reject(err)
    }
  }

}

JsccPlugin.prototype.brunchPlugin = true
JsccPlugin.prototype.pattern = rePattern
JsccPlugin.prototype.type = 'javascript'

module.exports = JsccPlugin
