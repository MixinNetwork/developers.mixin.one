function Account(api) {
  this.api = api;
}

Account.prototype = {
  authenticate: function (callback, authorizationCode) {
    var params = {
      "client_id": CLIENT_ID,
      "code": authorizationCode
    };
    this.api.request('POST', '/oauth/token', params, function(resp) {
      if (resp.data) {
        if (resp.data.scope.indexOf('APPS:READ') < 0 || resp.data.scope.indexOf('APPS:WRITE') < 0) {
          resp.error = { code: 403, description: 'Access denied.' };
          return callback(resp);
        }
        window.localStorage.setItem('token', resp.data.access_token);
      }
      return callback(resp);
    });
  },

  transfer: function(callback, token, params) {
    this.api.requestWithToken('POST', '/transfers', params, token, function(resp) {
      callback(resp);
    });
  },

  search: function(callback, id, token) {
    this.api.requestWithToken('GET', '/search/'+id, undefined, token, function(resp) {
      callback(resp);
    });
  },

  me: function (callback) {
    this.api.request('GET', '/me', undefined, function(resp) {
      callback(resp);
    });
  },

  token: function () {
    return window.localStorage.getItem('token');
  },

  clear: function (callback) {
    window.localStorage.clear();
    if (typeof callback === 'function') {
      callback();
    }
  }
};

export default Account;
