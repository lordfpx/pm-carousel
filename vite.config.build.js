// vite.config.js
const { resolve } = require('path')

module.exports = {
  build: {
    outDir: "dist",
    lib: {
      entry: resolve(__dirname, './main.js'),
      name: "pm-carousel"
    },
  },
}
