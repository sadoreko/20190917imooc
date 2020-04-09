'use strict';
require('node_modules/font-awesome/css/font-awesome.css');
require('page/common/index.css');
require('./index.css');
require('page/addition/nav/index.js');

var _mm           = require('util/common.js');
var _mock         = require('service/mock-service.js');

var formError = {
  $ePsw  : $('#errMsgPsw'),
  $eUser : $('#errMsgUser'),
  show : function(accountMsg, passwordMsg){
    if(!accountMsg == ''){
      this.$eUser.text(accountMsg).addClass('active');
    }else{
      this.$eUser.text('').removeClass('active');
    }
    if(!passwordMsg == ''){
      this.$ePsw.text(passwordMsg).addClass('active');
    }else{
      this.$ePsw.text('').removeClass('active');
    }
  },
  hide : function(){
    this.$eUser.text('').removeClass('active');
    this.$ePsw.text('').removeClass('active');
  }
};

var page = {
  data : {
  },
  listParam : {},
	init: function(){
    this.onLoad();
    this.bindEvent();
	},
	onLoad : function(){
    var _this = this;
  },
  bindEvent : function(){
    var _this = this;
    $('#loginBtn').click(function(){
      _this.submit();
    });
  },
  submit : function(){
    var _this = this,
        formData = {
          username  : $.trim($('#user').val()),
          password : $.trim($('#psw').val())
        },
        // 表单验证结果
        validateResult = this.formValidate(formData);
        console.log(formData);
        console.log(validateResult);
        
    // 验证成功
    if(validateResult.status === 0){
      _mock.userlogin(formData, function(res) {

        if(res.status == 200){
          console.log('登录200, 之后调转首页或哪里');
          // window.location.href = _mm.getUrlParam('redirect') || './index.html';
        }else{
          formError.show(_this.data.formErrMsg["loginReject"], '');
          // formError.show('用户名或密码错误', '');
        }
      }, function(errMsg){
        formError.show(errMsg, '');
      });
    }
    // 验证失败
    else{
      // 错误提示
      formError.show(validateResult.accountMsg, validateResult.passwordMsg);
    }
  },
  // 表单字段的验证
  formValidate : function(formData){
    var _this = this;
    var result = {
        status        : 1,
        accountMsg    : '',
        passwordMsg   : '',
        data          : {}
    };
    if(!_mm.validate(formData.username, 'require')){
      result.accountMsg = '请输入邮箱地址';
      return result;
    }
    if (!_mm.isEmail(formData.username)) {	
      $("#loginAccount").focus();
      result.accountMsg = '请输入正确的邮箱地址格式';
      return result;
    }
    if(!_mm.validate(formData.password, 'require')){
      result.passwordMsg = '请输入登录密码';
      return result;
    }
    // 通过验证
    result.status   = 0;
    result.accountMsg  = '';
    result.passwordMsg = '';
    return result;
  }
};

$(function(){
  page.init();
});