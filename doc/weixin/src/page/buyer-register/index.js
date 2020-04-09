
'use strict';
require('page/common/index.css');
require('page/common/style.css');
require('page/common/emailAutoComple.css');
require('page/common/dialog.css');
require('page/common/chosepro.css');
require('page/common/chosepro_list.css');
require('page/common/home.css');
require('page/common/pro_infor.css');
require('./index.css');

require('util/dialog.js');
require('page/addition/nav/index.js');

var _mm                 = require('util/common.js');
var _weixin             = require('service/weixin-service.js');
var templateInitPage    = require('./initPage.string');
var templateSubCategory = require('./subCategory.string');

var page = {
  init: function () {
    this.onLoad();
    this.bindEvent();
  },
  onLoad: function () {
    var _this = this;
    var loadMsgBox = $(document).dialog({
      type: 'toast',
      infoIcon: 'images/icon/loading.gif',
      infoText: 'loading'
    });

    //初始化微信环境
    _mm.getWeixinConfig();

    var trigger = "passportPhotoUrl";
    _mm.switchUpload(trigger, false);

    //初始化数据
    _this.initPage();

    //初始化面板
    _this.switchPage("Home");
    //多语言适配
    _this.loadMutiLang();

    var msgboxLoadStatus = $("#msgboxLoadStatus").val();
    loadMsgBox.update({
      infoIcon: '../images/success.png',
      infoText: msgboxLoadStatus,
      autoClose: 1000,
    });
  },
  /*初始化表单项目错误消息*/
  resetErrMsg : function () {
    $("#errMsgFullName").hide();
    $("#errMsgEmail").hide();
    $("#errMsgEmailFormat").hide();
    $("#errMsgLoginPassword").hide();
    $("#errMsgMobile").hide();
    $("#errMsgMobileFormat").hide();
    $("#errMsgFavorite").hide();
    //$("#errMsgPassport").hide();		
  },
  fillCheckedCnt : function () {
    var cnt = 0;
    $(':checkbox[name="goodsGroup"]:checked').each(function () {
      cnt++;
    });

    var category = $("#onCategory").val();
    var cntId = "checkedText" + category;
    $("#" + cntId).empty();
    if (cnt > 0) {
      $("#" + cntId).html(cnt);
    }
  },
  removeSplitItem : function (trigger, key) {
    var value = $("#" + trigger).val();
    var arr = value.split(",");
    var html = [];

    for (var i = 0; i < arr.length; i++) {
      if (key != arr[i]) {
        html.push(arr[i]);
      }
    }

    return html.join(',');
  },

  lastKey : function (value) {
    if (value == "") {
      return "";
    }
    var arr = value.split(".");
    var idx = arr.length - 1;
    return arr[idx];
  },

  favoriteCallBack : function () {
    var value = $('#favoriteValues').val();
    if (value != "") {
      var lang = _mm.getLocalLang();
      var url = "/WeiXin/mutiLang/checkedSubCategory.do";
      console.log(lang, value);
      
      $.ajax({
        type: "post", // 用POST方式传输
        dataType: "json", // 数据格式:JSON
        url: url, // 目标地址
        async: false,//是否异步请求
        data: {
          lang: lang,
          keys: value
        },
        success: function (dto) {
          if (dto != null) {
            if (dto.code == 0) {
              console.log(dto);
              
              $('#userFavorite').val(dto.result.joinret);
            } else {
              _mm.popUpWarn(dto.message);
            }
          }
        },
      });
    }
  },

  subCategory : function () {
    var _this = this;
    var url = "/WeiXin/mutiLang/subCategory.do";
    var category = $('#onCategory').val();
    var lang = _mm.getLocalLang();
    console.log(category, lang);
    $.ajax({
      type: "post", // 用POST方式传输
      dataType: "json", // 数据格式:JSON
      url: url, // 目标地址
      data: { category: category, lang: lang },
      success: function (dto) {
        if (dto != null) {
          if (dto.code == 0) {
            console.log(dto);
            
            var html = [];
            var valueArr = $('#favoriteValues').val();
            //alert(valueArr);
            $.each(dto.result.datalist, function (i, obj) {
              var value = obj.key;
              //var goodsId = _this.lastKey(value);
              var goodsId = obj.id;
              var imgId = _this.lastKey(value);
              var imgUrl = "../images/" + imgId + ".png";
              var goodsNm = obj.value;
              var isChecked = "";
              if (valueArr.indexOf(goodsId) > -1) {
                //alert(1);
                isChecked = "checked='checked'";
              }
              var chkId = "goods" + goodsId;
              html.push('<div class="pro-col-6"> 									');
              html.push('	<a class="pro_link">                                    ');
              html.push('       <div class="pro-img">                                ');
              html.push('       	<img src=' + imgUrl + '>');
              html.push('       </div>                                               ');
              html.push('       <div class="product_infor">                          ');
              html.push('          <p class="pro_title">' + goodsNm + '</p>             ');
              //html.push('          <p class="pro_describe">产品性能介绍商品描述</p>  		');
              html.push('       </div>                                               ');
              html.push('       <div class="form-group">                             ');
              html.push('          <input type="checkbox" id=' + chkId + ' name="goodsGroup" ' + isChecked + 'value=' + goodsId + '>');
              html.push('          <label for=' + chkId + '></label>                        ');
              html.push('       </div>                                               ');
              html.push('   	</a>                                                    ');
              html.push('</div>                                                      ');
            });

            $("#productList").empty();
            $("#productList").append(html.join(''));

            $(':checkbox[name="goodsGroup"]').each(function (i, elemt) {
              $(this).change(function () {
                var ischecked = $(this).is(':checked');
                var itemValue = $(this).val();
                //alert(itemValue);
                var tmpvalue = $('#favoriteValues').val();
                if (ischecked) {
                  //alert(1);
                  if (tmpvalue.indexOf(itemValue) < 0) {
                    if (tmpvalue == "") {
                      tmpvalue = itemValue;
                    } else {
                      tmpvalue = tmpvalue + "," + itemValue;
                    }
                    $('#favoriteValues').val(tmpvalue);
                  }
                } else {
                  if (tmpvalue.indexOf(itemValue) > -1) {
                    var ret = _this.removeSplitItem("favoriteValues", itemValue);
                    $('#favoriteValues').val(ret);
                  }
                }
                //重新计算选中数量
                _this.fillCheckedCnt();
              });
            })
          } else {
            _mm.popUpWarn(dto.message);
          }
        }
      },
    });
  },

  // initPage : function (){ // 2020-03-16 能拿到res, 拿不到里面的数据
  //   var _this   = this,
  //     listHtml  = '',
  //     $pageWrap = $('#categoryList'),
  //     lang = _mm.getLocalLang(),
  //     formData = {
  //       "lang": lang
  //     };

  //   _weixin.getMsgList(formData, function (res) {
  //     // _this.data = res;
  //     console.log(res);

  //       // render数据
  //       listHtml = _mm.renderHtml(templateInitPage, _this.data);
  //       $pageWrap.html(listHtml);

  //   }, function (errMsg) {
  //     console.log(errMsg);
  //   });
  // },
  initPage : function () {
    var _this = this;
    var url = "/WeiXin/mutiLang/goodsCategory.do";
    var lang = _mm.getLocalLang();
    $.ajax({
      type: "post", // 用POST方式传输
      dataType: "json", // 数据格式:JSON
      url: url, // 目标地址
      data: { lang: lang },
      success: function (dto) {
        if (dto != null) {
          if (dto.code == 0) {
            var result  = dto.result,
              listHtml  = '',
              $pageWrap = $('#categoryList');

            listHtml = _mm.renderHtml(templateInitPage, result);
            $pageWrap.html(listHtml); 

            $(".categoryItem").click(function () {
              var data = $(this).attr("data");
              $('#onCategory').val(data);
              _this.switchPage("Goods");
              _this.subCategory();
            })
          } else {
            _mm.popUpWarn(dto.message);
          }
        }
      },
    });
  },
  initPage原版 : function () {
    var _this = this;
    var url = "/WeiXin/mutiLang/goodsCategory.do";
    var lang = _mm.getLocalLang();
    console.log('initPage', lang);
    
    $.ajax({
      type: "post", // 用POST方式传输
      dataType: "json", // 数据格式:JSON
      url: url, // 目标地址
      data: { lang: lang },
      success: function (dto) {
        console.log(dto);
        
        if (dto != null) {
          if (dto.code == 0) {
            var rowCnt = 0;
            var html = [];
            $.each(dto.result.datalist, function (i, obj) {
              var value = obj.key;
              //var category = lastKey(value);
              var category = obj.id;
              var cntId = "checkedText" + category;
              html.push('<li><a data=' + category + ' class="categoryItem">' + obj.value + '<b id=' + cntId + '></b></a></li>');
            });

            $("#categoryList").append(html.join(''));

            $(".categoryItem").click(function () {
              var data = $(this).attr("data");
              $('#onCategory').val(data);
              _this.switchPage("Goods");
              _this.subCategory();
            })
          } else {
            _mm.popUpWarn(dto.message);
          }
        }
      },
    });
  },
  bindEvent : function () {
    var _this = this;
    /*扩展项目显示*/
    $('#next').click(function () {//点击a标签
      $('#choice-detail').show();//那么就显示div
      $('#next').hide();
    })

    /*添加感兴趣的商品*/
    $("#addFarvirate").click(function () {
      _this.switchPage("Category");
    })

    //上传护照图片
    $("#passportPhotoUrlUpd").click(function () {
      var trigger = "passportPhotoUrl";
      _mm.uploadImageSigle(trigger);
    })

    //清空图片
    $("#passportPhotoUrlDel").click(function () {
      var trigger = "passportPhotoUrl";
      _mm.switchUpload(trigger, false);
    })

    //提交表单
    $("#btnSubmit").click(function () {
      if (!_this.validate()) {
        return;
      }
      _this.submitForm();
    })

    //返回按钮
    $("#backCategory").click(function () {
      _this.switchPage("Category");
    })

    //返回按钮
    $("#backHome").click(function () {
      _this.switchPage("Home");
    })

    //选择商品 确认按钮
    $("#btnOkGoods").click(function () {
      _this.fillCheckedCnt();
      _this.switchPage("Category");
    })

    //商品分类 确认按钮 
    $("#btnOkCategory").click(function () {
      _this.switchPage("Home");
      _this.favoriteCallBack();
    })

  },

  /**
   * 切换画面各个面板
   * page: Home-主面板, Category-商品分类面板,Goods-商品选择面板
   */
  switchPage : function (page) {
    var arr = ["Home", "Category", "Goods"];
    for (var i = 0; i < 3; i++) {
      var header = "header" + arr[i];
      var main = "main" + arr[i];
      var footer = "footer" + arr[i];
      if (page == arr[i]) {
        $("#" + header).show();
        $("#" + main).show();
        $("#" + footer).show();
        //画面回顶部
        _mm.scrollToTop();
      } else {
        $("#" + header).hide();
        $("#" + main).hide();
        $("#" + footer).hide();
      }
    }
  },

  /**
   * 表单验证
   */
  validate : function () {

    this.resetErrMsg();

    var userRealname = $("#userRealname").val();
    // var loginPassword = "123456";
    var loginPassword = $("#loginPassword").val();
    var userEmail = $("#userEmail").val();
    var userPhone = $("#userPhone").val();

    var userFavorite = $("#userFavorite").val();
    var otherFavorite = $("#otherFavorite").val();

    if (userRealname == "") {
      $("#userRealname").focus();
      $("#errMsgFullName").show();
      return false;
    }

    if (userEmail == "") {
      $("#userEmail").focus();
      $("#errMsgEmail").show();
      return false;
    } else {
      if (!_mm.isEmail(userEmail)) {
        $("#userEmail").focus();
        $("#errMsgEmailFormat").show();
        return false;
      }
    }

    if (loginPassword == "") {
      $("#loginPassword").focus();
      $("#errMsgLoginPassword").show();
      return false;
    }

    if (userPhone == "") {
      $("#userPhone").focus();
      $("#errMsgMobile").show();
      return false;
    } else {
      var valLen = userPhone.length;
      if (valLen < 5) {
        $("#userPhone").focus();
        $("#errMsgMobileFormat").show();
        return false;
      }
    }

    var flg = 0;
    if (userFavorite != "") {
      flg = 1;
    }
    if (otherFavorite != "") {
      flg = 1;
    }
    if (flg == 0) {
      $("#otherFavorite").focus();
      $("#errMsgFavorite").show();
      return false;
    }

    return true;
  },

  submitForm : function () {
    var _this = this;
    var msgboxSubmitStatus = $("#msgboxSubmitStatus").val();
    var submitMsgBox = $(document).dialog({
      type: 'toast',
      infoIcon: '../images/loading.gif',
      infoText: msgboxSubmitStatus
    });

    var userNation = _mm.getNation();
    var lang = _mm.getLocalLang();
    var userRealname = $("#userRealname").val();
    var userEmail = $("#userEmail").val();
    // var loginPassword = "123456";
    var loginPassword = $("#loginPassword").val();
    var userPhone = $("#userPhone").val();
    //var userFavorite = $("#userFavorite").val();
    var userFavorite = $('#favoriteValues').val();
    var otherFavorite = $("#otherFavorite").val();
    var orgName = $("#orgName").val();
    var userMessage = $("#userMessage").val();
    var passportNo = $("#passportNo").val();
    var passportImg = $("#passportPhotoUrl").val();
    var orgCreditCode = "";

    var url = "/WeiXin/weiXinBuyer/signUp.do";
    $.ajax({
      type: "post", // 用POST方式传输
      dataType: "json", // 数据格式:JSON
      url: url, // 目标地址
      async: false,//是否异步请求
      data: {
        userNation: userNation,
        lang: lang,
        userRealname: userRealname,
        loginPassword: loginPassword,
        userEmail: userEmail,
        userPhone: userPhone,
        userFavorite: userFavorite,
        otherFavorite: otherFavorite,
        orgName: orgName,
        orgCreditCode: orgCreditCode,
        userMessage: userMessage,
        passportNo: passportNo,
        passportImg: passportImg
      },
      success: function (dto) {
        submitMsgBox.close();
        if (dto != null) {
          if (dto.code == 0) {
            if ("SignupSuccess" == dto.message) {
              var buyerToken = dto.result.buyerToken;
              localStorage.setItem("buyerToken", buyerToken);
              //var url = "buyer-profile.html";
              //_mm.popUpMutiLangMsgBox("alert",_mm.convertMsg(dto.message), url);
              _this.showMutiBtnDialog(_mm.convertMsg(dto.message));
            }

            if ("AreadySignup" == dto.message) {
              var url = "";
              _mm.popUpMutiLangMsgBox("alert", _mm.convertMsg(dto.message), url);
            }
          } else {
            _mm.popUpWarn(_mm.convertMsg(dto.message));
          }
        }
      },
    });
  },

  loadMutiLang : function () {
    var prex = "buyer";
    var pageId = "register";
    var lang =  _mm.getLocalLang();
    //var lang = "fr";
    _mm.adaptMutiLang(prex, pageId, lang);
  },

  showMutiBtnDialog : function (msg) {
    var lang =  _mm.getLocalLang();
    var titleText = "";
    var btnContinue = "";
    var btnProfile = "";
    if ("en" == lang) {
      titleText = "Sign up success";
      btnContinue = "Continue";
      btnProfile = "User Profile";
    }
    if ("fr" == lang) {
      titleText = "Sign up success";
      btnContinue = "Continue";
      btnProfile = "User Profile";
    }
    if ("zh-cn" == lang) {
      titleText = "注册成功";
      btnContinue = "继续注册";
      btnProfile = "个人中心";
    }
    $(document).dialog({
      type: 'confirm',
      style: 'ios',
      titleText: titleText,
      content: msg,
      buttonStyle: 'stacked',  // side: 并排; stacked: 堆叠
      buttons: [
        {
          name: btnContinue,
          callback: function () {
            var url = "region1.html";
            _mm.goUrl(url);
          }
        },
        {
          name: btnProfile,
          callback: function () {
            //nextTime();
            var url = "buyer-profile.html";
            _mm.goUrl(url);
          }
        }
      ]
    });
  },
};


$(function () {
  page.init();
})	