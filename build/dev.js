const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const proxyMiddleware = require('http-proxy-middleware');
const config = require('../config');
const webpackMerge = require('./conf.dev');
const baseWebpack = require('./webpack.config');


var port = require('../config/config').port;

var app = express();

var compiler = webpack(webpackMerge);

var devMiddleware = webpackDevMiddleware(compiler, {
  publicPath: baseWebpack.output.publicPath,
  stats: {
    colors: true,
    chunks: false
  }
});
var hotMiddleware = webpackHotMiddleware(compiler);
// compiler.plugin('compilation', function(compilation){
// 	compilation.plugin('html-webpack-plugin-after-emit', function(data, cb){
// 		hotMiddleware.publish({action: 'reload'});
// 		cb();
// 	});
// });
// proxy api requests
var proxyTable = config.dev.proxyTable;
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(context, options))
});
app.use(require('connect-history-api-fallback')());
app.use(devMiddleware);
app.use(hotMiddleware);

var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)

app.use(staticPath, express.static('./static'));

module.exports = app.listen(port, function (err) {
  console.log('---------------------------------------------------------------');
  if (err) {
    console.log(err);
    return
  }
  console.log('listening at http://localhost:' + port + '\n');
});