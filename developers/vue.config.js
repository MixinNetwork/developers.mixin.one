const webpack = require('webpack');
const element = require('unplugin-element-plus/webpack')

module.exports = {
  productionSourceMap: false,
  chainWebpack: config => {

    config.resolve.set('fallback', {
      stream: require.resolve('stream-browserify'),
      crypto: require.resolve('crypto-browserify'),
      http: require.resolve('stream-http'),
      https: require.resolve('https-browserify'),
      zlib: require.resolve('browserify-zlib'),
      os: require.resolve('os-browserify/browser'),
      path: require.resolve('path-browserify'),
      buffer: require.resolve('buffer'),
      assert: require.resolve('assert'),
      util: require.resolve('util'),
      fs: false,
      net: false,
      tls: false,
      url: false,
    },)
    config.plugin('buffer').use(new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer']
    }))

    config.plugin('element-plus').use(element({
      useSource: false
    }))

    // For i18n warning
    config.plugin('define').tap((definitions) => {
      Object.assign(definitions[0], {
        __VUE_I18N_FULL_INSTALL__: JSON.stringify(true),
        __INTLIFY_PROD_DEVTOOLS__: JSON.stringify(false),
        __VUE_I18N_LEGACY_API__: JSON.stringify(true),
      })
      return definitions
    })

    config.module
      .rule('md')
      .test(/\.md/)
      .use('html-loader')
      .loader('html-loader')
      .end()
      .use('markdown-loader')
      .loader('markdown-loader')
      .end()
  }
}
