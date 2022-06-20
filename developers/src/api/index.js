const responseCallback = (err) => {
  const { code, description, message } = err

  if (code === 20123) {
    let max_app_numbers = description.replace(/\D/g, "")
    _vm.$message.error(`${_vm.$t('message.errors.' + code, { count: max_app_numbers })}(${code})`, { showClose: true, duration: 2000 })
  } else {
    _vm.$message.error(`${_vm.$t('message.errors.' + code)}(${code})`, { showClose: true, duration: 2000 })
  }
  if (_vm._not_through_interceptor) return false

  if (code === 401) {
    setTimeout(() => {
      window.localStorage.clear()
      window.location.href = `https://mixin-www.zeromesh.net/oauth/authorize?client_id=${process.env.VUE_APP_CLIENT_ID}&scope=PROFILE:READ+APPS:READ+APPS:WRITE+ASSETS:READ&response_type=code&redirect_uri=localhost:8080/auth`
    }, 1000 * 20)
  }

  if (code === 'ECONNABORTED' || message === 'Network Error') {
    _vm.$message.error(_vm.$t('message.errors.overtime'), { showClose: true, duration: 2000 })
  }
};

const defaultApiConfig = {};
defaultApiConfig.requestConfig = { responseCallback }

export default defaultApiConfig

