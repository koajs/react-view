var Content = require('./components/content');
var unescapeHtml = require('unescape-html');
var React = require('react');

function initApp() {
  var container = document.getElementById('content');
  var list = unescapeHtml(window.__list__);
  list = JSON.parse(list);
  // reuse server side render result
  React.render(
    <Content list={list}/>,
    container
  );
}

initApp();
