/*
* @Author: Rosen
* @Date:   2017-05-08 15:28:19
 * @Last Modified by: SherryWong
 * @Last Modified time: 2020-03-21 15:58:04
*/
var webpack             = require('webpack');
var ExtractTextPlugin   = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin   = require('html-webpack-plugin');

// 环境变量配置，dev / online
var WEBPACK_ENV         = process.env.WEBPACK_ENV || 'dev';

// 获取html-webpack-plugin参数的方法 
var getHtmlConfig = function(name, title){
    return {
        template    : './src/view/' + name + '.html',
        filename    : 'view/' + name + '.html',
        // favicon     : './favicon.ico',
        title       : title,
        inject      : true,
        hash        : true,
        chunks      : ['common', name]
    };
};
// webpack config
var config = {
    entry: {
        'common'            : ['./src/page/common/index.js'],
        'index'             : ['./src/page/index/index.js'],
        'login'             : ['./src/page/login/index.js'],
        'article'           : ['./src/page/article/index.js'],
        'newsMore'          : ['./src/page/newsMore/index.js'],
        'msgList'           : ['./src/page/msgList/index.js'],
        'region'            : ['./src/page/region/index.js'],
        'agreeEn'           : ['./src/page/agreeEn/index.js'],
        'agreeZh'           : ['./src/page/agreeZh/index.js'],
        'newsTab'           : ['./src/page/newsTab/index.js'],
        'switch-register'            : ['./src/page/switch-register/index.js'],
        'supplier-register-simple'   : ['./src/page/supplier-register-simple/index.js'],
        'supplier-register'          : ['./src/page/supplier-register/index.js'],
        'buyer-register'             : ['./src/page/buyer-register/index.js'],
        'buyer-profile'              : ['./src/page/buyer-profile/index.js'],
        'msgDetail'                  : ['./src/page/msgDetail/index.js'],
        'searchPage'                 : ['./src/page/searchPage/index.js'],
        'supplier-set'               : ['./src/page/supplier-set/index.js'], // 原supplier-info
        'supplier-profile'           : ['./src/page/supplier-profile/index.js'],
        'find'                       : ['./src/page/find/index.js'],
        'supplier-model'             : ['./src/page/supplier-model/index.js'],
        'supplier-fix-GH'            : ['./src/page/supplier-fix-GH/index.js'],
        'supplier-fix-JB'            : ['./src/page/supplier-fix-JB/index.js'],
        'supplier-fix-JY'            : ['./src/page/supplier-fix-JY/index.js'],
        'supplier-fix-PL'            : ['./src/page/supplier-fix-PL/index.js'],
        'supplier-fix-RY'            : ['./src/page/supplier-fix-RY/index.js'],
        'supplier-fix-ZN'            : ['./src/page/supplier-fix-ZN/index.js'],
    },
    output: {
        path        : __dirname + '/dist/',
        publicPath  : 'dev' === WEBPACK_ENV ? '/dist/' : '//s.wujigemama.com/weixin/dist/',
        filename    : 'js/[name].js'
    },
    externals : {
        'jquery' : 'window.jQuery'
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader","css-loader") },
            { test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=images/[name].[ext]' },
            {
                test: /\.string$/, 
                loader: 'html-loader',
                query : {
                    minimize : true,
                    removeAttributeQuotes : false
                }
            }
        ]
    },
    resolve : {
        alias : {
            node_modules    : __dirname + '/node_modules',
            util            : __dirname + '/src/util',
            page            : __dirname + '/src/page',
            service         : __dirname + '/src/service',
            images          : __dirname + '/src/images',
            mock            : __dirname + '/src/mock'
        }
    },
    plugins: [
        // 独立通用模块到js/base.js
        new webpack.optimize.CommonsChunkPlugin({
            name : 'common',
            filename : 'js/base.js'
        }),
        // 把css单独打包到文件里
        new ExtractTextPlugin("css/[name].css"),
        // html模板的处理
        new HtmlWebpackPlugin(getHtmlConfig('index', '首页')),
        new HtmlWebpackPlugin(getHtmlConfig('login', '登录')),
        new HtmlWebpackPlugin(getHtmlConfig('article', '文章详情')),
        new HtmlWebpackPlugin(getHtmlConfig('switch-register', '供应商注册')),
        new HtmlWebpackPlugin(getHtmlConfig('supplier-register-simple', '供应商注册(快捷注册)')),
        new HtmlWebpackPlugin(getHtmlConfig('supplier-register', '供应商注册(人工注册)')),
        new HtmlWebpackPlugin(getHtmlConfig('newsMore', '更多')),
        new HtmlWebpackPlugin(getHtmlConfig('msgList', '消息中心')),
        new HtmlWebpackPlugin(getHtmlConfig('region', 'Regional Settings/国家选定')),
        new HtmlWebpackPlugin(getHtmlConfig('buyer-register', 'Buyer register')),
        new HtmlWebpackPlugin(getHtmlConfig('buyer-profile', 'Personal Center')),
        new HtmlWebpackPlugin(getHtmlConfig('agreeZh', '注册协议')),
        new HtmlWebpackPlugin(getHtmlConfig('agreeEn', 'Registration Agreement')),
        new HtmlWebpackPlugin(getHtmlConfig('msgDetail', '消息详情')),
        new HtmlWebpackPlugin(getHtmlConfig('newsTab', '行业资讯')),
        new HtmlWebpackPlugin(getHtmlConfig('searchPage', '检索')),
        new HtmlWebpackPlugin(getHtmlConfig('supplier-set', '基本设置')),
        new HtmlWebpackPlugin(getHtmlConfig('supplier-profile', '企业中心(供应商)')),
        new HtmlWebpackPlugin(getHtmlConfig('find', '发现')),
        new HtmlWebpackPlugin(getHtmlConfig('supplier-model', '评估报告')),
        new HtmlWebpackPlugin(getHtmlConfig('supplier-fix-GH', '供货能力')),
        new HtmlWebpackPlugin(getHtmlConfig('supplier-fix-JB', '基本信息')),
        new HtmlWebpackPlugin(getHtmlConfig('supplier-fix-JY', '外贸经验')),
        new HtmlWebpackPlugin(getHtmlConfig('supplier-fix-PL', '生产场所')),
        new HtmlWebpackPlugin(getHtmlConfig('supplier-fix-RY', '人员状况')),
        new HtmlWebpackPlugin(getHtmlConfig('supplier-fix-ZN', '质量认证')),
        
    ],
    devServer: {
        port: 8099,
        inline: true,
        proxy : {
            '/supplier/' : {
                target: 'http://47.244.40.217:8080/mall-api',
                changeOrigin : true
            },
            '/WeiXin/' : {
                target: 'http://wx.gqdsc.com.cn/exhibition',
                changeOrigin : true
            },
        }
    }

};


module.exports = config;