'use strict';
require('node_modules/font-awesome/css/font-awesome.css');
require('page/common/index.css');
require('./index.css');
require('page/addition/nav/index.js');

var _mm           = require('util/common.js');
var _mock         = require('service/mock-service.js');
var templateIndex = require('./index.string');

var page = {
  data : {},
  formData : {
    "tab": "0"
  },
  init: function () {
    this.onLoad();
    this.bindEvent();
  },
  onLoad: function () {
    this.loadMsgList();
  },
  loadMsgList: function () {
    var _this   = this,
      listHtml  = '',
      $pageWrap = $('#msgBody'),
      formData  = _this.formData;
    $pageWrap.innerHTML = '<div class="weui-loadmore"><i class="weui-loading"></i><span class="weui-loadmore__tips">正在加载</span></div>';

    _mock.getMsgList(formData, function (res) {
      _this.data = res;
      console.log(res.data);

        // render数据
        listHtml = _mm.renderHtml(templateIndex, _this.data);
        $pageWrap.html(listHtml);

        $('.msgNotread[data-state="false"]').each(function(){
          $(this).addClass('active');
        });

    }, function (errMsg) {
      console.log(errMsg);
    });
  },
  bindEvent : function(){
    var _this = this;
    // 点击不同的tab标签
    $('.navBtn').on('click', function(){
      let $this = $(this);
      if($this.hasClass('active')){ return; }
      $this.addClass('active');
      $this.siblings().removeClass('active');
      _this.formData.tab = $(this).data('tab');
      console.log(_this.formData.tab);
      _this.loadMsgList();
    });
  }
};

$(function () {
  page.init();
});