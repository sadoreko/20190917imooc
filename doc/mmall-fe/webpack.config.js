/*
 * @Author: SherryWong 
 * @Date: 2019-09-17 18:50:13 
 * @Last Modified by: SherryWong
 * @Last Modified time: 2019-09-19 09:25:29
 */
// 初始版本
// module.exports = {
//   entry: './src/page/index/index.js',
//   output: {
//     path: './dist',  // 相对路径容易出问题, 使用绝对路径
//     filename: 'index.bundle.js'
//   }
// }

// 使用绝对路径
// var path = require('path');
// var config = {
//   mode: 'development',
//   entry: './src/page/index/index.js',
//   output: {
//     path: path.resolve(__dirname, 'dist'),
//     filename: 'index.bundle.js'
//   }
// };
// module.exports = config;

// 多入口
// 把entry改为对象形式, output的filename改为: 根据entry的文件名自动填充
// var path = require('path');
// var config = {
//   mode: 'development',
//   entry: {
//     index: './src/page/index/index.js',
//     test: './src/page/index/测试多入口的webpack.js'
//   },
//   output: {
//     path: path.resolve(__dirname, 'dist'),
//     filename: '[name].bundle.js'
//   }
// };
// module.exports = config;

// 使用jquery
// var path = require('path');
// var config = {
//   mode: 'development',
//   entry: {
//     index: './src/page/index/index.js',
//     test: './src/page/index/测试多入口的webpack.js',
//     jquery: './src/page/index/引入jquery.js',
//   },
//   output: {
//     path: path.resolve(__dirname, 'dist'),
//     filename: '[name].bundle.js'
//   },
//   externals: {
//     'jquery': 'window.jQuery'
//   }
// };
// module.exports = config;

// // CommonsChunkPlugin提取公共模块
// var path = require('path');
// var webpack = require('webpack');
// var options = {
//   name : 'commons',
//   filename : 'js/base.js' 
// };
// var config = {
//   mode: 'development',
//   entry: {
//     index: './src/page/index/index.js',
//     test: './src/page/index/测试多入口的webpack.js',
//     jquery: './src/page/index/引入jquery.js',
//   },
//   output: {
//     path: path.resolve(__dirname, 'dist'),
//     filename: 'js/[name].bundle.js'
//   },
//   externals: {
//     'jquery': 'window.jQuery'
//   },
//   plugins: [
//     new webpack.optimize.CommonsChunkPlugin(options)
//   ]
// };
// module.exports = config;

// CommonsChunkPlugin提取公共模块 第二种方法
// base.js 里会出现 ./src/page/common/index.js 里的内容
// var path = require('path');
// var webpack = require('webpack');
// var options = {
//   name : 'commonModule',
//   filename : 'js/base.js' 
// };
// var config = {
//   mode: 'development',
//   entry: {
//     'index': ['./src/page/index/index.js'],
//     'test': ['./src/page/index/测试多入口的webpack.js'],
//     'jquery': ['./src/page/index/引入jquery.js'],
//     'commonModule': ['./src/page/common/index.js']
//   },
//   output: {
//     path: path.resolve(__dirname, 'dist'),
//     filename: 'js/[name].bundle.js'
//   },
//   externals: {
//     'jquery': 'window.jQuery'
//   },
//   plugins: [
//     new webpack.optimize.CommonsChunkPlugin(options)
//   ]
// };
// module.exports = config;

// 处理样式文件
// var path = require('path');
// var webpack = require('webpack');
// var options = {
//   name : 'commonModule',
//   filename : 'js/base.js' 
// };
// var config = {
//   mode: 'development',
//   entry: {
//     'index': ['./src/page/index/index.js'],
//     'test': ['./src/page/index/测试多入口的webpack.js'],
//     'jquery': ['./src/page/index/引入jquery.js'],
//     'commonModule': ['./src/page/common/index.js']
//   },
//   output: {
//     path: path.resolve(__dirname, 'dist'),
//     filename: 'js/[name].bundle.js'
//   },
//   externals: {
//     'jquery': 'window.jQuery'
//   },
//   module: {
//     loaders: [
//       { test: /\.css$/, loader: 'style-loader!css-loader' }
//     ]
//   },
//   plugins: [
//     new webpack.optimize.CommonsChunkPlugin(options)
//   ]
// };
// module.exports = config;


// 用extract-text-webpack-plugin打包css文件
// var path = require('path');
// var webpack = require('webpack');
// var ExtractTextPlugin = require('extract-text-webpack-plugin');

