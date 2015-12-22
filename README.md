koa-react-view
---------------

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![David deps][david-image]][david-url]
[![node version][node-image]][node-url]

[npm-image]: https://img.shields.io/npm/v/koa-react-view.svg?style=flat-square
[npm-url]: https://npmjs.org/package/koa-react-view
[travis-image]: https://img.shields.io/travis/koajs/react-view.svg?style=flat-square
[travis-url]: https://travis-ci.org/koajs/react-view
[coveralls-image]: https://img.shields.io/coveralls/koajs/react-view.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/koajs/react-view?branch=master
[david-image]: https://img.shields.io/david/koajs/react-view.svg?style=flat-square
[david-url]: https://david-dm.org/koajs/react-view
[node-image]: https://img.shields.io/badge/node.js-%3E=_0.12-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/

A Koa view engine which renders React components on server.

## Installation

```bash
$ npm install koa-react-view
```

## Usage

```js
var react = require('koa-react-view');
var path = require('path');
var koa = require('koa');

var app = koa();

var viewpath = path.join(__dirname, 'views');
var assetspath = path.join(__dirname, 'public');

react(app, {
  views: viewpath
});

app.use(function* () {
  this.render(home, {foo: 'bar'});
});

```

This module no longer includes the [Babel] runtime, as that prevented developers
from using the runtime on the server outside of the scope of this module. Additionally,
Babel recommends that the polyfill is only included by the parent app to avoid these
conflicts. If you'd like to use JSX, ES6, or other features that require transpiling,
you can include Babel in your project directly. See [example].

### Options

option | values | default
-------|--------|--------
`doctype` | any string that can be used as [a doctype](http://en.wikipedia.org/wiki/Document_type_declaration), this will be prepended to your document | `"<!DOCTYPE html>"`
`beautify` | `true`: beautify markup before outputting (note, this can affect rendering due to additional whitespace) | `false`
`views` | the root directory of view files | `path.join(__dirname, 'views')`
`extname` | the default view file's extname | `jsx`
`writeResp` | `true`: writes the body response automatically | `true`
`cache` | `true`: cache all the view files | `process.env.NODE_ENV === 'production'`
`internals` | `true`: include React internals in output | `false`

### renderToString vs renderToStaticMarkup

React provides two ways to render components server-side:

- [ReactDOMServer.renderToStaticMarkup](https://facebook.github.io/react/docs/top-level-api.html#reactdomserver.rendertostaticmarkup) strips out all the React internals, reducing the size of the output. Best for static sites.

- [ReactDOMServer.renderToString](https://facebook.github.io/react/docs/top-level-api.html#reactdomserver.rendertostring) maintains React internals, allowing for client-side React to process the rendered markup very speedily. Best for an initial server-side rendering of a client-side application.

By default, the `ReactDOMServer.renderToStaticMarkup` method will be used. It is possible to use `ReactDOMServer.renderToString` instead (and maintain the React internals) by setting the `internals` option to `true`, or by setting the third parameter of `this.render` to `true` on a case-by-case basis.

### `ctx.state`

`koa-react-view` support [ctx.state](https://github.com/koajs/koa/blob/master/docs/api/context.md#ctxstate) in koa.

### [example](example)

### License

MIT

[Babel]: http://babeljs.io/
[example]: https://github.com/koajs/react-view/blob/master/example/app.js#L25
