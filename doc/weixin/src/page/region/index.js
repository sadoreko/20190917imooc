'use strict';
require('page/common/index.css');
require('page/common/classify.css');
require('page/common/nav.css');
require('page/common/modelglobal.css');
require('page/common/chosepro_list.css');
require('page/common/dialog.css');
require('./index.css');

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
    if (_mm.isExsitBuyerToken()) {
      //goUrl("buyer-profile.html");
      //goUrl("index.html");
      //return;
    }
    _mm.setLocalLang("");
    _this.defaultLoad();  
  },
  bindEvent: function () {
    /**
     * 绑定画面事件
     */
    var _this = this;
    
    //选择商品 确认按钮
    /*  $("#away").click(function(){
          //初始化面板
          _this.switchPage("home");			
        })*/

    //选择商品 确认按钮
    $("#goSetting").click(function () {
      //初始化面板
      _this.switchPage("language");
    })

    $("#backSetting").click(function () {
      //初始化面板
      _this.switchPage("popSetting");
    })

    $(".languageItem").click(function () {
      var data = $(this).attr("data");
      _mm.setLocalLang(data);

      var langText = $(this).attr("langText");

      $("#localLang").html(langText);
      //初始化面板
      _this.switchPage("popSetting");
    })

    $('[name="keyitem"]').each(function (i, elemt) {
      var $this = $(this);
      $this.click(function () {
        var data = $this.attr("data");
        $this.addClass("active");
        _this.resetLeftMenu();
        _this.fillRight(data);
      });
    })


    /*		$('[name="boxRegion"]').each(function(i,elemt){
            $(this).click(function(){
                _this.resetRight();	
            $(this).removeClass("nospanChecked");
            $(this).addClass("spanChecked");
            });
        })
        */

    $("#btnSetting").click(function () {
      _this.switchPage("home");

      _this.homeDefault();
      //多语言适配
      _this.loadMutiLang();
    })

    $("#btnNext").click(function () {
      var nation = $("#hidNation").val();
      if (nation == "") {
        var msgKey = "witoutNation";
        var url = "";
        //alert(convertMsg(msgKey));
        _mm.popUpMutiLangMsgBox("alert", convertMsg(msgKey), url);
      } else {
        _mm.setNation(nation);
        _mm.goUrl("buyer-register.html");
      }
    })
  },
  homeDefault: function () {
    this.resetLeftMenu();
    $('[name="keyitem"]').eq(0).addClass("active");
    this.fillRight('a');
  },

  resetLeftMenu: function () {
    $('[name="keyitem"]').each(function (i, elemt) {
      $(this).removeClass("active");
    })
  },

  resetRight: function () {
    $('[name="boxRegion"]').each(function (i, elemt) {
      var $this = $(this);
      $this.removeClass("spanChecked");
      if (!$this.hasClass("nospanChecked")) {
        $this.addClass("nospanChecked");
      }
    })
  },

  fillRight: function (firstChar) {
    var _this = this;
    var url = "/WeiXin/mutiLang/region.do";
    var lang = _mm.getLocalLang();
    //alert(1);
    $.ajax({
      type: "post", // 用POST方式传输
      dataType: "json", // 数据格式:JSON
      url: url, // 目标地址
      async: false,//是否异步请求
      data: {
        firstChar: firstChar,
        lang: lang
      },
      success: function (dto) {
        if (dto != null) {
          if (dto.code == 0) {
            //alert(2);
            var html = [];
            var cntItem = 0;
            $.each(dto.result.datalist, function (i, obj) {
              var data = obj.key;
              var regionNm = obj.value;
              html.push('<div class="pro" style="padding:7px 7px 6px 6px;">   ');
              html.push('   <p name="boxRegion" data=' + data + ' class="nospanChecked">' + regionNm + '</p>');
              html.push('</div>');

              cntItem++;
            });

            var leftCnt = cntItem % 3;
            var fillCnt = 3 - leftCnt;
            if (fillCnt > 0) {
              for (var j = 0; j < fillCnt; j++) {
                html.push('<div class="pro" style="padding:7px 7px 6px 6px;">');
                html.push('</div>');
              }
            }

            $(".classify_pro_list").empty();
            $(".classify_pro_list").append(html.join(''));

            $('[name="boxRegion"]').each(function (i, elemt) {
              var $this = $(this);
              $this.click(function () {
                _this.resetRight();

                $this.removeClass("nospanChecked");
                $this.addClass("spanChecked");

                var data = $this.attr("data");
                $("#hidNation").val(data);
              });
            })
          } else {
            _mm.popUpWarn(_mm.convertMsg(dto.message));
          }
        }
      },
    });
  },
  /**
   * 切换画面各个面板
   * page: Home-主面板, Category-商品分类面板,Goods-商品选择面板
   */
  switchPage: function (page) {
    //alert(page);
    var arr = ["home", "popSetting", "language"];
    for (var i = 0; i < 3; i++) {
      var sectionId = arr[i];
      if (page == arr[i]) {
        $("#" + sectionId).show();
        //画面回顶部
        _mm.scrollToTop();
      } else {
        $("#" + sectionId).hide();
      }
    }
  },

  defaultLoad : function () {
    var _this = this;
    var lang = _mm.getLocalLang();
    //alert(lang);
    if (lang == "") {
      _mm.setLocalLang("en");
      //初始化面板
      _this.switchPage("popSetting");
    } else {
      //初始化面板
      _this.switchPage("home");
  
      _this.homeDefault();
      //多语言适配
      _this.loadMutiLang();
    }
  },
  
  loadMutiLang : function () {
    var prex = "region";
    var pageId = "region";
    var lang = _mm.getLocalLang();
    _mm.adaptMutiLang(prex, pageId, lang);
  }
};

$(function () {
  page.init();
})	