// var config = {
//   mode: 'development',
//   entry: {
//     'index': ['./src/page/index/index.js'],
//     'test': ['./src/page/index/测试多入口的webpack.js'],
//     'jquery': ['./src/page/index/引入jquery.js'],
//     'common': ['./src/page/common/commonindex.js'],
//   },
//   output: {
//     path: path.resolve(__dirname, 'dist'),
//     filename: 'js/[name].bundle.js'
//   },
//   externals: {
//     'jquery': 'window.jQuery'
//   },
//   module: {
//     loaders: [
//       { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader','css-loader') }
//     ]
//   },
//   plugins: [
//     new webpack.optimize.CommonsChunkPlugin({
//       name : 'common',
//       filename : 'js/base.js' 
//     }),
//     new ExtractTextPlugin("css/[name].css")
//   ]
// };
// module.exports = config;

// ---------------------------------------------------------------

// 用extract-text-webpack-plugin打包css文件
// 老师的写法
// var webpack             = require('webpack');
// var ExtractTextPlugin   = require('extract-text-webpack-plugin');

// var config = {
//   entry: {
//     'index': ['./src/page/index/index.js'],
//   },
//   output: {
//       path        : __dirname + '/dist/',
//       filename    : 'js/[name].js'
//   },
//   externals : {
//       'jquery' : 'window.jQuery'
//   },
//   module: {
//       loaders: [
//           { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader","css-loader") },
//       ]
//   },
//   plugins: [
//       // 独立通用模块到js/base.js
//       new webpack.optimize.CommonsChunkPlugin({
//           name : 'common',
//           filename : 'js/base.js'
//       }),
//       // 把css单独打包到文件里
//       new ExtractTextPlugin("css/[name].css"),
//   ]
// };
// module.exports = config;

// ---------------------------------------------------------------
// 使用html-webpack-plugin处理html文件
// var path = require('path');
// var webpack = require('webpack');
// var ExtractTextPlugin = require('extract-text-webpack-plugin');
// var HtmlWebpackPlugin = require('html-webpack-plugin');

// var config = {
//   mode: 'development',
//   entry: {
//     'index': ['./src/page/index/index.js'],
//     'test': ['./src/page/index/测试多入口的webpack.js'],
//     'jquery': ['./src/page/index/引入jquery.js'],
//     'common': ['./src/page/common/commonindex.js'],
//   },
//   output: {
//     path: path.resolve(__dirname, 'dist'),
//     filename: 'js/[name].bundle.js'
//   },
//   externals: {
//     'jquery': 'window.jQuery'
//   },
//   module: {
//     loaders: [
//       { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader','css-loader') }
//     ]
//   },
//   plugins: [
//     // 独立通用模块到js/base.js
//     new webpack.optimize.CommonsChunkPlugin({
//       name : 'common',
//       filename : 'js/base.js' 
//     }),
//     // 把css单独打包到文件里
//     new ExtractTextPlugin("css/[name].css"),
//     // 处理html模版
//     new HtmlWebpackPlugin({
//       template : './src/view/index.html',
//       filename : 'view/index.html',
//       inject   : true,
//       hash     : true,
//       chunks   : ['common', 'index']
//     })
//   ]
// };
// module.exports = config;

// ---------------------------------------------------------------

// 把添加html模版的参数提取成函数
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

// 获取html-webpack-plugin参数的方法 
var getHtmlConfig = function(name, title){
  return {
      template    : './src/view/' + name + '.html',
      filename    : 'view/' + name + '.html',
      // favicon     : './favicon.ico',  // 因为我没有./favicon.ico, 所以这句先注释掉, 不然报错 could not load file /Users/sherrywong/Documents/GitHub/20190917imooc/doc/mmall-fe/favicon.ico
      title       : title,
      inject      : true,
      hash        : true,
      chunks      : ['common', name]
  };
};
var config = {
  mode: 'development',
  entry: {
    'index': ['./src/page/index/index.js'],
    'test': ['./src/page/index/测试多入口的webpack.js'],
    'jquery': ['./src/page/index/引入jquery.js'],
    'common': ['./src/page/common/commonindex.js'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].bundle.js'
  },
  externals: {
    'jquery': 'window.jQuery'
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader','css-loader') }
    ]
  },
  plugins: [
    // 独立通用模块到js/base.js
    new webpack.optimize.CommonsChunkPlugin({
      name : 'common',
      filename : 'js/base.js' 
    }),
    // 把css单独打包到文件里
    new ExtractTextPlugin("css/[name].css"),
    // 处理html模版
    new HtmlWebpackPlugin(getHtmlConfig('index', '首页')),
  ]
};
module.exports = config;