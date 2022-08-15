import en from '@/i18n/en';
import { ls } from '@/utils';

const cbFactory = ($message, t) => (err) => {
  const { code, description, message } = err;

  if (code === 'ECONNABORTED' || message === 'Network Error') {
    $message.error({ showClose: true, duration: 2000, message: t('message.errors.overtime') });
    return;
  }

  if (code === 20123) {
    const max_app_numbers = description.replace(/\D/g, '');
    $message.error({
      showClose: true,
      duration: 2000,
      message: `${t(`message.errors.${code}`, { count: max_app_numbers })}(${code})`,
    });
  } else {
    let key = 'unknown';
    if (en.message.errors[code]) {
      key = String(code);
    }
    $message.error({ showClose: true, duration: 2000, message: `${t(`message.errors.${key}`)}(${code})` });
  }

  const ignoreError = ls.get('ignoreError') === 'true';
  if (!ignoreError && code === 401) {
    setTimeout(() => {
      window.localStorage.clear();
      // eslint-disable-next-line max-len
      window.location.href = `https://mixin-www.zeromesh.net/oauth/authorize?client_id=${process.env.VUE_APP_CLIENT_ID}&scope=PROFILE:READ+APPS:READ+APPS:WRITE&response_type=code`;
    }, 100);
  }
};

export default cbFactory;