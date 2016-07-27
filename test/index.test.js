/*!
 * koa-react-view - test/index.test.js
 * Copyright(c) 2015 dead_horse <dead_horse@qq.com>
 * MIT Licensed
 */

'use strict';

/**
 * Module dependencies.
 */

var register = require('babel-register');
var request = require('supertest');
var copy = require('copy-to');
var path = require('path');
var react = require('..');
var koa = require('koa');

register({
  presets: [ 'es2015', 'react' ],
  extensions: [ '.jsx' ],
});

describe('koa-react-view', function () {
  describe('render', function () {
    it('should render html ok', function (done) {
      var app = App();
      app.use(function*() {
        this.render('home', {title: 'home'});
      });

      request(app.listen())
      .get('/')
      .expect(200)
      .expect('<!DOCTYPE html><div>home</div>', done);
    });

    it('should support ReactDOMServer.renderToString with locals', function (done) {
      var app = App();
      app.use(function*() {
        this.render('home', { }, true);
      });

      request(app.listen())
      .get('/')
      .expect(200)
      .expect(/<!DOCTYPE html><div data-reactroot="" data-reactid="[0-9\-]*" data-react-checksum="[0-9\-]*"><\/div>/i, done);
    });

    it('should support ReactDOMServer.renderToString without locals', function (done) {
      var app = App();
      app.use(function*() {
        this.render('home', true);
      });

      request(app.listen())
      .get('/')
      .expect(200)
      .expect(/<!DOCTYPE html><div data-reactroot="" data-reactid="[0-9\-]*" data-react-checksum="[0-9\-]*"><\/div>/i, done);
    });

    it('should support ReactDOMServer.renderToString using internals option', function (done) {
      var app = App({
        internals: true
      });
      app.use(function*() {
        this.render('home');
      });

      request(app.listen())
      .get('/')
      .expect(200)
      .expect(/<!DOCTYPE html><div data-reactroot="" data-reactid="[0-9\-]*" data-react-checksum="[0-9\-]*"><\/div>/i, done);
    });

    it('should support ctx.state', function (done) {
      var app = App();
      app.use(function*() {
        this.state.title = 'home';
        this.render('home');
      });

      request(app.listen())
      .get('/')
      .expect(200)
      .expect('<!DOCTYPE html><div>home</div>', done);
    });

    it('ctx.state should be override', function (done) {
      var app = App();
      app.use(function*() {
        this.state.title = 'home';
        this.render('home', {title: 'index'});
      });

      request(app.listen())
      .get('/')
      .expect(200)
      .expect('<!DOCTYPE html><div>index</div>', done);
    });

    it('should error when filename invalid', function (done) {
      var app = App();
      app.use(function*() {
        this.state.title = 'home';
        this.render('../home');
      });

      request(app.listen())
      .get('/')
      .expect(500, done);
    });

    it('should error when file not exist', function (done) {
      var app = App();
      app.use(function*() {
        this.state.title = 'home';
        this.render('not-exist');
      });

      request(app.listen())
      .get('/')
      .expect(500, done);
    });

    it('should render with extname ok', function (done) {
      var app = App();
      app.use(function*() {
        this.state.title = 'home';
        this.render('home.jsx');
      });

      request(app.listen())
      .get('/')
      .expect(200)
      .expect('<!DOCTYPE html><div>home</div>', done);
    });

    it('should render with beautify ok', function (done) {
      var app = App({
        beautify: true
      });
      app.use(function*() {
        this.state.title = 'home';
        this.render('home.jsx');
      });

      request(app.listen())
      .get('/')
      .expect(200)
      .expect('<!DOCTYPE html>\n<div>home</div>', done);
    });

    it('should render with writeResp=false in options', function (done) {
      var app = App({
        writeResp: false
      });
      app.use(function*() {
        this.render('home.jsx');
      });

      request(app.listen())
      .get('/')
      .expect(404, done);
    });

    it('should render with writeResp=false in contenxt', function (done) {
      var app = App();
      app.use(function*() {
        this.render('home.jsx', {
          writeResp: false
        });
      });

      request(app.listen())
      .get('/')
      .expect(404, done);
    });

    it('should babel only with regexp', function (done) {
      var app = App({
        babel: {
          only: [new RegExp('^' + path.join(__dirname, 'support/views'))]
        }
      });

      app.use(function*() {
        this.state.title = 'home';
        this.render('home.jsx');
      });

      request(app.listen())
      .get('/')
      .expect(200)
      .expect('<!DOCTYPE html><div>home</div>', done);
    });
  });
});

function App(options) {
  options = options || {};
  copy({
    views: path.join(__dirname, 'support/views')
  }).to(options);

  var app = koa();
  react(app, options);
  return app;
}
