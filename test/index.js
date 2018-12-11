'use strict'

const Plugin = require('..')
const expect = require('expect.js')

describe('Plugin', function () {

  // eslint-disable-next-line no-var
  var options = {}

  beforeEach(function () {
    options = {
      plugins: {
        jscc: { values: { _OK: 1 } },
      },
    }
  })

  it('should be an object with a method compile of length 1', function () {
    const plugin = new Plugin(options)
    expect(plugin).to.be.ok()
    expect(plugin).to.be.an('object')
    expect(plugin.compile).to.be.a('function').and.have.property('length', 1)
  })

  it('should compile and produce valid result', function () {
    const version = require('../package.json').version

    return new Plugin().compile({ data: '$_FILE\n$_VERSION', path: 'template.js' })
      .then((result) => {
        expect(result).to.be.ok()
        expect(result).to.be.an(Object)
        expect(result.data).to.contain(`template.js\n${version}`)
      })
  })

  it('should replace using the user values', function () {
    return new Plugin(options).compile({ data: '$_OK', path: 'template.js' })
      .then(function (result) {
        expect(result.data).to.be('1')
      })
  })

  it('must compile files ending with js, jsx, ts, tsx by default', function () {
    const params = { data: '$_OK', path: 'template.tsx' }

    return new Plugin(options).compile(params)
      .then(function (result) {
        expect(result.data).to.be('1')
      })
  })

  it('must return files not in pattern without changes', function () {
    const params = { data: '$_OK', path: 'node_modules/template.js' }

    return new Plugin(options).compile(params)
      .then(function (result) {
        expect(result).to.be(params)
      })
  })

  it('must not generate sourcemap by default, but keep line numbers', function () {
    return new Plugin(options).compile({ data: '$_OK\n\n$_OK', path: 'template.js' })
      .then(function (result) {
        expect(result.data).to.be('1\n\n1')
        expect(result.map).to.be(undefined)
      })
  })

  it('must not generate sourcemap if brunch sourceMap is not true', function () {
    options.plugins.jscc.sourceMaps = true

    return new Plugin(options).compile({ data: '$_OK', path: 'template.js' })
      .then(function (result) {
        expect(result.data).to.be('1')
        expect(result.map).to.be(undefined)
      })
  })

  it('must generate sourcemap if both sourceMaps options are true', function () {
    options.sourceMaps = true
    options.plugins.jscc = {
      sourceMaps: true,
      values: { _OK: 1 },
    }
    return new Plugin(options).compile({ data: '$_OK', path: 'template.js' })
      .then(function (result) {
        expect(result.data).to.be('1')
        expect(result.map).to.be.ok()
        expect(result.map).to.be.an(Object).and.have.property('mappings')
      })
  })

  it('must respect the `escapeQuotes` option', function () {
    options.plugins.jscc = {
      escapeQuotes: 'single',
      values: { _STR: "'foo'" },
    }
    return new Plugin(options).compile({ data: 'const a = "$_STR"', path: 'template.js' })
      .then(function (result) {
        expect(result.data).to.be('const a = "\\\'foo\\\'"')
      })
  })
})
