import './index.scss';
import $ from 'jquery';
import uuid from 'uuid/v4';
import Mixin from '../utils/mixin.js';
import FormUtils from '../utils/form.js';

function Asset(router, api) {
  this.router = router;
  this.api = api;
  this.templateIndex = require('./index.html');
  this.templateShow = require('./show.html');
}

Asset.prototype = {
  index: function (id) {
    const self = this;

    let objStr = window.localStorage.getItem(id);
    let data = JSON.parse(objStr);
    if (data == undefined) {
      self.router.replace("/tokens/"+id);
      return
    }

    let token = new Mixin().signAuthenticationToken(data.client_id, data.session_id, data.private_key, 'GET', '/assets', "");
    this.api.asset.index(token, function(resp) {
      if (resp.error) {
        return
      }
      $('body').attr('class', 'asset layout');
      $('#layout-container').html(self.templateIndex(resp));
      $('.asset.item').on('click', function() {
        event.preventDefault();

        self.router.replace("/apps/"+id+"/assets/"+$(this).data('asset-id'));
      });
      self.router.updatePageLinks();
    });
  },

  show: function (id, assetId) {
    const self = this;
    let objStr = window.localStorage.getItem(id);
    let data = JSON.parse(objStr);
    if (data == undefined) {
      self.router.replace("/tokens/"+id);
      return
    }

    let token = new Mixin().signAuthenticationToken(data.client_id, data.session_id, data.private_key, 'GET', '/assets/'+assetId, '');
    this.api.asset.show(assetId, token, function(resp) {
      if (resp.error) {
        return
      }

      $('body').attr('class', 'asset layout');
      $('#layout-container').html(self.templateShow(resp.data));
      self.router.updatePageLinks();
      $('form').on('submit', function (event) {
        event.preventDefault();
        let params = new FormUtils().serialize($(this));

        if (params['to'].trim().length < 5) {
          self.api.notify('error', 'Mixin Id Format Error');
          return
        }
        var pin = params['pin'].trim();
        if (pin.length !== 6) {
          self.api.notify('error', 'Pin Format Error');
          return
        }
        var iterator = params['iterator'].trim();

        let token = new Mixin().signAuthenticationToken(data.client_id, data.session_id, data.private_key, 'GET', '/search/'+params['to'], '');
        self.api.account.search(function(resp) {
          if (resp.error) {
            return
          }

          pin = new Mixin().signEncryptedPin(pin, data.pin_token, data.session_id, data.private_key, iterator);
          let req = {
            "asset_id":        assetId,
            "counter_user_id": resp.data.user_id,
            "amount":          params['amount'],
            "pin":             pin,
            "trace_id":        uuid(),
          }
          let token = new Mixin().signAuthenticationToken(data.client_id, data.session_id, data.private_key, 'POST', '/transfers', req);
          self.api.account.transfer(function(resp) {
            if (resp.error) {
              return
            }

            self.router.replace("/apps/"+id);
          }, token, req);
        }, params['to'], token);
      });
    });
  }
};

export default Asset;
