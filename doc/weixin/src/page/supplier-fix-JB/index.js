'use strict';
require('page/common/index.css');
require('page/common/form.css');
require('page/common/dialog.css');
require('page/common/personal-setting.css');
require('page/common/product-tag-write.css');
require('./index.css');

require('page/addition/nav/index.js'); // 点击返回按钮
require('util/dialog.js');
require('util/datePicker.js');
var _tagUtil      = require('util/tagUtil.js');
var _mm           = require('util/common.js');
var _mock         = require('service/mock-service.js');

var page = {
  init: function () {
    this.onLoad();
    this.bindEvent();
  },
  onLoad: function () {
    var _this = this;
    //公司性质
    _tagUtil.bindRadioTag("orgType");
    //公司成立时间
    _mm.initDatePicker("startDate");
    
    //绑定提交事件
    _mm.bindSubmit(_this.validate, _this.save);

    // 2020-03-21 暂时注释, 否则未登录, 跳转登录页
    // this.load();
  },
  bindEvent : function(){
    var _this = this;
  },
  getSectionId : function (){
    return "basic";			
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
            var orgType = dto.result.orgType;
            var orgTypeActive = 0;
            $('[name="orgType"]').each(function(i,elemt){								
              if($(this).attr("data")==orgType){
                $(this).addClass("active");
                orgTypeActive = 1;
              }								
            });
            
            if (orgTypeActive == 0){
              $("#otherOrgType").val(orgType);
            }
            
            var startDate = dto.result.startDate;
            $("#startDate").val(startDate);
            
            var registerMoney = dto.result.registerMoney;
            $("#registerMoney").val(registerMoney);

            var orgCode = dto.result.orgCode;
            $("#orgCode").val(orgCode);

            var managementScope = dto.result.managementScope;
            $("#managementScope").val(managementScope);
            
            var licenseStatus = dto.result.licenseStatus;
            
/*							if(licenseStatus =="1"){
              $("#uploadStatus").html("已上传");
            } else {
              $("#uploadStatus").html("未上传");
            }*/		
          } else {
            //							
          }
        }
      },
    });			
  },

  validate : function(){
    var registerMoney = $("#registerMoney").val();
    if (registerMoney != ""){
      if (!_mm.isNumber(registerMoney)){
        _mm.popUpErrMsg("registerMoney", "注册资本必须输入数字！");
        return false;
      }
    }
    return true;
  },
  //保存数据
  save : function (){
    var _this = this;
    var orgType=_tagUtil.getRadioTagVal("orgType");			
      
    var otherOrgType =$('#otherOrgType').val();
    if (otherOrgType != ""){
      orgType=otherOrgType;
    }
    
    var startDate = $('#startDate').val();
    var registerMoney = $('#registerMoney').val();
    var orgCode = $('#orgCode').val();	
    var managementScope = $('#managementScope').val();
    
    /*var supplierId=localStorage.getItem("supplierId");*/
    var token = _mm.getSupplierToken();
    var url="/WeiXin/weiXinSupplier/saveSection.do";
    var sectionId = _this.getSectionId();
    $.ajax({
      type: "post", // 用POST方式传输
      dataType: "json", // 数据格式:JSON
      url: url, // 目标地址
      data: {
        supplier_token:token,
        sectionId:sectionId,
        orgType: orgType,
        startDate: startDate,
        registerMoney: registerMoney,
        orgCode: orgCode,
        managementScope:managementScope
      },
      success: function(dto) {
        if(dto != null) {
          if(dto.code == 0) {
            var url=getHref();
            _mm.popUpAlert(dto.message,url);
          } else {
            _mm.popUpWarn(dto.message);
          }
        }
      },
    });
  },
  getHref : function (){
    return "supplier-model.html";			
  }	
};

$(function(){
  page.init();
});