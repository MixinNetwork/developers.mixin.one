module.exports = {
    outputDir: "dashboard",
    publicPath: '/dashboard/',
    productionSourceMap: false,
    configureWebpack: {
        externals: {
            'vue': 'Vue',
            'vue-router': 'VueRouter',
            'axios': 'axios',
            'moment': 'moment',
            'node-forge': 'forge',
            'vuex': 'Vuex',
            'vue-i18n': 'VueI18n'
        }
    }
}