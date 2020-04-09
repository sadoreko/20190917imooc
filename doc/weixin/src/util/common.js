'use strict';

var Hogan = require('hogan.js');
var conf = {
  serverHost: ''
};
var _mm = {
  // 网络请求
  request: function (param) {
    var _this = this;

    $.ajax({
      type: param.method || 'get',
      url: param.url || '',
      contentType: param.contentType || "application/json",
      dataType: param.type || 'json',
      data: param.data || '',
      async: param.async || true,
      // ifModified  : param.ifModified || true, // 暂时不用
      success: function (res) {
        /**
         * 微信
         *  {
            "code": "0",
            "message": "成功",
            "result":{
              "datalist":[]
              }
            }
         * */
        if (0 === parseInt(res.code)) {
          typeof param.success === 'function' && param.success(res);
        }
        // 请求成功
        else if (200 === res.status) {
          // typeof param.success === 'function' && param.success(res.data, res.msg);
          typeof param.success === 'function' && param.success(res);
        }
        // 没有登录状态，需要强制登录
        else if (10 === res.status) {
          console.log('common.js 需要登录');
          // 需要确认微信端取本地语言信息的方式, 再做修改
          // var _localCfg = _this.getLocalCfg();
          // window.location.href = ('./login.html?lang='+ _localCfg.locale +'&redirect=' + encodeURIComponent(window.location.href));
        }
        // 注册但未激活, 激活页面
        else if (999 === res.status) {
          console.log('common.js status 999');

          // 根据实际情况修改微信端跳转链接
          // window.location.href = './buyer-activate.html?redirect=' + encodeURIComponent(window.location.href);
        }
        // 未找到数据 20200107 各页面自行处理
        else if (9 === res.status) {
          console.log('commonjs——未找到结果');
          typeof param.success === 'function' && param.success(res);
        }
        // 请求数据错误
        else if (500 === res.status) {
          typeof param.error === 'function' && param.error(res.msg);
        }
        else {
          console.log('此段代码在common.js里, 报错, res.status: ', res.status, 'res.data: ', res.data, 'res.msg: ', res.msg);
        }
      },
      error: function (err) {
        typeof param.error === 'function' && param.error(err.statusText);
      }
    });
  },
  // 获取服务器地址
  getServerUrl: function (path) {
    return conf.serverHost + path;
  },
  // 获取url参数
  getUrlParam: function (name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    var result = window.location.search.substr(1).match(reg);
    return result ? decodeURIComponent(result[2]) : null;
  },
  // 渲染html模板
  renderHtml: function (htmlTemplate, data) {
    var template = Hogan.compile(htmlTemplate),
      result = template.render(data);
    return result;
  },
  // 成功提示
  successTips: function (msg) {
    alert(msg || '操作成功！');
  },
  // 错误提示
  errorTips: function (msg) {
    alert(msg || '哪里不对了~');
  },
  // 字段的验证，支持非空、手机、邮箱的判断
  validate: function (value, type) {
    var value = $.trim(value);
    // 非空验证
    if ('require' === type) {
      return !!value;
    }
    // 手机号验证
    if ('phone' === type) {
      return /^1\d{10}$/.test(value);
    }
    // 邮箱格式验证
    if ('email' === type) {
      return /[\w\.\-]+@([\w\-]+\.)+[\w\-]+/.test(value);
    }
  },
  // 统一登录处理
  doLogin: function () {
    window.location.href = './login.html?redirect=' + encodeURIComponent(window.location.href);
  },
  // 登录成功后, 保存user信息 2020-02-24本地测试版 2020-03-12注释掉了, 需要根据微信实际情况处理
  // saveUser : function(user){
  //   if(user == null || user == undefined || user === ''){ return; }
  //   user = user.replace(/([\w\.\-])[\w\.\-]*(@([\w\-]+\.)+[\w\-]+)/, "$1***$2");
  //   // $.cookie('user', user, { expires: 1 }); // jquery的cookie操作
  //   _cookie.setExpiresCookie('user', user, 1);
  // },
  // 统一退出处理 2020-02-24本地测试版
  // doLogout : function(){
  //     _cookie.deleteCookie('user');
  // },
  goHome: function () {
    window.location.href = './index.html';
  },
  // 上面是课程里的, 下面是高桥项目common.js文件里添加的
  isEmail: function isEmail(value) {
    // if(!value.match(/^(?:[a-zA-Z0-9]+[_\-\+\.]?)*[a-zA-Z0-9]+@(?:([a-zA-Z0-9]+[_\-]?)*[a-zA-Z0-9]+\.)+([a-zA-Z]{2,})+$/)){
    //     return false;
    // }
    // return true;

    // 20191210修改, 兼容各国可能会有不同的情况
    if (!value.match(/[\w\.\-]+@([\w\-]+\.)+[\w\-]+/)) {
      return false;
    }
    return true;
  },
  // 回到顶部
  scrollToTop: function scrollToTop() {
    $('html,body').animate({ scrollTop: '0px' }, 10);
    return false;
  },
  goUrl: function goUrl(url) {
    window.location.href = url;
  },
  GetQueryString: function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
  },
  // 自己加的
  // 获取localStorage里的token, 如果没有, 强制登录
  // 20200105 需要修改代码, 改成cookie, 另, 统一供应/采购登录页面
  // checkBuyerLogin: function(){
  //     if(!window.localStorage["token"] || window.localStorage["token"]=== undefined || window.localStorage["token"]=== null || window.localStorage["token"] === ''){
  //         _mm.buyerdoLogin();
  //     }
  // },

  //cpx add 20100114 
  // 20200116 生产环境
  // buildHeader:function(){
  //     var _this = this;
  //     var cfg = _this.getLocalCfg();
  //     var _loginuser= _this.getLoginUser();
  //     //用户已经登录的场合
  //     if (_loginuser.userIsLogin){
  //         var header_userid = _loginuser.userInfo.id;
  //         var header_token = _loginuser.userInfo.token;

  //         var ret={
  //             "Cfg-Locale":cfg.locale,
  //             "Cfg-Region":cfg.region,
  //             "Header-User-Id":header_userid,
  //             "X-Access-Token":header_token
  //         }
  //         return ret;            
  //     } else{
  //         //用户未登录的场合，直接返回基本header
  //         return cfg;
  //     }
  // },
  // 20200116 开发环境
  // buildHeader:function(){
  //     var ret={
  //     "Cfg-Locale":"en_US",
  //     "Cfg-Region":"CN",
  //     "Header-User-Id":"191231104571997257728",
  //     "X-Access-Token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NzkwNzYzNjYsInVzZXJuYW1lIjoiMjY5NTc2ODBAcXEuY29tIn0.6NWyFyagACpn2CcP5x3IFszk8WD6BKYf-rguMF0MXdE"
  //     }
  //     return ret; 
  // },

  //通过cookie获取本地化配置-语言,地域等配置 
  // getLocalCfg:function(){
  //     //默认美式英语
  //     var ret = {
  //         "region":"",
  //         "locale":"en_US"
  //     };

  //     var cfgCookie= _cookie.getCookie("cfg_l");

  //     if (cfgCookie != null && cfgCookie != undefined && cfgCookie != '') {
  //         var configStr = decodeURIComponent(cfgCookie);
  //         if (configStr != null && configStr != undefined && configStr != '') {
  //             var configInfo = JSON.parse(configStr);
  //             // 判断是否是一个对象
  //             if ( typeof(configInfo)  == "object" ) {
  //                 var region=configInfo.cfg_region;
  //                 var locale=configInfo.cfg_locale;
  //                 ret = {
  //                     "region":region,
  //                     "locale":locale                        
  //                 };
  //             }
  //         }
  //     }
  //     return ret;        
  // },

  //通过cookie获取登录人信息
  // getLoginUser: function(){
  //     var ret = {
  //         // 20200116 生产环境
  //         // "userIsLogin":false,
  //         // 20200116 开发环境
  //         "userIsLogin":true,

  //         "userInfo":{}
  //     };
  //     var userCookie = _cookie.getCookie("sso_u");

  //     if (userCookie != null && userCookie != undefined && userCookie != '') {
  //         var userInfoStr = decodeURIComponent(userCookie);

  //         if (userInfoStr != null && userInfoStr != undefined && userInfoStr != '') {
  //             var userInfo = JSON.parse(userInfoStr);
  //             // 判断是否是一个对象
  //             if ( typeof(userInfo)  == "object" ) {
  //                 ret = {
  //                     "userIsLogin":true,
  //                     "userInfo":userInfo
  //                 };
  //             }
  //         }
  //     }
  //     return ret;
  // }

  getWeixinConfig: function () {
    var _this = this;
    // 2020-03-13 添加
    //初始化微信配置
    var authorizationUrl = window.location.href;
    $.ajax({
      // url: "../WeiXin/util/getWXConfig.do",//请求地址
      url: "/WeiXin/util/getWXConfig.do",
      dataType: "json",//数据格式 
      data: {
        authorizationUrl: authorizationUrl
      },
      type: "GET",//请求方式
      async: false,//是否异步请求
      success: function (dto) {
        if (dto != null) {
          if (dto.code == 0) {
            var timestamp = dto.result.timestamp;
            var nonceStr = dto.result.nonceStr;
            var signature = dto.result.signature;
            var accessToken = dto.result.accesstoken;

            wx.config({
              debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
              appId: dto.result.appid, // 必填，公众号的唯一标识
              timestamp: timestamp, // 必填，生成签名的时间戳 见2.4
              nonceStr: nonceStr, // 必填，生成签名的随机串 见2.4
              signature: signature,// 必填，签名，见 2.3
              jsApiList: ['chooseImage', 'previewImage', 'uploadImage', 'downloadImage', 'getLocalImgData']// 必填，需要使用的JS接口列表，所有JS接口列表见 2.5
            });
          } else {
            //alert(dto.message);
            _this.popUpWarn(dto.message);
          }
        }
      },
    });
  },

  /*上传多张图片*/
  uploadImageMuti: function (trigger) {
    wx.chooseImage({
      count: 8, // 默认9
      sizeType: ['original', 'compressed'], // 指定是原图还是压缩图，默认都有 去掉original
      sourceType: ['album', 'camera'], // 指定来源是相册还是相机，默认都有
      success: function (res) {
        var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
        var list = [];
        //$("#"+trigger+"Text").show();
        _this.switchUpload(trigger, true);

        var xt = navigator.userAgent;

        for (var i = 0; i < localIds.length; i++) {
          var html = "";
          if (xt.indexOf("OS") > -1) {
            //alert(1);
            wx.getLocalImgData({
              localId: localIds[i].toString(),
              success: function (res) {
                //html.push('<img class="sigleitem" src='+res.localData+'>');
                //html.push('<div class="picitem"><img src='+res.localData+'></div>');
                html = '<div class="picitem" style="display: none;"><img src=' + res.localData + '></div>';
                $("#" + trigger + "View").append(html);
              },
              fail: function (res) {
              }
            });
          } else {
            //html.push('<img class="sigleitem" src='+localIds[i]+'>');
            //html.push('<div class="picitem"><img src='+localIds[i]+'></div>');
            html = '<div class="picitem" style="display: none;"><img src=' + localIds[i] + '></div>';
            $("#" + trigger + "View").append(html);
          }
        }
        //$("#"+trigger+"View").hide();

        syncUpload(localIds, list, trigger);
        //var mediaIds=list.join(',');
        //alert(mediaIds);
      }
    });
  },

  /*上传单张图片*/
  uploadImageSigle: function (trigger) {
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 指定是原图还是压缩图，默认都有
      sourceType: ['album', 'camera'], // 指定来源是相册还是相机，默认都有
      success: function (res) {
        var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片

        _this.switchUpload(trigger, true);
        var xt = navigator.userAgent;
        var html = [];
        if (xt.indexOf("OS") > -1) {
          wx.getLocalImgData({
            localId: localIds.toString(),
            success: function (res) {
              html.push('<img class="sigleitem" src=' + res.localData + '>');
              $("#" + trigger + "View").append(html.join(''));
            },
            fail: function (res) {
            }
          });
        } else {
          html.push('<img class="sigleitem" src=' + localIds.toString() + '>');
          $("#" + trigger + "View").append(html.join(''));
        }
        wx.uploadImage({
          localId: localIds.toString(), // 需要上传的图片的ID，由chooseImage接口获得
          isShowProgressTips: 1, // 进度提示
          success: function (res) {
            var mediaId = res.serverId; // 返回图片的服务器端ID，即mediaId
            $("#" + trigger).val(mediaId);

            //switchUpload(trigger, true);
            $("#" + trigger + "Text").html("已上传1张");
          },
          fail: function (res) {
            //alertModal('图片上传失败，请重试');
          }
        });
      }
    });
  },
  switchUpload: function (item, uploadedflg) {
    if (uploadedflg) {
      $("#" + item + "Upd").hide();
      $("#" + item + "View").show();
      $("#" + item + "Text").show();
      $("#" + item + "Del").show();
    } else {
      $("#" + item).val("");
      $("#" + item + "Upd").show();
      $("#" + item + "View").children(".sigleitem").remove();
      $("#" + item + "View").children(".picitem").remove();
      $("#" + item + "View").hide();
      $("#" + item + "Text").html("已上传0张");
      $("#" + item + "Text").hide();
      $("#" + item + "Del").hide();
    }
  },
  popUpWarn : function(msg){
    var titleText = "";
    var buttonTextConfirm="";
    titleText = "提示";
    buttonTextConfirm="确定";
            
    $(document).dialog({
      type : 'alert',
      titleText:titleText,
      buttonTextConfirm:buttonTextConfirm,
      content:msg,
      autoClose:2500,
      overlayClose:true		
    });	
  },
  
  popUpAlert : function(msg,url){
    var _this = this;
    var titleText = "";
    var buttonTextConfirm="";
    titleText = "提示";
    buttonTextConfirm="确定";
            
    $(document).dialog({
      type : 'alert',
      titleText:titleText,
      buttonTextConfirm:buttonTextConfirm,
      content:msg,
          onClickConfirmBtn: function(){
            if(url != ""){
              _this.goUrl(url);
            }
          }					
    });	
  },
  
  popUpAlertCallBack : function(msg,callBack){
    var titleText = "";
    var buttonTextConfirm="";
    titleText = "提示";
    buttonTextConfirm="确定";
            
    $(document).dialog({
      type : 'alert',
      titleText:titleText,
      buttonTextConfirm:buttonTextConfirm,
      content:msg,
          onClickConfirmBtn: function(){
            callBack();
          }					
    });	
  },
  
  popUpErrMsg : function(trigger,msg){
    $(document).dialog({
      type : 'notice',
      infoIcon: '../images/fail.png',
      infoText:msg,
      autoClose:2500,
      overlayClose:true,
          onClosed: function(){
            if (trigger != ""){
              $("#"+trigger).focus();
            }
          }
    });	
  },

  convertMsg : function (key){
    var msgTrigger = "msgbox"+key;
    return $("#"+msgTrigger).val();
  },

  /*
  * 多语言适配
  * prex :功能模块前缀
  * lang :当前语言
  */
  adaptMutiLang : function (prex,pageId,lang){
    var _this = this;
    var url = "/WeiXin/mutiLang/adapt.do";
    $.ajax({
      type : "post", // 用POST方式传输
      dataType : "json", // 数据格式:JSON
      url : url, // 目标地址
      async : false,//是否异步请求
      data : {
        prex:prex
        ,lang:lang
      },
      success : function(dto) {
        //console.log(dto);
        if(dto!=null){
          if(dto.code==0){
            $.each(dto.result.datalist, function(i, obj) {
              var key = obj.key;
              var value = obj.value;
              var selector = '[langKey="'+key+'"]';
              
              if(key.indexOf("title") > -1){
                if(key.indexOf(pageId) > -1){
                  $(document).attr("title",value);
                }
              }
              
              if(key.indexOf("label") > -1){
                $(selector).html(value);
              }
              
              if(key.indexOf("placeholder") > -1){
                $(selector).attr("placeholder",value);
              }
              
              if(key.indexOf("button") > -1){
                $(selector).val(value);
              }
              
              if(key.indexOf("msgbox") > -1){
                $(selector).val(value);
              }						
              
            });	
          }else{
            _this.popUpWarn(dto.message);
          }
        }
      },
    });	
  },
  isExsitBuyerToken : function (){
    //TODO token 有效性
    //token 是否失效 失效去登录页面
    var token = localStorage.getItem("buyerToken");
    if(token == null) {
      return false;
    }
    return true;
  },
  
  getSupplierToken : function (){
    var token = localStorage.getItem("supplierToken");
    if(token == null) {
      this.goUrl("./login.html");
    } else {
      return token;
    }
  },

  getBuyerToken : function (){
    var token = localStorage.getItem("buyerToken");
    if(token == null) {
      this.goUrl("supplier-login.html");
    } else {
      return token;
    }
  },

  isExsitSupplierToken : function (){
    //TODO token 有效性
    //token 是否失效 失效去登录页面
    var token = localStorage.getItem("supplierToken");
    if(token == null) {
      return false;
    }
    return true;
  },


  getLocalLang : function (){
    var lang = localStorage.getItem("localLang");
    if(lang == null){
      //return "zh-cn";
      return "";
    } else {
      return lang;
    }
  },

  setLocalLang : function (lang){
    localStorage.setItem("localLang",lang);
  },

  setNation : function (nation){
    localStorage.setItem("nation",nation);
  },

  getNation : function (){
    var nation = localStorage.getItem("nation");
    if(nation == null){
      return "";
    } else {
      return nation;
    }
  },

  popUpMutiLangMsgBox : function (type,msg,url){
    var _this = this;
    var titleText = $("#msgboxAlertTitle").val();
    var buttonTextConfirm=$("#msgboxBtnOk").val();
    //titleText = "提示";
    //buttonTextConfirm="确定";
            
    $(document).dialog({
      type : type,
      titleText:titleText,
      buttonTextConfirm:buttonTextConfirm,
      content:msg,
          onClickConfirmBtn: function(){
            if(url != ""){
              _this.goUrl(url);
            }
          }					
    });		
  },

  supplierProfileData : function(){
    var token = this.getSupplierToken();
    var data = {supplier_token:token};
    return data;
  },

  bindSubmit : function(validate, save){
    $("#btnSubmit").click(function(){
      if (validate()){
        save();
      }
    });
  },

  /*弹窗*/
  callDialog : function(infoTextValue,goFlag){
    var titleText = "";
    var buttonTextConfirm="";
    titleText = "提示";
    buttonTextConfirm="确定";
            
    $(document).dialog({
      type : 'alert',
      titleText:titleText,
      buttonTextConfirm:buttonTextConfirm,
      content:infoTextValue,
          onClickConfirmBtn: function(){
            if(goFlag){
              //window.location.href="event.html";
            }
          }					
    });			
  },

  initDatePicker : function (id) {
    var calendar = new datePicker();
    var trigger = '#' + id;
    calendar.init({
      'trigger': trigger,
      /*按钮选择器，用于触发弹出插件*/
      'type': 'date',
      /*模式：date日期；datetime日期时间；time时间；ym年月；*/
      'minDate': '1900-1-1',
      /*最小日期*/
      'maxDate': '2100-12-31',
      /*最大日期*/
      'onSubmit': function() { /*确认时触发事件*/
        var theSelectData = calendar.value;
      },
      'onClose': function() { /*取消时触发事件*/ }
    });
  },

  isEmail : function (value){
    if(!value.match(/^(?:[a-zA-Z0-9]+[_\-\+\.]?)*[a-zA-Z0-9]+@(?:([a-zA-Z0-9]+[_\-]?)*[a-zA-Z0-9]+\.)+([a-zA-Z]{2,})+$/)){
        return false;
    }
    return true;
  },

  isInteger : function (value){
    //return Math.floor(value) === value;
    var res = /^\+?[1-9][0-9]*$/;
    if (!res.test(value)) {
      return false;
    }	else {
      return true;
    }	
  },

  isNumber : function (value){
    var res = /^[0-9]+.?[0-9]*/;//判断字符串是否为数字//判断正整数/[1−9]+[0−9]∗]∗/ 
    if (!res.test(value)) {
      return false;
    }	else {
      return true;
    }
  }

};

module.exports = _mm;