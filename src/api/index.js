import $ from 'jquery';
import Noty from 'noty';
import Account from './account.js';
import App from './app.js';
import Asset from './asset.js';

function API(router, root) {
  this.router = router;
  this.root = root;
  this.account = new Account(this);
  this.app = new App(this);
  this.asset = new Asset(this);
  this.Error404 = require('../404.html');
  this.ErrorGeneral = require('../error.html');
}

API.prototype = {
  requestWithToken: function(method, path, params, token, callback) {
    const self = this;
    $.ajax({
      type: method,
      url: self.root + path,
      contentType: "application/json",
      data: JSON.stringify(params),
      beforeSend: function(xhr) {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: function(resp) {
        var consumed = false;
        if (typeof callback === 'function') {
          consumed = callback(resp);
        }
        if (!consumed && resp.error !== null && resp.error !== undefined) {
          self.error(resp);
        }
      },
      error: function(event) {
        self.error(event.responseJSON, callback);
      }
    });
  },

  request: function(method, path, params, callback) {
    this.requestWithToken(method, path, params, this.account.token(), callback);
  },

  error: function(resp, callback) {
    if (resp == null || resp == undefined || resp.error === null || resp.error === undefined) {
      resp = {error: { code: 0, description: 'unknown error' }};
    }

    var consumed = false;
    if (typeof callback === 'function') {
      consumed = callback(resp);
    }
    if (!consumed) {
      switch (resp.error.code) {
        case 401:
          this.account.clear();
          window.location.replace('https://mixin.one/oauth/authorize?client_id='+CLIENT_ID+'&scope=PROFILE:READ+APPS:READ+APPS:WRITE&response_type=code&redirect_uri=https://developers.mixin.one/auth');
          break;
        case 404:
          $('#layout-container').html(this.Error404());
          $('body').attr('class', 'error layout');
          this.router.updatePageLinks();
          break;
        default:
          if ($('#layout-container > .spinner-container').length === 1) {
            $('#layout-container').html(this.ErrorGeneral());
            $('body').attr('class', 'error layout');
            this.router.updatePageLinks();
          }
          this.notify('error', i18n.t('general.errors.' + resp.error.code));
          break;
      }
    }
  },

  notify: function(type, text) {
    new Noty({
      type: type,
      layout: 'top',
      theme: 'nest',
      text: text,
      timeout: 3000,
      progressBar: false,
      queue: 'api',
      killer: 'api',
      force: true,
      animation: {
        open: 'animated bounceInDown',
        close: 'animated slideOutUp noty'
      }
    }).show();
  }
};

export default API;
