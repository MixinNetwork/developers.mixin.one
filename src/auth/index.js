import URLUtils from '../utils/url.js';

function Auth(router, api) {
  this.router = router;
  this.api = api;
}

Auth.prototype = {
  render: function () {
    const self = this;
    const error = new URLUtils().getUrlParameter("error");
    const authorizationCode = new URLUtils().getUrlParameter("code");
    if (error === 'access_denied') {
      self.api.notify('error', i18n.t('general.errors.403'));
      self.router.replace('/');
      return;
    }
    self.api.account.authenticate(function (resp) {
      if (resp.error && resp.error.code === 403) {
        self.api.notify('error', i18n.t('general.errors.403'));
        self.router.replace('/');
        return true;
      }
      if (resp.error) {
        return false;
      }
      self.router.replace('/dashboard');
    }, authorizationCode);
  },

  callback: function () {
    const code = new URLUtils().getUrlParameter("code");
    const self = this;
    self.api.github.oauth(function (resp) {
      if (resp.error != null && resp.error != undefined) {
        self.api.notify('error', i18n.t('general.errors.'+resp.error.code));
      }
      self.router.replace('/dashboard');
    }, code);
  }
};

export default Auth;
