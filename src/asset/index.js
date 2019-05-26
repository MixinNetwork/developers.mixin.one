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
  this.templateSnapshot = require('./snapshot.html');
}

Asset.prototype = {
  index: function (id) {
    const self = this;

    let objStr = window.localStorage.getItem(id);
    let data = JSON.parse(objStr);
    if (data == undefined) {
      self.router.replace("/tokens/"+id);
      return;
    }

    let token = new Mixin().signAuthenticationToken(id, data.session_id, data.private_key, 'GET', '/assets', "");
    this.api.asset.index(token, function(resp) {
      if (resp.error) {
        return;
      }
      $('body').attr('class', 'asset layout');
      $('#layout-container').html(self.templateIndex(resp));
      $('.asset.item').on('click', function(event) {
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
      return;
    }

    let token = new Mixin().signAuthenticationToken(id, data.session_id, data.private_key, 'GET', '/assets/'+assetId, '');
    this.api.asset.show(assetId, token, function(resp) {
      if (resp.error) {
        return;
      }

      $('body').attr('class', 'asset layout');
      $('#layout-container').html(self.templateShow(resp.data));
      self.router.updatePageLinks();
      $('form').on('submit', function (event) {
        event.preventDefault();
        let params = new FormUtils().serialize($(this));
        var to = params['to'].trim();
        if (to.length < 5) {
          self.api.notify('error', 'Mixin Id Format Error');
          return;
        }
        var pin = params['pin'].trim();
        if (pin.length !== 6) {
          self.api.notify('error', 'Pin Format Error');
          return;
        }
        var iterator = params['iterator'].trim();
        if (to.startsWith('XIN')) {
          pin = new Mixin().signEncryptedPin(pin, data.pin_token, data.session_id, data.private_key, iterator);
          let req = {
            "asset_id":        assetId,
            "opponent_key":    to,
            "amount":          params['amount'],
            "pin":             pin,
            "trace_id":        uuid()
          }
          let token = new Mixin().signAuthenticationToken(id, data.session_id, data.private_key, 'POST', '/transactions', req);
          self.api.account.transactions(function(resp) {
            if (resp.error) {
              return;
            }

            self.router.replace('/apps/'+id+'/snapshots/'+resp.data.snapshot);
          }, token, req);
          return
        }

        let token = new Mixin().signAuthenticationToken(id, data.session_id, data.private_key, 'GET', '/search/'+to, '');
        self.api.account.search(function(resp) {
          if (resp.error) {
            return;
          }

          pin = new Mixin().signEncryptedPin(pin, data.pin_token, data.session_id, data.private_key, iterator);
          let req = {
            "asset_id":        assetId,
            "opponent_id":     resp.data.user_id,
            "amount":          params['amount'],
            "pin":             pin,
            "trace_id":        uuid()
          }
          let token = new Mixin().signAuthenticationToken(id, data.session_id, data.private_key, 'POST', '/transfers', req);
          self.api.account.transfers(function(resp) {
            if (resp.error) {
              return;
            }

            self.router.replace('/apps/'+id+'/assets');
          }, token, req);
        }, to, token);
      });
    });
  },

  snapshot: function (id, snapshotId) {
    const self = this;
    let objStr = window.localStorage.getItem(id);
    let data = JSON.parse(objStr);
    if (data == undefined) {
      self.router.replace("/tokens/"+id);
      return;
    }

    let token = new Mixin().signAuthenticationToken(id, data.session_id, data.private_key, 'GET', '/snapshots/'+snapshotId, '');
    self.api.account.snapshots(function(resp) {
      if (resp.error) {
        return;
      }

      $('body').attr('class', 'asset layout');
      $('#layout-container').html(self.templateSnapshot(resp.data));
    }, token, snapshotId);
  }
};

export default Asset;
