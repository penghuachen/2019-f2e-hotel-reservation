const path = require("path");

function resolve(dir) {
  return path.join(__dirname, "./", dir);
}

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/2019-f2e-hotel-reservation/'
    : '/',
  chainWebpack: (config) => {

    // svgIcon settings
    config.module.rule("svg").exclude.add(resolve("src/assets/icons")).end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/assets/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "[name]",
      })
      .end();
  },
};
