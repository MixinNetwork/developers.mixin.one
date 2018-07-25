import $ from 'jquery';

function Github(api) {
  this.api = api;
}

Github.prototype = {
  oauth: function (callback, code) {
    this.request('POST', 'auth', {'code': code}, function(resp) {
      if (resp.data != null && resp.data != undefined) {
        window.localStorage.setItem('github', resp.data.html_url);
      }
      callback(resp);
    });
  },

  user: function (callback) {
    this.request('GET', 'me', undefined, function(resp) {
      if (resp.data != null && resp.data != undefined) {
        window.localStorage.setItem('github', resp.data.html_url);
      }
      callback(resp);
    });
  },

  request: function (method, path, params, callback) {
    const self = this;
    $.ajax({
      type: method,
      url: "https://developers-api.mixin.zone/"+path,
      contentType: "application/json",
      data: JSON.stringify(params),
      beforeSend: function(xhr) {
        xhr.setRequestHeader("Authorization", "Bearer " + self.api.account.token());
      },
      success: function(resp) {
        return callback(resp);
      },
      error: function(event) {
        return self.api.error(event);
      }
    });
  }
}

export default Github;
