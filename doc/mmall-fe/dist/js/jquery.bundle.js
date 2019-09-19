webpackJsonp([2],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(10);


/***/ }),

/***/ 10:
/***/ (function(module, exports, __webpack_require__) {

	/*
	 * @Author: SherryWong 
	 * @Date: 2019-09-18 11:12:35 
	 * @Last Modified by: SherryWong
	 * @Last Modified time: 2019-09-19 11:29:07
	 */

	'use strict';

	// // 方法1
	// // $ npm install jquery --save
	// // 缺点是每个用到jquery的js文件都要写require('jquery')
	// // 有的jquery插件依赖的是全局的jquery对象, 上面这种以变量形式加载的jquery是无法放在插件里使用的
	// // 使用:
	// var $ = require('jquery');
	// $('body').html('用npm安装jquery');

	// 方法2
	// 在html文件里用<script src="">引入jquery

	// 方法3
	// <script src="jquery的本地地址或CDN地址"></script>
	// webpack.config.js里加上上面的externals
	// output: {
	//   path: path.resolve(__dirname, 'dist'),
	//   filename: '[name].bundle.js'
	// },
	// externals: {
	//   'jquery': 'window.jQuery'
	// }

	var $$ = __webpack_require__(11);
	$$('body').html('用模块形式使用jquery');



/***/ }),

/***/ 11:
/***/ (function(module, exports) {

	module.exports = window.jQuery;

/***/ })

});