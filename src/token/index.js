import './index.scss';
import $ from 'jquery';
import validator from 'validator';
import FormUtils from '../utils/form.js';

function Token(router, api) {
  this.router = router;
  this.api = api;
  this.templateIndex = require('./index.html');
}

Token.prototype = {
  index: function (id) {
    const self = this;
    let objStr = window.localStorage.getItem(id);
    let data = JSON.parse(objStr);
    if (data == undefined) {
      data = {};
    }

    $('body').attr('class', 'token layout');
    $('#layout-container').html(self.templateIndex(data));
    $('form').on('submit', function (event) {
      event.preventDefault();

      var params = new FormUtils().serialize($(this));
      if (!validator.isUUID(params['session_id'], 4)) {
        self.api.notify('error', 'Session Id Format Error');
        return;
      }
      if (!validator.isBase64(params['pin_token'])) {
        self.api.notify('error', 'Pin Token Format Error');
        return;
      }
      window.localStorage.setItem(id, JSON.stringify(params));
      self.router.replace("/apps/"+id+"/assets");
    });
    self.router.updatePageLinks();
  }
};

export default Token;
