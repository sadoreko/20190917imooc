'use strict';
require('node_modules/font-awesome/css/font-awesome.css');
require('page/common/index.css');
require('./index.css');
require('page/addition/search/index.js');
require('page/addition/loadMore/index.js');

var _mm           = require('util/common.js');
var _mock         = require('service/mock-service.js');
var templateIndex = require('./index.string');

var page = {
  data : {},
  category   : parseInt(_mm.getUrlParam('category')) || 0,
  listParam  : {
    page     : _mm.getUrlParam('page')     || 1,
    pageSize : _mm.getUrlParam('pageSize') || 10
  },
  init: function () {
    this.onLoad();
    this.bindEvent();
  },
  onLoad : function(){
    var _this = this;
    var $head = $('#newsTabHeader');
    if(_this.category === 0){ $head.text('热点新闻'); }
    else if(_this.category === 1){ $head.text('商家活动'); } 
    else if(_this.category === 2){ $head.text('公告通知'); } 
    else if(_this.category === 3){ $head.text('海关政策'); } 

    _this.loadNews();
  },
  // 滚动加载
  loadNews: function () {
    var _this    = this,
      listHtml   = '',
      category   = _this.category,
      listParam  = _this.listParam,
      $footerLink = $('#footerLinkBtn'),
      $main      = $('#main'),
      $pageWrap  = document.createElement('div');

    $pageWrap.setAttribute('class', 'contentContainer');
    $pageWrap.innerHTML = '<div class="weui-loadmore"><i class="weui-loading"></i><span class="weui-loadmore__tips">正在加载</span></div>';

    _mock.getTabNews(category, listParam, function (res) {
      _this.data = res;
      // 如果返回的data里面没有内容, 隐藏底部“点击加载更多”
      if(_this.data.data === null || _this.data.data === undefined || (_this.data.data instanceof String) || (typeof _this.data.data).toLowerCase() == 'string'){
        $footerLink.hide();
        $footerLink.siblings('.loadAll').show();
      }else{
        // render数据
        listHtml = _mm.renderHtml(templateIndex, _this.data);
        $pageWrap.innerHTML = listHtml; 
        $main.append($pageWrap);
      }

    }, function (errMsg) {
      $main.append($pageWrap);
      console.log(errMsg);
    });
  },
  bindEvent : function(){
    var _this = this;

    $('#backLink').click(function(){
      window.history.go(-1);
    });

    $('#footerLinkBtn').click(function(){
      _this.listParam.page += 1;
      _this.loadNews();
    });
  }
};

$(function () {
  page.init();
});