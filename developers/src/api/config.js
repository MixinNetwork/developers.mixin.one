import axios from 'axios'

let instance = axios.create({
  baseURL: 'https://api.mixin.one/',
  timeout: 10 * 1000,
})

instance.interceptors.request.use(config => {
  !config.headers.Authorization && (config.headers.Authorization = 'Bearer ' + window.localStorage.getItem("token"))
  return config
})

instance.interceptors.response.use((res) => {
  let { data } = res
  if (data.error && data.error.description) {
    if (data.error.code === 20123) {
      let { description } = data.error
      let max_app_numbers = description.replace(/\D/g, "")
      _vm.$message.error(`${_vm.$t('message.errors.' + data.error.code, { count: max_app_numbers })}(${data.error.code})`, { showClose: true, duration: 2000 })
    } else {
      _vm.$message.error(`${_vm.$t('message.errors.' + data.error.code)}(${data.error.code})`, { showClose: true, duration: 2000 })
    }
    if (_vm._not_through_interceptor) return false
    if (Number(data.error.code) === 401) {
      setTimeout(() => {
        window.localStorage.clear()
        window.location.href = `https://mixin-www.zeromesh.net/oauth/authorize?client_id=${process.env.VUE_APP_CLIENT_ID}&scope=PROFILE:READ+APPS:READ+APPS:WRITE&response_type=code&redirect_uri=https://developers.mixin.one/auth`
      }, 100)
    }
    return
  }
  return data.data
}, err => {
  const { config, code, message } = err
  if (code === 'ECONNABORTED' || message === 'Network Error') {
    _vm.$message.error(_vm.$t('message.errors.overtime'), { showClose: true, duration: 2000 })
  }
  return retry(config)
})


function backOff() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, 2000)
  })
}

async function retry(config) {
  await backOff()
  return instance(config)
}

export default instance

