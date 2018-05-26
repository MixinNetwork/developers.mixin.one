import 'simple-line-icons/scss/simple-line-icons.scss';
import './layout.scss';
import $ from 'jquery';
import Navigo from 'navigo';
import Locale from './locale';
import API from './api';
import Home from './home';
import Auth from './auth';
import App from './client';
import Guide from './guide';
import Token from './token';
import Asset from './asset';

const PartialLoading = require('./loading.html');
const Error404 = require('./404.html');
const router = new Navigo(WEB_ROOT);
const api = new API(router, API_ROOT);

window.i18n = new Locale(navigator.language);

router.replace = function(url) {
  this.resolve(url);
  this.pause(true);
  this.navigate(url);
  this.pause(false);
};

router.hooks({
  before: function(done, params) {
    $('body').attr('class', 'loading layout');
    $('#layout-container').html(PartialLoading());
    setTimeout(function() {
      $('title').html(APP_NAME);
      done(true);
    }, 100);
  },
  after: function(params) {
    router.updatePageLinks();
  }
});

router.on({
  '/auth': function () {
    new Auth(router, api).render();
  },
  '/apps/new': function () {
    new App(router, api).new();
  },
  '/apps/:id': function (params) {
    new Asset(router, api).index(params['id']);
  },
  '/apps/:id/assets/:asset_id': function (params) {
    new Asset(router, api).show(params['id'], params['asset_id']);
  },
  '/apps/:id/edit': function (params) {
    new App(router, api).edit(params['id']);
  },
  '/dashboard': function () {
    new App(router, api).index();
  },
  '/guides/:id': function (params) {
    new Guide(router).show(params['id']);
  },
  '/guides': function () {
    new Guide(router).index();
  },
  '/tokens/:id': function (params) {
    new Token(router, api).index(params['id']);
  },
  '/': function () {
    new Home(router).index();
  }
}).notFound(function () {
  $('#layout-container').html(Error404());
  $('body').attr('class', 'error layout');
  router.updatePageLinks();
}).resolve();
