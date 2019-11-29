import 'simple-line-icons/scss/simple-line-icons.scss';
import './layout.scss';
import $ from 'jquery';
import Navigo from 'navigo';
import Locale from './locale';
import API from './api';
import Home from './home';
import Auth from './auth';
import Guide from './guide';
import Token from './token';
import Asset from './asset';
import Event from './event';

const PartialLoading = require('./loading.html');
const Error404 = require('./404.html');
const router = new Navigo(WEB_ROOT);
const api = new API(router, API_ROOT);

window.i18n = new Locale(navigator.language);

router.replace = function (url) {
  this.resolve(url);
  this.pause(true);
  this.navigate(url);
  this.pause(false);
};

router.hooks({
  before: function (done, params) {
    $('body').attr('class', 'loading layout');
    $('#layout-container').html(PartialLoading());
    setTimeout(function () {
      $('title').html(APP_NAME);
      done(true);
    }, 100);
  },
  after: function (params) {
    router.updatePageLinks();
  }
});

router.on({
  '/auth': function () {
    new Auth(router, api).render();
  },
  '/github/callback': function () {
    new Auth(router, api).callback();
  },
  '/apps/:id/assets': function (params) {
    new Asset(router, api).index(params['id']);
  },
  '/apps/:id/assets/:asset_id': function (params) {
    new Asset(router, api).show(params['id'], params['asset_id']);
  },
  '/apps/:id/snapshots/:snapshot_id': function (params) {
    new Asset(router, api).snapshot(params['id'], params['snapshot_id']);
  },
  '/dashboard': function () {
    window.location.href = window.location.origin + '/dashboard'
  },
  '/guides/:id': function (params) {
    new Guide(router).show(params['id']);
  },
  '/guides': function () {
    new Guide(router).index();
  },
  '/events': function (params) {
    new Event(router, api).render();
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
