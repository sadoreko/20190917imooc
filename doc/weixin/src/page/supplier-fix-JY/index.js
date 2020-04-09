'use strict';
require('page/common/index.css');
require('page/common/form.css');
require('page/common/personal-setting.css');
require('page/common/product-tag-write.css');
require('page/common/dialog.css');
require('./index.css');

require('page/addition/nav/index.js'); // 点击返回按钮
require('util/dialog.js');
var _tagUtil      = require('util/tagUtil.js');
var _mm           = require('util/common.js');
var _mock         = require('service/mock-service.js');

var page = {
  init: function () {
    this.onLoad();
    this.bindEvent();
  },
  onLoad: function () {
    //画面加载数据
    // 2020-03-21 暂时注释, 否则未登录, 跳转登录页
    // this.load();
  },
  bindEvent : function(){
    var _this = this;
    //绑定提交事件
    $("#btnSubmit").click(function(){
      if (_this.validate()){
        _this.save();
      }
    });
    //外贸经验
    //$(":radio[name='isForeignTrade']").labelauty();
    
    _tagUtil.bindRadioTag("isForeignTrade");
    
    //有无出口业务团队
    //$(":radio[name='isForeignTradeTeam']").labelauty();
    _tagUtil.bindRadioTag("isForeignTradeTeam");
    
    //出口方式
    //$(":checkbox[name='exportMode']").labelauty();	
    _tagUtil.bindCheckboxTag("exportMode");
    
    //出口方式
    //$(":checkbox[name='exportProducts']").labelauty();
    _tagUtil.bindCheckboxTag("exportProducts");
  },
  getSectionId : function (){
    return "experience";			
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
            var isForeignTrade = dto.result.isForeignTrade;
/*							$(":radio[name='isForeignTrade']").each(function(){
              if($(this).val()==isForeignTrade){
                $(this).attr("checked","checked");
              }
            });*/
            
            $('[name="isForeignTrade"]').each(function(i,elemt){								
              if($(this).attr("data")==isForeignTrade){
                $(this).addClass("active");
              }								
            });								
            
            var isForeignTradeTeam = dto.result.isForeignTradeTeam;
/*							$(":radio[name='isForeignTradeTeam']").each(function(){
              if($(this).val()==isForeignTradeTeam){
                $(this).attr("checked","checked");
              }
            });	*/
            
            
            $('[name="isForeignTradeTeam"]').each(function(i,elemt){								
              if($(this).attr("data")==isForeignTradeTeam){
                $(this).addClass("active");
              }								
            });								
            
            var exportMode = dto.result.exportMode;
            if (exportMode != ""){
/*								$(":checkbox[name='exportMode']").each(function(){
                var value =$(this).val();
                if(exportMode.indexOf(value) > -1){
                  $(this).attr("checked","checked");
                }
              });*/
              
              $('[name="exportMode"]').each(function(i,elemt){
                var value =$(this).attr("data");
                if(exportMode.indexOf(value) > -1){
                  $(this).addClass("active");
                }																	
              });									
            }
            
            var exportCountries = dto.result.exportCountries;
            $("#exportCountries").val(exportCountries);
            

            var rmbExportVolume = dto.result.rmbExportVolume;
            $("#rmbExportVolume").val(rmbExportVolume);							

            var dollarExportVolume = dto.result.dollarExportVolume;
            $("#dollarExportVolume").val(dollarExportVolume);
            
            var exportProducts = dto.result.exportProducts;
            if (exportProducts != ""){
/*								$(":checkbox[name='exportProducts']").each(function(){
                var value =$(this).val();
                if(exportProducts.indexOf(value) > -1){
                  $(this).attr("checked","checked");
                }
              });	*/
              $('[name="exportProducts"]').each(function(i,elemt){
                var value =$(this).attr("data");
                if(exportProducts.indexOf(value) > -1){
                  $(this).addClass("active");
                }																	
              });								
            }	
          } else {
                          
          }
        }
      },
    });			
  },
  
  validate : function (){
    var rmbExportVolume = $("#rmbExportVolume").val();
    if (rmbExportVolume != ""){
      if (!_mm.isNumber(rmbExportVolume)){
        _mm.popUpErrMsg("rmbExportVolume", "年出口额(人民币)必须输入数字！");
        return false;					
      }
    }
    
    var dollarExportVolume = $("#dollarExportVolume").val();
    if (dollarExportVolume != ""){
      if (!_mm.isNumber(dollarExportVolume)){
        _mm.popUpErrMsg("dollarExportVolume", "年出口额(美元)必须输入数字！");
        return false;					
      }
    }			
    
    return true;
  },
  
  //保存数据
  save : function (){
    var _this = this;
    var isForeignTrade = "";
/*			$(':radio[name="isForeignTrade"]:checked').each(function() {
      isForeignTrade = $(this).val();
    });*/
    
    $('[name="isForeignTrade"]').each(function(i,elemt){								
      if ($(this).hasClass("active")){
        isForeignTrade= $(this).attr("data");
      }								
    });			

    var isForeignTradeTeam = "";
/*			$(':radio[name="isForeignTradeTeam"]:checked').each(function() {
      isForeignTradeTeam = $(this).val();
    });*/
    
    $('[name="isForeignTradeTeam"]').each(function(i,elemt){								
      if ($(this).hasClass("active")){
        isForeignTradeTeam= $(this).attr("data");
      }								
    });			

    var exportModeArr = [];
/*			$(':checkbox[name="exportMode"]:checked').each(function() {
      exportModeArr.push($(this).val());
    });*/
    
    $('[name="exportMode"]').each(function(i,elemt){
      if ($(this).hasClass("active")){
        exportModeArr.push($(this).attr("data"));
      }			   
    });
    
    var exportMode = exportModeArr.join(',');

    var rmbExportVolume = $('#rmbExportVolume').val();
    var dollarExportVolume = $('#dollarExportVolume').val();

    var exportCountries = $('#exportCountries').val();

    var exportProductsArr = [];
/*			$(':checkbox[name="exportProducts"]:checked').each(function() {
      exportProductsArr.push($(this).val());
    });*/
    
    $('[name="exportProducts"]').each(function(i,elemt){
      if ($(this).hasClass("active")){
        exportProductsArr.push($(this).attr("data"));
      }			   
    });
    
    var exportProducts = exportProductsArr.join(',');
    
    //var supplierId = localStorage.getItem("supplierId");
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
        isForeignTrade: isForeignTrade,
        isForeignTradeTeam: isForeignTradeTeam,
        exportMode: exportMode,
        rmbExportVolume: rmbExportVolume,
        dollarExportVolume: dollarExportVolume,
        exportCountries: exportCountries,
        exportProducts: exportProducts					
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


