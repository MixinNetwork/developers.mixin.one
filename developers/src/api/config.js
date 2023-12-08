import en from '@/i18n/en';

const commonCallback = ($message, t, err) => {
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
};

export const userCbFactory = ($message, t) => (err) => {
  commonCallback($message, t, err);

  if (err.code === 401) {
    setTimeout(() => {
      window.localStorage.clear();
      // eslint-disable-next-line max-len
      window.location.href = `https://mixin.one/oauth/authorize?client_id=${process.env.VUE_APP_CLIENT_ID}&scope=PROFILE:READ+APPS:READ+APPS:WRITE&response_type=code`;
    }, 100);
  }
};

export const botCbFactory = ($message, t, onError) => (err) => {
  commonCallback($message, t, err);
  onError(err);
};
