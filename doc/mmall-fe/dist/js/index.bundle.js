webpackJsonp([1],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(2);


/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	/*
	 * @Author: SherryWong 
	 * @Date: 2019-09-17 18:50:18 
	 * @Last Modified by: SherryWong
	 * @Last Modified time: 2019-09-18 12:20:08
	 */

	// 测试公共模块
	__webpack_require__(3);
	__webpack_require__(4);

	cats = __webpack_require__(9);
	console.log(cats);


/***/ }),
/* 3 */,
/* 4 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */
/***/ (function(module, exports) {

	var cats = ['dave', 'henry', 'martha'];
	module.exports = cats;

/***/ })
]);