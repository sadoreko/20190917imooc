'use strict';
require('page/common/index.css');
require('page/common/form.css');
require('page/common/dialog.css');
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
    //厂房持有
    _tagUtil.bindRadioTag("worksiteType");

    //租期开始时间
    _mm.initDatePicker("tenancyStart");
    //租期结束时间
    _mm.initDatePicker("tenancyEnd");
  },

  getSectionId : function (){
    return "place";			
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
            
            var worksiteType = dto.result.worksiteType;
/*							$(":radio[name='worksiteType']").each(function(){
              if($(this).val()==worksiteType){
                $(this).attr("checked","checked");
              }
            });*/
            
            $('[name="worksiteType"]').each(function(i,elemt){								
              if($(this).attr("data")==worksiteType){
                $(this).addClass("active");
              }								
            });								
            
            var tenancyStart = dto.result.tenancyStart;
            $("#tenancyStart").val(tenancyStart);	
            
            var tenancyEnd = dto.result.tenancyEnd;
            $("#tenancyEnd").val(tenancyEnd);
            
            var worksiteArea = dto.result.worksiteArea;
            $("#worksiteArea").val(worksiteArea);
            
            var workshopArea = dto.result.workshopArea;
            $("#workshopArea").val(workshopArea);
            
            var finishedgoodsArea = dto.result.finishedgoodsArea;
            $("#finishedgoodsArea").val(finishedgoodsArea);
            
            var inspectArea = dto.result.inspectArea;
            $("#inspectArea").val(inspectArea);							
                        
          } else {
                        
          }
        }
      },
    });			
  },
  
  validate : function (){
    var worksiteType = "";
/*			$(':radio[name="worksiteType"]:checked').each(function() {
      worksiteType = $(this).val();
    });*/
    
    $('[name="worksiteType"]').each(function(i,elemt){								
      if ($(this).hasClass("active")){
        worksiteType= $(this).attr("data");
      }								
    });				
    
    if (worksiteType=="租用"){
      var tenancyStart = $("#tenancyStart").val();
      var tenancyEnd = $("#tenancyEnd").val();
      
      if (tenancyStart == ""){
        _mm.popUpErrMsg("tenancyStart", "请输入租期开始时间！");
        return false;					
      }
      if (tenancyEnd == ""){
        _mm.popUpErrMsg("tenancyEnd", "请输入租期结束时间！");
        return false;					
      }
      
      var start =tenancyStart.replace(/-/g, '');
      var end =tenancyEnd.replace(/-/g, '');
      if(parseInt(start) > parseInt(end)){
        _mm.popUpErrMsg("tenancyStart", "租期开始时间必须小于或等于结束时间！");
        return false;					
      }
      
    }
            
    var worksiteArea = $("#worksiteArea").val();
    if (worksiteArea != ""){
      if (!_mm.isNumber(worksiteArea)){
        _mm.popUpErrMsg("worksiteArea", "厂区面积必须输入数字！");
        return false;					
      }
    }
    
    var workshopArea = $("#workshopArea").val();
    if (workshopArea != ""){
      if (!_mm.isNumber(workshopArea)){
        _mm.popUpErrMsg("workshopArea", "车间面积必须输入数字！");
        return false;					
      }
    }
    
    var finishedgoodsArea = $("#finishedgoodsArea").val();
    if (finishedgoodsArea != ""){
      if (!_mm.isNumber(finishedgoodsArea)){
        _mm.popUpErrMsg("finishedgoodsArea", "成品仓面积必须输入数字！");
        return false;					
      }
    }
    
    var inspectArea = $("#inspectArea").val();
    if (inspectArea != ""){
      if (!_mm.isNumber(inspectArea)){
        _mm.popUpErrMsg("inspectArea", "检验及测试区域面积必须输入数字！");
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
    var worksiteType = "";
    $(':radio[name="worksiteType"]:checked').each(function() {
      worksiteType = $(this).val();
    });

    var tenancyStart = $('#tenancyStart').val();
    var tenancyEnd = $('#tenancyEnd').val();
    var worksiteArea = $('#worksiteArea').val();
    var workshopArea = $('#workshopArea').val();
    var finishedgoodsArea = $('#finishedgoodsArea').val();
    var inspectArea = $('#inspectArea').val();
    
    var url="../WeiXin/weiXinSupplier/saveSection.do";
    var sectionId = _this.getSectionId();
    $.ajax({
      type: "post", // 用POST方式传输
      dataType: "json", // 数据格式:JSON
      url: url, // 目标地址
      data: {
        supplier_token:token,
        sectionId:sectionId,					
        worksiteType: worksiteType,
        tenancyStart: tenancyStart,
        tenancyEnd: tenancyEnd,
        worksiteArea: worksiteArea,
        workshopArea: workshopArea,
        finishedgoodsArea: finishedgoodsArea,
        inspectArea: inspectArea
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


