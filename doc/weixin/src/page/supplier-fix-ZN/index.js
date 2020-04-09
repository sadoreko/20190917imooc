'use strict';
require('page/common/index.css');
require('page/common/form.css');
require('page/common/dialog.css');
require('./index.css');

require('page/addition/nav/index.js'); // 点击返回按钮
require('util/dialog.js');

var _mm = require('util/common.js');
var _mock = require('service/mock-service.js');

var page = {
  init: function () {
    this.onLoad();
    this.bindEvent();
  },
  onLoad: function () {
    var _this = this;
    this.getWeixinConfig();

    //画面加载数据
    // 2020-03-21 暂时注释, 否则未登录, 跳转登录页
    // this.load();

  },
  bindEvent: function () {
    var _this = this;

    //绑定提交事件
    $("#btnSubmit").click(function(){
      if (_this.validate()){
        _this.save();
      }
    });

    //上传图片
    $("#homeImageUrlsUpd").click(function () {
      var trigger = "homeImageUrls";
      _this.uploadImageMuti(trigger);
    });

    //上传图片
    $("#internationalImageUrlsUpd").click(function () {
      // alert(3);
      var trigger = "internationalImageUrls";
      _this.uploadImageMuti(trigger);
    });
  },
  getWeixinConfig : function() {
    //初始化微信配置
    var authorizationUrl = window.location.href;
    $.ajax({
      url: "/WeiXin/util/getWXConfig.do",//请求地址
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
            _mm.callDialog(dto.message);
          }
        }
      },
    });
  },
  /*上传图片*/
  uploadImageMuti: function (trigger) {
    var _this = this;
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
                html = '<div class="picitem" style="display: none;"><img src=' + res.localData + '></div>';
                $("#" + trigger + "View").append(html);
              },
              fail: function (res) {
                console.log(res);
              }
            });
          } else {
            html = '<div class="picitem" style="display: none;"><img src=' + localIds[i] + '></div>';
            $("#" + trigger + "View").append(html);
          }
        }

        _this.syncUpload(localIds, list, trigger);
      }
    });
  },
  getSectionId : function () {
    return "certification";
  },
  syncUpload : function (localIds, list, trigger) {
    //var list=[];
    var localId = localIds.pop();
    wx.uploadImage({
      localId: localId.toString(), // 需要上传的图片的本地ID，由chooseImage接口获得
      isShowProgressTips: 1, // 默认为1，显示进度提示
      success: function (res) {
        //res.serverId 返回图片的服务器端ID
        list.push(res.serverId);
        //alert(JSON.stringify(list))
        var uploadNum = list.length;
        var htmltext = "已上传" + uploadNum + "张";
        $("#" + trigger + "Text").html(htmltext);
        if (localIds.length > 0) {
          window.setTimeout(function () {
            syncUpload(localIds, list, trigger);
          }, 100);
        } else {
          /*window.setTimeout(function () {
            mediaIds=list.join(',');
          }, 100);*/
          $("#" + trigger + "View").children(".picitem").show();
          var mediaIds = list.join(',');
          //alert(mediaIds);
          $("#" + trigger).val(mediaIds);
        }
      }
    })
  },
  fillImgView : function (list, trigger) {
    var html = [];
    $.each(list, function (i, obj) {
      html.push('<div class="picitem"><img class="sigleitem" src=' + obj.imgSrc + '></div>');
    });
    $("#" + trigger + "View").append(html.join(''));
  },
  
  isUpLoaded : function () {
    var homeImageUrlsCnt = $('#homeImageUrlsCnt').val();
    var internationalImageUrlsCnt = $('#internationalImageUrlsCnt').val();
  
    var homeImageUrls = $('#homeImageUrls').val();
    var internationalImageUrls = $('#internationalImageUrls').val();
  
    if (homeImageUrls != "") {
      if (homeImageUrlsCnt != "") {
        return true;
      }
    }
  
    if (internationalImageUrls != "") {
      if (internationalImageUrlsCnt != "") {
        return true;
      }
    }
  
    return false;
  },
  
  switchUpload : function (item, uploadedflg, vitifyflg) {
    if (uploadedflg) {
      $("#" + item + "Upd").hide();
      $("#" + item + "View").show();
      $("#" + item + "Text").show();
      $("#" + item + "Del").show();
      if (vitifyflg) {
        $("#" + item + "Ret").show();
      } else {
        $("#" + item + "Ret").hide();
      }
    } else {
      $("#" + item).val("");
      $("#" + item + "Upd").show();
      $("#" + item + "View").children(".picitem").remove();
      $("#" + item + "View").hide();
      $("#" + item + "Text").html("最多上传8张");
      $("#" + item + "Text").hide();
      $("#" + item + "Del").hide();
      $("#" + item + "Ret").hide();
    }
  },
  
  //初始化画面数据
  load : function () {
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
        , sectionId: sectionId
      },
      success: function (dto) {
        if (dto != null) {
          if (dto.code == 0) {
            var homeImageUrlsCnt = dto.result.homeImageUrlsCnt;
            $("#homeImageUrlsCnt").val(homeImageUrlsCnt);
  
            var homeImageUrlsStatus = dto.result.homeImageUrlsStatus;
            $("#homeImageUrlsStatus").val(homeImageUrlsStatus);
  
            var list = dto.result.homeImageUrlList;
            var trigger = "homeImageUrls";
            if (homeImageUrlsCnt != "") {
              var vitifyflg = false;
              if (homeImageUrlsStatus != "") {
                vitifyflg = true;
              }
              _this.switchUpload(trigger, true, vitifyflg);
              fillImgView(list, trigger);
  
              $("#" + trigger + "Text").html("已上传" + homeImageUrlsCnt + "张");
            } else {
              _this.switchUpload(trigger, false, false);
            }
  
            var internationalImageUrlsCnt = dto.result.internationalImageUrlsCnt;
            $("#internationalImageUrlsCnt").val(internationalImageUrlsCnt);
  
            var internationalImageUrlsStatus = dto.result.internationalImageUrlsStatus;
            $("#internationalImageUrlsStatus").val(internationalImageUrlsStatus);
  
            var list = dto.result.internationalImageUrlList;
            var trigger = "internationalImageUrlsView";
            if (internationalImageUrlsCnt != "") {
              var vitifyflg = false;
              if (internationalImageUrlsStatus != "") {
                vitifyflg = true;
              }
              _this.switchUpload(trigger, true, vitifyflg);
              fillImgView(list, trigger);
  
              $("#" + trigger + "Text").html("已上传" + internationalImageUrlsCnt + "张");
            } else {
              _this.switchUpload(trigger, false, false);
            }
          } else {
  
          }
        }
      },
    });
  },
  
  validate : function () {
    return true;
  },
  
  //保存数据
  save : function () {
    var _this = this;
    if (this.isUpLoaded()) {
      $(document).dialog({
        type: 'confirm',
        content: '重新上传将影响上次审核的结果，您确定要重新上传资质认证的图片吗？',
        onClickConfirmBtn: function () {
  
          var homeImageUrls = $('#homeImageUrls').val();
          var internationalImageUrls = $('#internationalImageUrls').val();
  
          //var supplierId=localStorage.getItem("supplierId");
          var token = getSupplierToken();
          var url = "/WeiXin/weiXinSupplier/saveSection.do";
          var sectionId = _this.getSectionId();
          $.ajax({
            type: "post", // 用POST方式传输
            dataType: "json", // 数据格式:JSON
            url: url, // 目标地址
            data: {
              supplier_token: token,
              sectionId: sectionId,
              homeImageUrls: homeImageUrls,
              internationalImageUrls: internationalImageUrls
            },
            success: function (dto) {
              if (dto != null) {
                if (dto.code == 0) {
                  var url = getHref();
                  _mm.popUpAlert(dto.message, url);
                } else {
                  _mm.popUpWarn(dto.message);
                }
              }
            },
          });
  
        },
        onClickCancelBtn: function () {
          //return false;
        }
      });
    }
  }
};

$(function () {
  page.init();
});


