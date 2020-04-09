'use strict';
require('page/common/index.css');
require('page/common/popup.css');
require('./index.css');

var _mm           = require('util/common.js');
var _mock         = require('service/mock-service.js');

var page = {
  init: function () {
    this.onLoad();
    this.bindEvent();
  },
  onLoad: function () {
    // load 目前只能注释掉, 否则会返回未登录状态, 跳转到登录页
    // this.load();
  },
  bindEvent : function(){
    var _this = this;
    $('#logoutBtn').click(function(){
      _this.logout();
    });
  },
  logout : function() {
		var body = document.getElementsByTagName("body")[0];
		var prompt = document.getElementsByClassName("prompt_popup")[0];//弹窗外部
		var popup = document.getElementsByClassName("popup");//弹窗内部
		var cancel = document.getElementsByClassName("cancel")[0];
    var sure = document.getElementsByClassName("sure")[0];
    
		popup.className = 'popup popup_show';
		body.setAttribute("class","body_overhid");	
		setTimeout(function(){
			prompt.className = 'prompt_popup prompt_popup_setTimeout';
		},10);
		//取消
		cancel.onclick = function() {						
			prompt.className = 'prompt_popup prompt_popup_hid';
			body.setAttribute("class","body_overauto");	
		};
		//确定
		sure.onclick = function() {
			prompt.className = 'prompt_popup prompt_popup_hid';
      body.setAttribute("class","body_overauto");
      _mock.userlogout(function(res){
        console.log('退出成功, 跳转哪个网页');
        
      }, function(errMsg){
        console.log(errMsg);
      });
		};

  },
  load : function(){
		var data = _mm.supplierProfileData();
		var url="/WeiXin/weiXinSupplier/getOrgInfo.do";
		$.ajax({
			type: "post", // 用POST方式传输
			dataType: "json", // 数据格式:JSON
			url: url, // 目标地址
			data:data,
			success: function(dto) {
				if(dto != null) {
					if(dto.code == 0) {
						$("#orgNameZh").html(dto.result.orgNameZh); 
						$("#corporation").html(dto.result.corporation);
						$("#registerTime").html(dto.result.registerTime);
					} else {

					}
				}
			},
		});			
	}
};

$(function(){
  page.init();
})
