import en from '@/i18n/en';

const responseCallback = (err) => {
  const { code, description, message } = err;

  if (code === 'ECONNABORTED' || message === 'Network Error') {
    _vm.$message.error({ showClose: true, duration: 2000, message: _vm.$t('message.errors.overtime') });
    return;
  }

  if (code === 20123) {
    const max_app_numbers = description.replace(/\D/g, '');
    _vm.$message.error({ showClose: true, duration: 2000, message: `${_vm.$t(`message.errors.${code}`, { count: max_app_numbers })}(${code})` });
  } else {
    let key = 'unknown';
    if (en.message.errors[code]) {
      key = String(code);
    }
    _vm.$message.error({ showClose: true, duration: 2000, message: `${_vm.$t(`message.errors.${key}`)}(${code})` });
  }

  if (!_vm.skipInterceptor && code === 401) {
    setTimeout(() => {
      window.localStorage.clear();
      // eslint-disable-next-line max-len
      window.location.href = `https://mixin-www.zeromesh.net/oauth/authorize?client_id=${process.env.VUE_APP_CLIENT_ID}&scope=PROFILE:READ+APPS:READ+APPS:WRITE&response_type=code`;
    }, 100);
  }
};

export const defaultApiConfig = {
  requestConfig: { responseCallback },
};

export default defaultApiConfig;
