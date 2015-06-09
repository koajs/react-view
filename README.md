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

An Koa view engine which renders React components on server.

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
  views: viewpath,
  babel: {
    only: [
      viewpath,
      assetspath
    ]
  }
});

app.use(function* () {
  this.render(home, {foo: 'bar'});
});

```

### Options

option | values | default
-------|--------|--------
`doctype` | any string that can be used as [a doctype](http://en.wikipedia.org/wiki/Document_type_declaration), this will be prepended to your document | `"<!DOCTYPE html>"`
`beautify` | `true`: beautify markup before outputting (note, this can affect rendering due to additional whitespace) | `false`
`views` | the root directory of view files | `path.join(__dirname, 'views')`
`extname` | the default view file's extname | `jsx`
`writeResp` | `true`: writes the body response automatically | `true`
`babel` | the options for [babel/register](https://babeljs.io/docs/usage/require/) | `{only: options.views}`
`cache` | `true`: cache all the view files | `process.env.NODE_ENV === 'production'`

### `ctx.state`

`koa-react-view` support [ctx.state](https://github.com/koajs/koa/blob/master/docs/api/context.md#ctxstate) in koa.

### [example](example)

### License

MIT
