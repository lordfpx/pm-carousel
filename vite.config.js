// vite.config.js
const { resolve } = require('path')

module.exports = {
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        doc: resolve(__dirname, 'doc/index.html')
      }
    }
  }
}
