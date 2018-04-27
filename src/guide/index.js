import './index.scss';
import $ from 'jquery';

function Guide(router) {
  this.router = router;
  this.templateLayout = require('./layout.html');
  this.Error404 = require('../404.html');
}

Guide.prototype = {
  index: function () {
    this.show('index');
  },

  show: function (id) {
    const self = this;
    try {
      var page = require('./' + id + '.html');
      $('body').attr('class', 'guide layout');
      $('#layout-container').html(self.templateLayout());
      $('#layout-container .container .content').html(page);
      var title = $('input[name="title"]').val();
      $('title').html(title + ' - ' + APP_NAME);
      $('h1.title').html(title);
      self.router.updatePageLinks();
    } catch (e) {
      if (e.message.indexOf('Cannot find module') !== 0) {
        throw e;
      }
      $('body').attr('class', 'error layout');
      $('#layout-container').html(self.Error404());
      self.router.updatePageLinks();
    }
  }
};

export default Guide;
