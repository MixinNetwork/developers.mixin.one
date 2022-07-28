const responseCallback = (err) => {
  const { code, description, message } = err

  if (code === 'ECONNABORTED' || message === 'Network Error') {
    _vm.$message.error({ showClose: true, duration: 2000, message: _vm.$t('message.errors.overtime') })
    return
  }

  if (code === 20123) {
    let max_app_numbers = description.replace(/\D/g, "")
    _vm.$message.error( { showClose: true, duration: 2000, message: `${_vm.$t('message.errors.' + code, { count: max_app_numbers })}(${code})` })
  } else {
    _vm.$message.error( { showClose: true, duration: 2000, message: `${_vm.$t('message.errors.' + code)}(${code})` })
  }

  if (!_vm.skipInterceptor && code === 401) {
    setTimeout(() => {
      window.localStorage.clear()
      window.location.href = `https://mixin-www.zeromesh.net/oauth/authorize?client_id=${process.env.VUE_APP_CLIENT_ID}&scope=PROFILE:READ+APPS:READ+APPS:WRITE&response_type=code`
    }, 100)
  }
};

export const defaultApiConfig = {
  requestConfig: { responseCallback }
};