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
  listParam : {
    page     : _mm.getUrlParam('page')     || 1,
    pageSize : _mm.getUrlParam('pageSize') || 10
  },
  init: function () {
    this.onLoad();
    this.bindEvent();
  },
  onLoad : function(){
    this.loadNews();
  },
  // 滚动加载
  loadNews: function () {
    var _this    = this,
      listHtml   = '',
      listParam  = _this.listParam,
      $footerLink = $('#footerLinkBtn'),
      $main      = $('#main'),
      $pageWrap  = document.createElement('div');

    $pageWrap.setAttribute('class', 'contentContainer');
    $pageWrap.innerHTML = '<div class="weui-loadmore"><i class="weui-loading"></i><span class="weui-loadmore__tips">正在加载</span></div>';

    _mock.getNewsMore(listParam, function (res) {
      _this.data = res;
      if(_this.data.data === null || _this.data.data === undefined || (_this.data.data instanceof String) || (typeof _this.data.data).toLowerCase() == 'string'){
        $footerLink.hide();
        $footerLink.siblings('.loadAll').show();
      }else{

        for(var i=0, len=_this.data.data.length; i<len; i++){
          var category = parseInt(_this.data.data[i]['category']);
          if(category === 0){
            _this.data.data[i]['tag'] = '<i class="fa fa-newspaper-o" aria-hidden="true"></i>&nbsp;&nbsp;新闻';
          }else if(category === 1){
            _this.data.data[i]['tag'] = '<i class="fa fa-handshake-o" aria-hidden="true"></i>&nbsp;&nbsp;活动';
          }else if(category === 2){
            _this.data.data[i]['tag'] = '<i class="fa fa-bullhorn" aria-hidden="true"></i>&nbsp;&nbsp;通知';
          }else if(category === 3){
            _this.data.data[i]['tag'] = '<i class="fa fa-university" aria-hidden="true"></i>&nbsp;&nbsp;政策';
          }
        }
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

/**
 * <i class="fa fa-university" aria-hidden="true"></i>&nbsp;&nbsp;政策
  <i class="fa fa-handshake-o" aria-hidden="true"></i>&nbsp;&nbsp;活动
  <i class="fa fa-newspaper-o" aria-hidden="true"></i>&nbsp;&nbsp;新闻
  <i class="fa fa-bullhorn" aria-hidden="true"></i>&nbsp;&nbsp;通知
 */