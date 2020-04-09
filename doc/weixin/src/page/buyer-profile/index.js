'use strict';
require('page/common/index.css');
require('page/common/personal.css');
require('page/common/nav.css');
require('./index.css');
require('page/addition/nav/index.js');
var _mm = require('util/common.js');
var _mock = require('service/mock-service.js');

var page = {
  init: function () {
    this.onLoad();
    this.bindEvent();
  },
  onLoad: function (){
     //基本信息获取 20200407注释, 会跳转登录页
    // this.getProfile();
    this.switchMsgbox();
    this.loadMutiLang();
  },
  bindEvent : function (){
    $('#closeEn').click(function() {
      $('#enMsg').hide();
    });
    
    $('#closeZh').click(function() {
      $('#zhMsg').hide();
    });	
    
    $('#closeFr').click(function() {
      $('#frMsg').hide();
    });
  },
  loadMutiLang : function (){
    var prex = "profile";
    var pageId = "profile";
    var lang = _mm.getLocalLang();
    _mm.adaptMutiLang(prex,pageId,lang);
  },

  getProfile : function (){
    var token = _mm.getBuyerToken();
    var url = "/WeiXin/weiXinBuyer/getProfile.do";
    $.ajax({
      type: "post", // 用POST方式传输
      dataType: "json", // 数据格式:JSON
      url: url, // 目标地址
      data: {
        token:token
      },
      success: function(dto) {
        if(dto != null) {
          if(dto.code == 0) {
        /*localStorage.setItem("supplierId", dto.result.orgInfo.supplierId);

            var scoreTotal = dto.result.orgInfo.score;
            var licenseAduit = dto.result.orgInfo.licenseAduit;
            var scorePage = dto.result.orgInfo.score;
            var orgNameZh = dto.result.orgInfo.orgNameZh;
            
            $("#scoreTotal").html(scoreTotal);
            $("#orgNameZh").html(orgNameZh);
            $("#scorePage").html(scorePage);
            $("#licenseAduit").html(licenseAduit);*/
            
            $("#userRealname").html(dto.result.buyerInfo.userRealname);
          } else {
            
          }
        }
      },
    });			
  },

  switchMsgbox : function (){
    var lang = _mm.getLocalLang();
    if("en" == lang){
      $("#enMsg").show();
    }
    if("fr" == lang){
      $("#frMsg").show();
    }
    if("zh-cn" == lang){
      $("#zhMsg").show();
    }

    $("#enMsg").show(); // 20200407 目前没有getLocalLang, 先显示一个出来, 后面删掉此句
  }

};

$(function() {
  page.init();
});