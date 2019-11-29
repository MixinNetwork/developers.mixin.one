import axios from 'axios'

let instance = axios.create({
    baseURL: 'https://api.mixin.one/',
    timeout: 10 * 1000,
})

instance.interceptors.request.use(config => {
    !config.headers.Authorization && (config.headers.Authorization = window.localStorage.getItem("token"))
    return config;
})

instance.interceptors.response.use(({ data }) => {
    if (data.error && data.error.description) {
        _vm.$message.error(`${data.error.description}(${data.error.code})`)
        if (Number(data.error.code) === 401) {
            setTimeout(() => {
                window.localStorage.clear()
                window.location.href = window.location.origin
            }, 100)
        }
        return;
    }
    return data.data
})

export default instance;

