/*!
 * koa-react-view - example/app.js
 * MIT Licensed
 */

'use strict';

/**
 * Module dependencies.
 */

var staticCache = require('koa-static-cache');
var register = require('babel/register');
var react = require('..');
var path = require('path');
var koa = require('koa');

var app = koa();

var viewpath = path.join(__dirname, 'views');
var assetspath = path.join(__dirname, 'public');

react(app, { views: viewpath });

register({
  only: [
    viewpath,
    assetspath
  ]
});

app.use(staticCache(assetspath));

app.use(function* () {
  this.render('index', {
    title: 'List',
    list: [
      'hello koa',
      'hello react'
    ]
  });
});

app.listen(3000);
console.log('server start listen at 3000');
