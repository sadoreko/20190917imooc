/*
 * @Author: SherryWong 
 * @Date: 2019-09-17 18:50:18 
 * @Last Modified by: SherryWong
 * @Last Modified time: 2019-09-18 12:20:08
 */

// 测试公共模块
require('../CommonsChunkPlugin提取公共模块.js');
require('./index.css');

cats = require('./cats.js');
console.log(cats);
