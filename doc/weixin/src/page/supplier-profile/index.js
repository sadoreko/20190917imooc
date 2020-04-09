'use strict';
require('page/common/index.css');
require('page/common/personal.css');
require('page/common/nav.css');
require('./index.css');
require('util/jquery.waypoints.min.js');
require('util/jquery.countup.min.js');

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
		var _this = this;
		$("#scoreTotal").html("65");
		// $("#scoreTotal").countUp();
		$('.bgPop,#pop').show();
		$('.pop-close').click(function() {
			$('.bgPop,#pop').hide();
		});
	},
	getProfile : function(){
		var data = _mm.supplierProfileData();
		var url = "/WeiXin/weiXinSupplier/getProfile.do";
		$.ajax({
			type: "post", // 用POST方式传输
			dataType: "json", // 数据格式:JSON
			url: url, // 目标地址
			data:data,
			success: function(dto) {
				if(dto != null) {
					if(dto.code == 0) {

						//localStorage.setItem("supplierId", dto.result.orgInfo.supplierId);

						var scoreTotal = dto.result.orgInfo.score;
						var licenseAduitStatus = dto.result.orgInfo.licenseAduit;
						var scorePage = dto.result.orgInfo.score;
						var orgNameZh = dto.result.orgInfo.orgNameZh;
						
						var licenseAduit = ""; 
						
						if (licenseAduitStatus == "0"){
							licenseAduit ="未认证";
						}
						
						$("#orgNameZh").html(orgNameZh);
						$("#scorePage").html(scorePage);
						$("#licenseAduit").html(licenseAduit);
						
						$("#scoreTotal").html(scoreTotal);
						$("#scoreTotal").countUp();
					} else {
						
					}
				}
			},
		});
	}
};

$(function(){
  page.init();
});
