export default {
  get(key) {
    let value = window.localStorage.getItem(key)
    try {
      return JSON.parse(value)
    } catch (e) {
      return value
    }
  },
  set(key, value) {
    if (typeof value === 'object') value = JSON.stringify(value)
    return window.localStorage.setItem(key, value)
  },
  rm(key) {
    return window.localStorage.removeItem(key)
  }
}
