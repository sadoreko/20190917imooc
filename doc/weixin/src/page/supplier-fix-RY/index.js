'use strict';
require('page/common/index.css');
require('page/common/form.css');
require('page/common/dialog.css');
require('./index.css');

require('page/addition/nav/index.js'); // 点击返回按钮
require('util/dialog.js');

var _mm           = require('util/common.js');
var _mock         = require('service/mock-service.js');

var page = {
  init: function () {
    this.onLoad();
    this.bindEvent();
  },
  onLoad: function () {
    // 2020-03-21 暂时注释, 否则未登录, 跳转登录页
    // this.load();
  },
  bindEvent : function(){
		var _this = this;
		$("#btnSubmit").click(function(){
      if (_this.validate()){
        _this.save();
      }
    });
	},
	getSectionId : function (){
    return "emp";			
  },
  
  getHref : function (){
    return "supplier-model.html";			
  },
	
	//初始化画面数据
	load : function (){
		var _this = this;
    var token = _mm.getSupplierToken();
    var url = "/WeiXin/weiXinSupplier/getSection.do";
    var sectionId = _this.getSectionId();
		$.ajax({
			type: "post", // 用POST方式传输
			dataType: "json", // 数据格式:JSON
			url: url, // 目标地址
			data: {
				supplier_token: token
				,sectionId:sectionId
			},
			success: function(dto) {
				if(dto != null) {
					if(dto.code == 0) {
						var onEmpVolume = dto.result.onEmpVolume;
						$("#onEmpVolume").val(onEmpVolume);
						
						var mngEmpVolume = dto.result.mngEmpVolume;
						$("#mngEmpVolume").val(mngEmpVolume);
						
						var technicalStaffVolume = dto.result.technicalStaffVolume;
						$("#technicalStaffVolume").val(technicalStaffVolume);
						
						var qualityStaffVolume = dto.result.qualityStaffVolume;
						$("#qualityStaffVolume").val(qualityStaffVolume);							
					} else {
						$("#onEmpVolume").val(0);
						
						$("#mngEmpVolume").val(0);
						
						$("#technicalStaffVolume").val(0);
						
						$("#qualityStaffVolume").val(0);							
					}
				}
			},
		});			
	},
	
	validate : function (){
		var onEmpVolume = $("#onEmpVolume").val();
		if (onEmpVolume != ""){
			if (!_mm.isInteger(onEmpVolume)){
				_mm.popUpErrMsg("onEmpVolume", "员工总数必须输入整数！");
				return false;					
			}
		}
		
		var mngEmpVolume = $("#mngEmpVolume").val();
		if (mngEmpVolume != ""){
			if (!_mm.isInteger(mngEmpVolume)){
				_mm.popUpErrMsg("mngEmpVolume", "管理人员总数必须输入整数！");
				return false;					
			}
		}
		
		var technicalStaffVolume = $("#technicalStaffVolume").val();
		if (technicalStaffVolume != ""){
			if (!_mm.isInteger(technicalStaffVolume)){
				_mm.popUpErrMsg("technicalStaffVolume", "技术人员总数必须输入整数！");
				return false;					
			}
		}
		
		var qualityStaffVolume = $("#qualityStaffVolume").val();
		if (qualityStaffVolume != ""){
			if (!_mm.isInteger(qualityStaffVolume)){
				_mm.popUpErrMsg("qualityStaffVolume", "专职质量人员总数必须输入整数！");
				return false;					
			}
		}			
		
		return true;
	},
	
	//保存数据
	save : function (){
		var _this = this;
		//var supplierId=localStorage.getItem("supplierId");
		var token = _mm.getSupplierToken();
		var onEmpVolume = $('#onEmpVolume').val();
		var mngEmpVolume = $('#mngEmpVolume').val();
		var technicalStaffVolume = $('#technicalStaffVolume').val();
		var qualityStaffVolume = $('#qualityStaffVolume').val();
		
		var url="/WeiXin/weiXinSupplier/saveSection.do";
		var sectionId = _this.getSectionId();
		$.ajax({
			type: "post", // 用POST方式传输
			dataType: "json", // 数据格式:JSON
			url: url, // 目标地址
			data: {
				supplier_token:token,
				sectionId:sectionId,
				onEmpVolume: onEmpVolume,
				mngEmpVolume: mngEmpVolume,
				technicalStaffVolume: technicalStaffVolume,
				qualityStaffVolume: qualityStaffVolume
			},
			success: function(dto) {
				if(dto != null) {
					if(dto.code == 0) {
						var url=_this.getHref();
						_mm.popUpAlert(dto.message,url);
					} else {
						_mm.popUpWarn(dto.message);
					}
				}
			},
		});
	}

};

$(function(){
  page.init();
});

 
	