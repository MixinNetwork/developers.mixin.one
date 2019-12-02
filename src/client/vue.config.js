module.exports = {
    // outputDir: "/dist/dashboard",
    // publicPath: '/dashboard/',
    productionSourceMap: false,
    configureWebpack: {
        externals: {
            'vue': 'Vue',
            'vue-router': 'VueRouter',
            'axios': 'axios',
            'moment': 'moment',
            'axios': 'axios',
            'crypto': 'crypto',
            'node-forge': 'forge'
            
        }
    }
}