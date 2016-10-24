[![npm Version][npm-image]][npm-url]
[![License][license-image]][license-url]

## jscc-brunch

Adds conditional compilation and variable replacement support to [brunch](http://brunch.io).

Featuring some of the C preprocessor characteristics through special, configurable comments, [jscc](https://github.com/aMarCruz/jscc) can be used in almost any type of files to build multiple versions of your software from the same code base.

With jscc, you have:

* Conditional inclusion/exclusion of code, based on compile-time variables
* Compile-time variables with all the power of JavaScript expressions
* Replacement of variables inside the source (by value at compile-time)
* Source Map support

jscc is **not** a minifier tool, it only does well that it does...

**IMPORTANT:**

From v2.8.3 the generation of source map is disabled by default, to fix issues with the behavior of many plugins that does not supports chained source maps. However, jscc will maintain the correct line numbers.

Please read more about this in [Using Source Maps](#using-source-maps).

## Example

Install the plugin via npm with `npm i jscc-brunch -D`.

or, do manual install:

* Add `"jscc-brunch": "~x.y.z"` to `package.json` of your brunch app.
* If you want to use git version of plugin, use the GitHub URI `"jscc-brunch": "aMarCruz/jscc-brunch"`.

In brunch **the order matters**, jscc is a preprocessor so please put it before compilers in the devDependencies of your `package.json`.

Set the options in your `brunch-config` file:

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
import mylib from 'mylib-debug';
//#else */
import mylib from 'mylib';
//#endif

mylib.log('Starting $_MYAPP v$_VERSION...');
```

output:

```js
import mylib from 'mylib-debug';

mylib.log('Starting My App v1.0.0...');
```

That's it.


## Using Source Maps

You can enable the generation of sourcemap if your are not using compilers or your compiler can merge sourcemaps* (a future release of buble-brunch will support that):

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

Even with `sourceMaps: true`, sourcemap generation is limited to `.js` and `.jsx` files. You can change this with [anymatchs](https://github.com/es128/anymatch) through the `sourceMapFor` option.

\* The jscc plugin does support merging sourcemaps.


## Options

Set [jscc options](https://github.com/aMarCruz/jscc/wiki/Options) in your brunch config bellow `plugins.jscc`.

In addition to the standard jscc options (`values`, `prefixes`, etc), you can set...

#### `ignore`

[anymatch](https://github.com/es128/anymatch) to specify which files in your project should not be processed.
Default is `/^(bower_components|vendor)/`.

#### `pattern`

Regular expression that matches the file paths you want to process.
Default is `/\.js$/` for JavaScript files.


#### Example:

```js
plugins: {
  jscc: {
    values: {
      _TEN: 10,
      _STR: 'string'
    },
    ignore: [
      /^(bower_components|vendor)\//,
      'app/someProblematicCode/**/*'
    ],
    pattern: /\.(js|pug|tag)$/  // limit to certain js files.
  }
}
```


## Documentation

You can read in the jscc Wiki about:

- [Options](https://github.com/aMarCruz/jscc/wiki/Options)
- [Syntax](https://github.com/aMarCruz/jscc/wiki/Syntax)
- [Keywords](https://github.com/aMarCruz/jscc/wiki/Keywords)
- [Examples & Tricks](https://github.com/aMarCruz/jscc/wiki/Examples)


## What's New

- Using jscc v0.3.2


## License

The [MIT License](LICENCE) (MIT)

Copyright (c) 2016 Alberto Martínez (https://github.com/aMarCruz)

[npm-image]:      https://img.shields.io/npm/v/jscc-brunch.svg
[npm-url]:        https://www.npmjs.com/package/jscc-brunch
[license-image]:  https://img.shields.io/npm/l/express.svg
[license-url]:    https://github.com/aMarCruz/jscc-brunch/blob/master/LICENSE
