'use strict';
require('page/common/style.css');
require('util/jquery-labelauty.css');
// require('util/ydui.css?rev=@@hash');
require('page/common/demo.css');
require('page/common/dialog.css');
require('page/common/product-tag.css');
require('./index.css');

require('util/common.js');
require('util/datePicker.js');
require('util/dialog.js');
require('util/switch-supplier-route.js');
require('util/tagUtil.js');
require('util/jquery-labelauty.js');

/**
 * 		<link type="text/css" rel="stylesheet" href="css/style.css" media="screen" />
	    <link type="text/css" rel="stylesheet" href="css/ydui.css?rev=@@hash"/>
	    <link type="text/css" rel="stylesheet" href="css/demo.css"/>
	    <link type="text/css" rel="stylesheet" href="css/dialog.css">
    <link type="text/css" rel="stylesheet" href="css/product-tag.css">
    
	<script type="text/javascript" src="js/datePicker.js"></script>
	<script type="text/javascript" src="js/dialog.js"></script>
	<script type="text/javascript" src="js/ydui.citys.js"></script>
	<script type="text/javascript" src="js/ydui.js"></script>	
 */

var _mm           = require('util/common.js');

var page = {
	init: function(){
    this.onLoad();
    this.bindEvent();
	},
	onLoad : function(){
    var _this = this;
    var loadMsgBox = $(document).dialog({
      type : 'toast',
      infoIcon: '../images/loading.gif',
      infoText: '正在加载中'
    });
    
    _mm.getWeixinConfig();
    
    // this.initCityPicker();

    //主要产品
    _this.bindCheckboxTag("mainProducts");
    //
    $("#btnNext").click(function() {
      _mm.scrollToTop();				
      
      if(!_this.validate()) {
        return;
      } else {
        _this.submitForm();
      }
    })
    
    loadMsgBox.update({
        infoIcon: '../images/success.png',
        infoText: '加载成功',
        autoClose: 1000,
    });
  },
  bindEvent : function(){

  },
  /* 单选 复选 标签框*/
  bindCheckboxTag : function (tagNm){
    var selector = '[name="'+tagNm+'"]';
    $(selector).each(function(i,elemt){
        $(this).click(function(){
        if ($(this).hasClass("active")){
          $(this).removeClass("active");
        } else {
          $(this).addClass("active");
        }
        });
    })			
  },
  resetErrMsg: function () {
    $("#errMsgOrgNameZh").hide();
    $("#errMsgEmail").hide();
    $("#errMsgEmailFormat").hide();
    $("#errMsgLoginPassword").hide();
    // $("#errMsgCorporation").hide();
    $("#errMsgContact").hide();
    $("#errMsgContactTel").hide();
    $("#errMsgAddress").hide();
    $("#errMsgPolice").hide();
    $("#errMsgMainProducts").hide();
  },
  validate : function() {
    //return true;
    var orgNameZh = $.trim($('#orgNameZh').val());
    var corporation = $.trim($('#corporation').val());
    var contact = $.trim($('#contact').val());
    var contactTel = $.trim($('#contactTel').val());
    var picker = $('#picker').val();
    var police = $.trim($('#police').val());
    var loginAccount = $.trim($('#loginAccount').val());
    var loginPassword = $.trim($('#loginPassword').val());
  
    var mainProductsArr = [];
    
    $('[name="mainProducts"]').each(function(i,elemt){
      if ($(this).hasClass("active")){
        mainProductsArr.push($(this).attr("data"));
      }			   
    })
  
    var otherMainProduct=$('#otherMainProduct').val();
    mainProductsArr.push(otherMainProduct);
    var mainProducts = mainProductsArr.join(',');
    
    this.resetErrMsg();
  
    if(orgNameZh == "") {
      $("#orgNameZh").focus();
      $("#errMsgOrgNameZh").show();
      return false;
    }
  
    if(loginAccount == "") {
      $("#loginAccount").focus();
      $("#errMsgEmail").show();
      return false;
    } else {
      if (!_mm.isEmail(loginAccount)) {	
        $("#loginAccount").focus();
        $("#errMsgEmailFormat").show();
        return false;
      }
    }
  
    if(loginPassword == "") {
      $("#loginPassword").focus();
      $("#errMsgLoginPassword").show();
      return false;
    }
  
  /*			if(corporation == "") {
      $("#corporation").focus();
      $("#errMsgCorporation").show();
      return false;
    }*/
  
    if(contact == "") {
      $("#contact").focus();
      $("#errMsgContact").show();
      return false;
    }
  
    if(contactTel == "") {
      $("#contactTel").focus();
      $("#errMsgContactTel").show();
      return false;
    }
  
    if(picker == "") {
      $("#picker").focus();
      $("#errMsgAddress").show();
      return false;
    }
  
    if(police == "") {
      $("#police").focus();
      $("#errMsgPolice").show();
      return false;
    }
  
    if(mainProducts == "") {
      $("#police").focus();
      $("#errMsgMainProducts").show();
      return false;
    }
  
    return true;
  },
  submitForm : function() {
    var _this = this;
    if(!_this.validate()) {
      return;
    }
    
          var submitMsgBox = $(document).dialog({
              type : 'toast',
              infoIcon: '../images/loading.gif',
              infoText: '数据提交中'
          });
          
    /*步骤1 开始*/
    var orgNameZh = $.trim($('#orgNameZh').val());
    var corporation = $.trim($('#corporation').val());
    var contact = $.trim($('#contact').val());
    var contactTel = $.trim($('#contactTel').val());
    var picker = $('#picker').val();
    var police = $.trim($('#police').val());
    var loginAccount = $.trim($('#loginAccount').val());
    var loginPassword = $.trim($('#loginPassword').val());
  
    var mainProductsArr = [];
    $('[name="mainProducts"]').each(function(i,elemt){
      if ($(this).hasClass("active")){
        mainProductsArr.push($(this).attr("data"));
      }			   
    });			
    
    var otherMainProduct=$('#otherMainProduct').val();
    mainProductsArr.push(otherMainProduct);			
    var mainProducts = mainProductsArr.join(',');
    /*步骤1 结束*/
    
    var url = "/WeiXin/weiXinSupplier/signUp.do";
    $.ajax({
      type: "post", // 用POST方式传输
      dataType: "json", // 数据格式:JSON
      url: url, // 目标地址
      data: {
        orgNameZh: orgNameZh,
        corporation: corporation,
        contact: contact,
        contactTel: contactTel,
        picker: picker,
        police: police,
        loginAccount: loginAccount,
        loginPassword: loginPassword,
        mainProducts: mainProducts
      },
      success: function(dto) {
        submitMsgBox.close();
        if(dto != null) {
          if(dto.code == 0) {
            var supplierToken = dto.result.supplierToken;
            localStorage.setItem("supplierToken",supplierToken);
            var url = "supplier-certify-route.html";
            _mm.popUpAlert(dto.message, url);
          } else {
            _mm.popUpWarn(dto.message);
          }
        }
      },
    });
  },


};

$(function(){
  page.init();
});


// function initCityPicker(){
//   var $target = $('#picker');

//   $target.citySelect();

//   $target.on('click', function (event) {
//     event.stopPropagation();
//     $target.citySelect('open');
//   });

//   $target.on('done.ydui.cityselect', function (ret) {
//     $(this).val(ret.provance + ' ' + ret.city + ' ' + ret.area);
//   });			
// }