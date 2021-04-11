
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/minesweeper-client-vue/'
    : '/',
  outputDir: 'docs'
}
