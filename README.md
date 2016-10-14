## jscc-brunch

Adds conditional compilation and variable replacement support to [brunch](http://brunch.io).

Featuring some of the C preprocessor characteristics through special, configurable comments, jscc can be used in any type of files to build multiple versions of your software from the same code base.

With jscc, you have:

* Conditional inclusion/exclusion of code, based on compile-time variables*
* Compile-time variables with all the power of JavaScript expressions
* Replacement of variables inside the source (by value at compile-time)
* Source Map support

\* This feature allows you the conditional declaration of ES6 imports (See the [example](#example)).

**Note:**

jscc is a preprocessor, please put it before compilers in the devDependencies of package.json (in brunch the **order matters**).

jscc is **not** a minifier tool, it only does well that it does...

## Example

Install the plugin via npm with `npm i jscc-brunch -D`.

or, do manual install:

* Add `"jscc-brunch": "~x.y.z"` to `package.json` of your brunch app.
* If you want to use git version of plugin, use the GitHub URI `"jscc-brunch": "aMarCruz/jscc-brunch"`.

and use it:

```js
//#set _DEBUG 1

/*#if _DEBUG
import mylib from 'mylib-debug';
//#else */
import mylib from 'mylib';
//#endif

mylib.log('Starting v$_VERSION...');
```

output:

```js
import mylib from 'mylib-debug';

mylib.log('Starting v1.0.0...');
```

That's it.

\* From v0.2.1, jscc has the predefined `_VERSION` varname, in addition to `_FILE`.


## Options

Set [jscc options](https://github.com/aMarCruz/jscc/wiki/Options) in your brunch config bellow `plugins.jscc`.

In addition to the standard jscc options (`values`, `prefixes`, etc), you can set...

#### `ignore`

[anymatch](https://github.com/es128/anymatch) to specify which files in your project should not be processed.
Default is `/^(bower_components|vendor)/`.

#### `pattern`

Regular expression that matches the file paths you want to process.
Default is all the files.


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
    pattern: /\.(js|jsx|tag)$/ // limit to certain js files.
  }
}
```


## Documentation

You can read in the jscc Wiki about:

- [Options](https://github.com/aMarCruz/jscc/wiki/Options)
- [Syntax](https://github.com/aMarCruz/jscc/wiki/Syntax)
- [Keywords](https://github.com/aMarCruz/jscc/wiki/Keywords)
- [Examples & Tricks](https://github.com/aMarCruz/jscc/wiki/Examples)



## License

The [MIT License](LICENCE) (MIT)

Copyright (c) 2016 Alberto Martínez (https://github.com/aMarCruz)
