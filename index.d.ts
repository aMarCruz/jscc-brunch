import { any } from 'micromatch';

//
// Type definitions for rollup-plugin-jscc v1.0.x
// Definitions by aMarCruz
//
export = JsccPlugin

declare class JsccPlugin {
  constructor (options: JsccPlugin.BrunchConf);

  compile(param: JsccPlugin.File): Promise<JsccPlugin.File>;

  pattern: RegExp;
  staticPattern?: RegExp;
  type: string;
}

declare namespace JsccPlugin {

  type QuoteType = 'single' | 'double' | 'both'
  type MatcherCB = (path: string) => boolean

  interface BrunchConf {
    [k: string]: any;
    plugins: {
      [k: string]: any;
      jscc: Options;
    }
  }

  interface Options {
    /**
     * String with the type of quotes to escape in the output of strings:
     * 'single', 'double' or 'both'.
     *
     * It does not affects the output of regexes or strings contained in the
     * JSON output of objects.
     */
    escapeQuotes?: QuoteType;

    /**
     * Preserves the empty lines of the directives and blocks that were removed.
     *
     * Use this option with `sourceMap:false` if you are interested only in
     * keeping the line numbering.
     * @default true
     */
    keepLines?: boolean;

    /**
     * Make a hi-res source-map, if `sourceMap:true` (the default).
     * @default true
     */
    mapHires?: boolean;

    /**
     * String, regex or array of strings or regexes matching the start of a directive.
     * That is, the characters before the '#', usually the start of comments.
     * @default /(?:\/[/*]|<!--) ?/
     */
    prefixes?: string | RegExp | Array<string | RegExp>;

    /**
     * Must include a sourceMap?
     * @default false
     */
    sourceMaps?: boolean;

    /**
     * Alias for `sourceMaps`
     * @deprecated
     */
    sourceMap?: boolean;

    /**
     * [anymatch](https://github.com/es128/anymatch) of files for which sourcemap
     * must be generated if `sourceMaps:true`.
     * @default (JavaSctipt/TypeScript files)
     */
    sourceMapFor?: string | RegExp | MatcherCB | Array<string | RegExp | MatcherCB>;

    /**
     * Plain object defining the variables used by jscc during the preprocessing.
     *
     * Each key is a varname matching the regex `_[0-9A-Z][_0-9A-Z]*`, the value
     * can have any type.
     *
     * It has two predefined, readonly properties:
     * - `_FILE` : Name of the source file, relative to the current directory
     * - `_VERSION` : The version property in the package.json
     */
    values?: { [k: string]: any };

    /**
     * [anymatch](https://github.com/es128/anymatch) of files that should not
     * be processed.
     *
     * @default /^(bower_components|node_modules|vendor)\//
     */
    ignore?: string | RegExp | MatcherCB | Array<string | RegExp | MatcherCB>;

    /**
     * Regular expression that matches the file paths you want to process.
     *
     * _Note:_ Do not use wildcards here.
     * @default /\.(js|ts)x?$/
     */
    pattern?: RegExp;
  }

  interface File {
    data: string;
    path: string;
    map?: object;
  }
}
