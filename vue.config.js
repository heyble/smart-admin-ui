module.exports = {
  devServer: {
    proxy: {
      '/smart': {
        target: 'http://127.0.0.1:3000/',
        changeOrigin: true,
        pathRewrite: {
          '^/smart': ''
        }
      },
      '/login': {
        target: 'http://127.0.0.1:3000/',
        changeOrigin: true,
        pathRewrite: {
          '^/login': '/login'
        }
      },
      '/user': {
        target: 'http://127.0.0.1:3000/',
        changeOrigin: true,
        pathRewrite: {
          '^/user': '/user'
        }
      }
    }
  }
}
