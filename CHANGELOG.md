# Changes to jscc-brunch

### 2016-10-18 v2.8.2

- Update jscc to v0.3.3
- Brunch plugins (compilers) are not prepared to merge sourceMaps, so now sourceMap is disabled by default.

### 2016-10-18 v2.8.1

- Fix to the plugin generating wrong file types.
  Now the file extension is limited to 'js' by default, you can define extensions with the `pattern` option.
