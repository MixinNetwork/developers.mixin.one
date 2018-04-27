function App(api) {
  this.api = api;
}

App.prototype = {
  index: function (callback) {
    this.api.request('GET', '/apps', undefined, function (resp) {
      callback(resp);
    });
  },

  show: function (callback, id) {
    this.api.request('GET', '/apps/' + id, undefined, function (resp) {
      callback(resp);
    });
  },

  create: function (callback, params) {
    this.api.request('POST', '/apps', params, function (resp) {
      callback(resp);
    });
  },

  update: function (callback, id, params) {
    this.api.request('POST', '/apps/' + id, params, function (resp) {
      callback(resp);
    });
  },

  secret: function (callback, id) {
    this.api.request('POST', '/apps/' + id + '/secret', undefined, function (resp) {
      callback(resp);
    });
  },

  session: function (callback, id, pin, public_key) {
    this.api.request('POST', '/apps/' + id + '/session', {pin: pin, session_secret: public_key}, function (resp) {
      callback(resp);
    });
  }
};

export default App;
