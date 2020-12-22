const CompressionWebpackPlugin = require('compression-webpack-plugin')
module.exports = {
  productionSourceMap: false,
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      return {
        plugins: [
          new CompressionWebpackPlugin({
            algorithm: 'gzip',
            test: /\.(js|css|svg|png|ttf|woff|woff2|jpg)$/,
            threshold: 2048
          })
        ]
      }
    }
  },
  chainWebpack: config => {
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
