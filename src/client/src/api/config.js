import axios from 'axios'

let instance = axios.create({
    baseURL: 'https://api.mixin.one/',
    timeout: 10 * 1000,
})

instance.interceptors.request.use(config => {
    !config.headers.Authorization && (config.headers.Authorization = window.localStorage.getItem("token"))
    return config;
})

instance.interceptors.response.use((res) => {
    let data = res.data
    if (data.error && data.error.description) {
        _vm.$message.error(`${_vm.$t('message.errors.' + data.error.code)}(${data.error.code})`)
        if (_vm._not_through_interceptor) return false
        if (Number(data.error.code) === 401) {
            setTimeout(() => {
                window.localStorage.clear()
                window.location.href = 'https://mixin.one/oauth/authorize?client_id=fbd26bc6-3d04-4964-a7fe-a540432b16e2&scope=PROFILE:READ+APPS:READ+APPS:WRITE&response_type=code&redirect_uri=https://developers.mixin.one/auth'
            }, 100)
        }
        return;
    }
    return data.data

}, err => {
    const { config, code, message } = err
    if (code === 'ECONNABORTED' || message === 'Network Error') {
        _vm.$message.error(_vm.$t('message.errors.overtime'))
    }
    return Promise.reject(err)
})

export default instance;

