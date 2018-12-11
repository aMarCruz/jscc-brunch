# jscc-brunch

[![npm Version][npm-image]][npm-url]
[![License][license-image]][license-url]

Adds conditional compilation and compile-time variable replacement support to [brunch](http://brunch.io).

jscc-brunch is **not** a transpiler, it is a wrapper of [jscc](https://github.com/aMarCruz/jscc), a tiny and powerful, language agnostic file preprocessor that uses JavaScript to transform text based on expressions at compile time.

With jscc, you have:

- Conditional inclusion/exclusion of blocks, based on compile-time variables*
- Compile-time variables with all the power of JavaScript expressions
- Replacement of variables in the sources, by its value at compile-time
- Sourcemap support, useful for JavaScript sources.
- TypeScript v3 definitions

**IMPORTANT:**

From v2.8.3 the generation of source map is disabled by default, to fix issues with the behavior of many plugins that does not supports chained source maps. However, jscc will maintain the correct line numbers.

Please read more about this in [Using Source Maps](#using-source-maps).

## Install

Install the plugin via npm with `npm i jscc-brunch -D`.

or, do manual install:

- Add `"jscc-brunch": "~x.y.z"` to `package.json` of your brunch app.
- If you want to use git version of plugin, use the GitHub URI `"jscc-brunch": "aMarCruz/jscc-brunch"`.

## Usage

In brunch **the order matters** and jscc is a preprocessor, so please put it before compilers in the devDependencies of your `package.json`.

Set the [options](#options) in your `brunch-config` file:

```js
  ...
  plugins: {
    jscc: {
      values: {
        _DEBUG: 1,
        _MYAPP: 'My App' }
    }
  }
  ...
```

Use it:

```js
/*#if _DEBUG
const mylib = require('mylib-debug');
//#else */
const mylib = require('mylib');
//#endif

mylib.log('Starting $_MYAPP v$_VERSION...');
```

output:

```js
const mylib = require('mylib-debug');

mylib.log('Starting My App v1.0.0...');
```

That's it.

\* jscc has two predefined memvars: `_FILE` and `_VERSION`, in addition to giving access to the environment variables through the nodejs [`proccess.env`](https://nodejs.org/api/process.html#process_process_env) object.

See [Syntax](https://github.com/aMarCruz/jscc/wiki/Syntax) in the jscc wiki for information about templating.

## Options

Plain JavaScript object, with all properties optional.

Name         | Type            | Description
------------ | --------------- | -----------
escapeQuotes | string          | String with the type of quotes to escape in the output of strings: 'single', 'double' or 'both'. This has no default.
prefixes     | string &vert; RegExp &vert;<br>Array&lt;string&vert;RegExp&gt; | The start of a directive. That is the characters before the '#', usually the start of comments.<br>**Default** `'//'`, `'/*'`, `'<!--'` (with one optional space after them).
values       | object          | Plain object defining the variables used by jscc at compile-time.
ignore       | [anymatch][1] | Specify which files in your project should not be processed.<br>**Default** `/^(bower_components|node_modules|vendor)\//`
pattern      | RegExp        | Regular expression that matches the file paths you want to process.<br>**Default** `/\.(js|ts)x?$/`
sourceMap    | boolean       | Enable the generation of sourcemap (if `sourceMaps:true` in your brunch config).<br>**Default** `false`
sourceMapFor | [anymatch][1] | Files for which sourcemap must be generated if `sourceMaps:true`.<br>**Default** JavaScript/TypeScript files.

## Using Source Maps

You can enable the generation of sourcemap if your are not using JS compilers or your compiler can merge sourcemaps*:

```js
  ...
  plugins: {
    jscc: {
      sourceMaps: true,        // enable sourcemap generation in jscc
      sourceMapFor: /\.js$/,   // allows sourcemap for .js files only
      values: {
        _DEBUG: 1,
        _MYAPP: 'My App'
      }
    }
  }
  ...
```

Even with `sourceMaps: true`, sourcemap generation is limited to JavaScript/TypeScript files. You can change this with [anymatchs][1] through the `sourceMapFor` option.

\* The jscc plugin _does support_ merging sourcemaps.

## Documentation

You can read in the jscc Wiki about:

- [Options](https://github.com/aMarCruz/jscc/wiki/Options)
- [Syntax](https://github.com/aMarCruz/jscc/wiki/Syntax)
- [Keywords](https://github.com/aMarCruz/jscc/wiki/Keywords)
- [Examples & Tricks](https://github.com/aMarCruz/jscc/wiki/Examples)
- [Migrating to v1.0](https://github.com/aMarCruz/jscc/wiki/Migrating-)

## What's New

- Date and RegExp types outputs its stringified value (same behavior of the strings).
- The `pattern` option defaults to .js, .jsx, .ts and .tsx extensions.
- New option `escapeQuotes`.
- Optimized ouput of property values, now you can use more than one property.
- Using jscc v1.1.0

## Support my Work

I'm a full-stack developer with more than 20 year of experience and I try to share most of my work for free and help others, but this takes a significant amount of time and effort so, if you like my work, please consider...

<!-- markdownlint-disable MD033 -->
[<img src="https://amarcruz.github.io/images/kofi_blue.png" height="36" title="Support Me on Ko-fi" />][kofi-url]
<!-- markdownlint-enable MD033 -->

Of course, feedback, PRs, and stars are also welcome 🙃

Thanks for your support!

## License

The [MIT License](LICENCE) (MIT)

Copyright (c) 2016-2018 Alberto Martínez

[npm-image]:      https://img.shields.io/npm/v/jscc-brunch.svg
[npm-url]:        https://www.npmjs.com/package/jscc-brunch
[license-image]:  https://img.shields.io/npm/l/express.svg
[license-url]:    https://github.com/aMarCruz/jscc-brunch/blob/master/LICENSE
[kofi-url]:       https://ko-fi.com/C0C7LF7I
[1]: https://github.com/es128/anymatch
