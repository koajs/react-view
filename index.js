/*!
 * koa-react-view - index.js
 * MIT Licensed
 */

'use strict';

/**
 * Module dependencies.
 */

var beautifyHTML = require('js-beautify').html;
var register = require('babel/register');
var assert = require('assert');
var copy = require('copy-to');
var React = require('react');
var path = require('path');

var defaultOptions = {
  babel: {},
  doctype: '<!DOCTYPE html>',
  beautify: false,
  cache: process.env.NODE_ENV === 'production',
  extname: 'jsx',
  writeResp: true,
  views: path.join(__dirname, 'views')
};

module.exports = function (app, _options) {
  _options = _options || {};
  // only the files in options.views will be compiled by default
  defaultOptions.babel.only = path.resolve(_options.views || defaultOptions.views);

  var options = {};
  copy(_options).and(defaultOptions).to(options);
  options.views = path.resolve(_options.views);
  options.extname = options.extname.replace(/^\.?/, '.');

  // match function for cache clean
  var match = createMatchFunction(options.babel.only || options.views);
  // regist babel
  register(options.babel);

  /**
   * render react template to html
   *
   * @param {String} filename
   * @param {Object} _locals
   * @return {String}
   */
  app.context.render = function(filename, _locals) {
    // resolve filepath
    var filepath = path.join(options.views, filename);
    if (filepath.indexOf(options.views) !== 0) {
      var err = new Error('Cannot find module ' + filename);
      err.code = 'REACT';
      throw err;
    }
    if (!path.extname(filepath)) filepath += options.extname;

    var locals = {};
    // merge koa state
    merge(locals, this.state || {});
    merge(locals, _locals);

    var markup = options.doctype || '';
    try {
      var component = require(filepath);
      // Transpiled ES6 may export components as { default: Component }
      component = component.default || component;
      markup += React.renderToStaticMarkup(React.createElement(component, locals));
    } catch (err) {
      err.code = 'REACT';
      throw err;
    } finally {
      if (!options.cache) {
        cleanCache(match);
      }
    }

   if (options.beautify) {
      // NOTE: This will screw up some things where whitespace is important, and be
      // subtly different than prod.
      markup = beautifyHTML(markup);
    }

    var writeResp = locals.writeResp === false
      ? false
      : (locals.writeResp || options.writeResp);
    if (writeResp) {
      this.type = 'html';
      this.body = markup;
    }

    return markup;
  };
};


/**
 * merge source to taget
 *
 * @param {Object} target
 * @param {Object} source
 * @return {Object}
 */
function merge(target, source) {
  for (var key in source) {
    target[key] = source[key];
  }

  return target;
}

/**
 * create a match function for clean cache
 *
 * @param {Mixed} input
 * @return {Function}
 */
function createMatchFunction(input) {
  if (!Array.isArray(input)) input = [input];

  input = input.map(function (item) {
    return typeof item === 'string'
      ? new RegExp('^' + item)
      : item;
  });

  return function match(file) {
    for (var i = 0; i < input.length; i++) {
      if (input[i].test(file)) return true;
    }
  };
}

/**
 * Remove all files from the module cache that are in the view folder.
 *
 * @param {Function} match
 */
function cleanCache(match) {
  Object.keys(require.cache).forEach(function(module) {
    if (match(require.cache[module].filename)) {
      delete require.cache[module];
    }
  });
}
