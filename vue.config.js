module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/weather-display/' : '/',
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        pathRewrite: { '^/api': '' },
        changeOrigin: true
      }
    }
  }
}
