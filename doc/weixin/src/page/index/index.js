'use strict';
require('node_modules/font-awesome/css/font-awesome.css');
require('page/common/index.css');
require('./index.css');

/**
 * 做滚动加载?
 * 还是固定加载若干条, 底部放个链接, 点击查看全部/更多
 */

var _mm           = require('util/common.js');
var _mock         = require('service/mock-service.js');
var templateIndex = require('./index.string');

var page = {
  data : {
    // listParam : { // 使用get方法 2020-03-17
    //   page      : _mm.getUrlParam('page')       || 1,    // 当前页数
    //   pageSize  : _mm.getUrlParam('pageSize')   || 4,
    // },
    listData : {}
  },
	init: function(){
    this.onLoad();
    this.bindEvent();
	},
	onLoad : function(){
    var _this = this;

    var _this       = this,
        listHtml    = '',
        $pageWrap   = $('#contentBody');

    // loading
    $pageWrap.html('<div class="weui-loadmore"><i class="weui-loading"></i><span class="weui-loadmore__tips">正在加载</span></div>');

    _mock.getList(function(res){
      // console.log('res', res);
      
      _this.data.listData = res.data;
      
      listHtml = _mm.renderHtml(templateIndex, _this.data.listData);
      $pageWrap.html(listHtml);

    }, function(errMsg){
      $pageWrap.html('<div class="loading"></div>');
      console.log(errMsg);
    });
  },
  bindEvent : function(){
    var _this = this;
  }
};

$(function(){
  page.init();
})