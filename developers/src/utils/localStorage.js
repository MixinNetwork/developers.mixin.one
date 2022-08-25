import validator from 'validator';

export const ls = {
  get(key) {
    const value = window.localStorage.getItem(key);
    try {
      const info = JSON.parse(value);
      // TODO: signature is error if use old token
      if (validator.isUUID(key, 4)) {
        if (info && !validator.isBase64(info.private_key, { urlSafe: true })) {
          window.localStorage.removeItem(key);
          return {};
        }
      }
      return info;
    } catch (e) {
      return value;
    }
  },
  set(key, value) {
    if (typeof value === 'object') value = JSON.stringify(value);
    return window.localStorage.setItem(key, value);
  },
  rm(key) {
    return window.localStorage.removeItem(key);
  },
};
