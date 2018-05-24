function Asset(api) {
  this.api = api;
}

Asset.prototype = {
  index: function (token, callback) {
    this.api.requestWithToken('GET', '/assets', undefined, token, function (resp) {
      callback(resp);
    });
  },

  show: function (id, token, callback) {
    this.api.requestWithToken('GET', '/assets/'+id, undefined, token, function (resp) {
      callback(resp);
    });
  }
};

export default Asset;
