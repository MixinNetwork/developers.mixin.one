import './index.scss';
import '../../node_modules/croppie/croppie.css';
import $ from 'jquery';
import Croppie from 'croppie';
import forge from 'node-forge';
import uuid from 'uuid/v4';
const BigNumber = require('bignumber.js');
import FormUtils from '../utils/form.js';
import Mixin from '../utils/mixin.js';

function App(router, api) {
  this.router = router;
  this.api = api;
  this.templateLayout = require('./layout.html');
  this.templateDashboard = require('./dashboard.html');
  this.templateForm = require('./form.html');
  this.partialApp = require('./app.html');
}

App.prototype = {
  index: function () {
    const self = this;
    self.api.account.me(function (resp) {
      if (resp.error) {
        return;
      }
      var me = resp.data;
      me.full_name = me.full_name.trim().length > 0 ? me.full_name.trim() : '^_^';
      self.api.app.index(function (resp) {
        if (resp.error) {
          return;
        }
        var github = self.api.account.github();
        if (github != null && github != undefined) {
          me.github = github;
        }
        self.api.app.property(function (result) {
          if (result.error) {
            return;
          }

          me.client_id = CLIENT_ID;
          let base = resp.data.length - result.data.count;
          let price = result.data.price;
          if (!price) {
            price = '0.001';
          }
          if (base >= 0) {
            const array = ['one', 'two', 'five'];
            array.forEach(e => {
              me['trace_'+e] = uuid();
            });
            me.amount_one = BigNumber(price).times(base+1).toString();
            me.amount_two = BigNumber(price).times(base+2).toString();
            me.amount_five = BigNumber(price).times(base+5).toString();
          }

          $('body').attr('class', 'app layout');
          $('#layout-container').html(self.templateLayout({title: "Dashboard"}));
          $('#layout-container .content').html(self.templateDashboard(me));
          if (base >= 0) {
            $('.new.app').hide();
          } else {
            $('.app.payments').hide();
          }
          self.handleSignOut();
          for (var i in resp.data) {
            var app = resp.data[i];
            if (app.icon_url.indexOf('https://') !== 0) {
              app.icon_url = "https://images.mixin.one/E2y0BnTopFK9qey0YI-8xV3M82kudNnTaGw0U5SU065864SsewNUo6fe9kDF1HIzVYhXqzws4lBZnLj1lPsjk-0=s256";
            }
            var appItem = self.partialApp(app);
            $('#layout-container .content .apps.container').append(appItem);
          }
          $('.apps.container').on('click', '.secret.action', function () {
            if (!window.confirm('Do you want to reset secret?')) {
              return;
            }
            var secretItem = $(this);
            var appId = secretItem.parents('.app.block').attr('data-app-id');
            self.api.app.secret(function (resp) {
              if (resp.error) {
                return;
              }
              secretItem.html(resp.data.app_secret);
              secretItem.removeClass('action');
            }, appId);
          });
          var randInt = function (max) {
            return Math.floor(Math.random() * Math.floor(max));
          };
          $('.apps.container').on('click', '.session.action', function () {
            if (!window.confirm('Do you want to reset session?')) {
              return;
            }
            var sessionItem= $(this);
            var appId = sessionItem.parents('.app.block').attr('data-app-id');
            var appNumber = sessionItem.parents('.app.block').attr('data-app-number');
            var pin = "" + (randInt(9) + 1) + randInt(10) + randInt(10) + randInt(10) + randInt(10) + randInt(10);
            var keypair = forge.pki.rsa.generateKeyPair({bits: 1024, e: 0x10001});
            var body = forge.asn1.toDer(forge.pki.publicKeyToAsn1(keypair.publicKey)).getBytes();
            var public_key = forge.util.encode64(body, 64);
            var private_key = forge.pki.privateKeyToPem(keypair.privateKey);
            self.api.app.session(function (resp) {
              if (resp.error) {
                return;
              }
              var data = {
                "pin": pin,
                "client_id": appId,
                "session_id": resp.data.session_id,
                "pin_token": resp.data.pin_token,
                "private_key": private_key
              }
              var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, ' '));
              var anchor = document.getElementById(appId);
              anchor.setAttribute("href", dataStr)
              anchor.setAttribute("download", `keystore-${appNumber}.json`);
              anchor.click();
            }, appId, pin, public_key);
          });
          $('.apps.container').on('click', '.code.show', function () {
            var appId = $(this).parents('.app.block').attr('data-app-id');
            let objStr = window.localStorage.getItem(appId);
            let data = JSON.parse(objStr);
            if (data == undefined) {
              self.router.replace("/tokens/"+appId+"?return=dashboard");
              return;
            }

            let token = new Mixin().signAuthenticationToken(appId, data.session_id, data.private_key, 'GET', '/me', "");
            self.api.account.user(function(resp) {
              if (resp.error) {
                return;
              }
              $('.app.code.rotate').hide();
              $('.app.code.show').html(resp.data.code_url);
            }, token);
          });
          $('.apps.container').on('click', '.code.rotate', function () {
            var appId = $(this).parents('.app.block').attr('data-app-id');
            let objStr = window.localStorage.getItem(appId);
            let data = JSON.parse(objStr);
            if (data == undefined) {
              self.router.replace("/tokens/"+appId+"?return=dashboard");
              return;
            }

            let token = new Mixin().signAuthenticationToken(appId, data.session_id, data.private_key, 'GET', '/me/code', "");
            self.api.account.rotateCode(function(resp) {
              if (resp.error) {
                return;
              }
              $('.app.code.rotate').hide();
              $('.app.code.show').html(resp.data.code_url);
            }, token);
          });
          self.router.updatePageLinks();
          if (github == null || github == undefined) {
            self.api.github.user(function (resp) {
              if (resp.error) {
                $('.bonus').show();
                return;
              }

              $('.github').html(resp.data.html_url);
            });
          }
        });
      });
    });
  },

  new: function () {
    const self = this;
    self.api.app.index(function (resp) {
      if (resp.error) {
        return;
      }
      $('body').attr('class', 'app layout');
      $('#layout-container').html(self.templateLayout({title: "Create App"}));
      $('#layout-container .content').html(self.templateForm());
      $('form').on('submit', function (event) {
        event.preventDefault();
        var params = new FormUtils().serialize($(this));
        self.api.app.create(function (resp) {
          if (resp.error) {
            return;
          }
          self.router.replace('/dashboard');
        }, params);
      });
      self.handleSignOut();
      self.router.updatePageLinks();
      self.loadImage();
    });
  },

  edit: function (id) {
    const self = this;
    self.api.app.show(function (resp) {
      if (resp.error) {
        return;
      }
      resp.data.check = '';
      if (resp.data.capabilities.includes('IMMERSIVE')) {
        resp.data.check = 'checked';
      }
      resp.data.resources = resp.data.resource_patterns.join('\r\n');
      $('body').attr('class', 'app layout');
      $('#layout-container').html(self.templateLayout({title: "Edit App"}));
      $('#layout-container .content').html(self.templateForm(resp.data));
      $('form').on('submit', function (event) {
        event.preventDefault();
        var params = new FormUtils().serialize($(this));
        self.api.app.update(function (resp) {
          if (resp.error) {
            return;
          }
          self.router.replace('/dashboard');
        }, id, params);
      });
      self.handleSignOut();
      self.router.updatePageLinks();
      self.loadImage();
    }, id);
  },

  loadImage: function () {
    const self = this;
    var preview = $('.icon.croppie')[0];
    var croppie = new Croppie(preview, {
      viewport: {
        width: 128,
        height: 128,
        type: 'circle'
      },
      boundary: {
        width: 128,
        height: 128
      },
      enableZoom: true,
      mouseWheelZoom: false,
      showZoomer: false
    });
    $('.icon.chooser').on('click', function () {
      $('input[type=file]').trigger('click');
    });
    var change = false;
    $('input[type=file]').on('change', function () {
      var reader  = new FileReader();
      reader.addEventListener("load", function (event) {
        $('.icon.chooser').remove();
        $(preview).css('display', 'inline-block');
        croppie.bind({url: event.target.result});
      }, false);
      var file = this.files[0];
      if (file) {
        change = true;
        reader.readAsDataURL(file);
      }
    });
    $('input[type=submit]').on('click', function (event) {
      event.preventDefault();
      if (!change) {
        $('form').submit();
        return;
      }
      croppie.result({type: 'base64', size: {width: 512, height: 512}}).then(function(base64) {
        if (change) {
          $('input[name=icon_base64]').val(base64.substring(22));
        }
        $('form').submit();
      });
    });
  },

  handleSignOut: function () {
    const self = this;
    $('.nav.sign.out').click(function (event) {
      event.preventDefault();
      self.api.account.clear(function () {
        self.router.replace('/');
      });
    });
  }
};

export default App;
