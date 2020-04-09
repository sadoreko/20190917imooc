/* <link type="text/css" rel="stylesheet" href="css/common.css" >
<link type="text/css" rel="stylesheet" href="css/nav.css" >
<link type="text/css" rel="stylesheet" href="css/find.css" >
<link type="text/css" rel="stylesheet" href="css/pro_detail.css" >
<link type="text/css" rel="stylesheet" href="css/pro_infor.css" >
<link type="text/css" rel="stylesheet" href="css/tab.css" ></link> */

'use strict';
require('page/common/index.css');
require('page/common/nav.css');
require('page/common/pro_infor.css');
require('./index.css');

var _mm           = require('util/common.js');
var _mock         = require('service/mock-service.js');

var page = {
  init: function () {
    this.onLoad();
    this.bindEvent();
  },
  onLoad: function () {
		// 基本信息获取 2020-03-19 暂时注释, 否则未登录, 跳转登录页
		// this.getProfile();
  },
  bindEvent : function(){

  }
};

$(function(){
  page.init();
})