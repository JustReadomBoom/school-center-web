'use strict'
// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
    build: {
        env: require('./dev.env'),
        index: path.resolve(__dirname, '../dist/index.html'),
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: './',
        productionSourceMap: true,
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],
        bundleAnalyzerReport: process.env.npm_config_report
    },
    dev: {
        assetsSubDirectory: 'static',
        assetsPublicPath: './',
        proxyTable: {
            "/": {
                // 你接口的域名
                target: "http://localhost:8521",
                // target: "https://www.zhouqz.top/blog",
                // 接口跨域时添加
                changeOrigin: true,
                // 要重写api地址时添加 因为有时候可能是部分接口代理跨域，需要一个能被匹配到的前缀，但是接口并不需要这个前缀，所以需要重写
                pathRewrite: {
                    "^/": "/"                          //用/代替http://test.boil.msxiaodai.com
                }
            }
        },
        host: 'localhost',                      //主机
        port: 8080,                             //端口
        autoOpenBrowser: false,                 //编译结束以后自动开启浏览器
        errorOverlay: true,                     //是否查询错误
        notifyOnErrors: true,                   //是否通知错误
        poll: false,
        devtool: 'cheap-module-eval-source-map', //当js抛出异常时，显示报错的是第几行
        cacheBusting: true,                     //是否缓存破坏
        cssSourceMap: true
    }
}
