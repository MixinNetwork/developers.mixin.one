import './index.scss';
import $ from 'jquery';

function Event(router, api) {
  this.router = router;
  this.api = api;
  this.templateIndex = require('./index.html');
  this.partialItem = require('./item.html');
}

Event.prototype = {
  render: function () {
    const self = this;
    $('title').html('Developer Events');
    $.ajax({
      type: 'GET',
      url: 'https://mixin.one/assets/developer-events.json',
      success: function(resp) {
        $('body').attr('class', 'event layout');
        $('#layout-container').html(self.templateIndex({
          logoURL: require('../home/logo.png')
        }));
        for (var i in resp.data) {
          var item = resp.data[i];
          var date = new Date(item.created_at.split(' ')[0]);
          item['time'] = self.formatDate(date);
          $('.content').append(self.partialItem(item));
        }
        self.router.updatePageLinks();
      },
      error: function(event) {
        self.api.error(event.responseJSON);
      }
    });
  },

  formatDate: function (date) {
    var monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    return day + ' ' + monthNames[monthIndex] + ', ' + year;
  }
};

export default Event;
