'use strict';
require('node_modules/font-awesome/css/font-awesome.css');
require('page/common/index.css');
require('./index.css');
require('page/addition/nav/index.js');

var _mm           = require('util/common.js');
var _mock         = require('service/mock-service.js');

var page = {
	init: function(){
    this.onLoad();
    this.bindEvent();
	},
	onLoad : function(){
    var _this = this;
  },
  bindEvent : function(){

		$("#simpleTitle").click(function(){
			_mm.goUrl("supplier-register.html");
		});
		
		$("#simpleDoc").click(function(){
			_mm.goUrl("supplier-register.html");
		});		
	
		$("#QkTitle").click(function(){
			_mm.goUrl("supplier-register-simple.html");
		});
		
		$("#QkDoc").click(function(){
			_mm.goUrl("supplier-register-simple.html");
		});
	
		$("#goLogin").click(function(){
			_mm.goUrl("login.html");
		});

  }
};

$(function(){
  page.init();
});