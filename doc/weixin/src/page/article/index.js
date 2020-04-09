'use strict';
require('node_modules/font-awesome/css/font-awesome.css');
require('page/common/index.css');
require('./index.css');
require('page/addition/nav/index.js');

var _mm           = require('util/common.js');
var _mock         = require('service/mock-service.js');
var templateIndex = require('./index.string');

var page = {
  data : {
    category : _mm.getUrlParam('category')   || "",
    item     : _mm.getUrlParam('item')   || "",
  },
  init: function () {
    this.onLoad();
    this.bindEvent();
  },
  onLoad: function () {
    var _this = this,
      listHtml = '',
      $pageWrap = $('#contentContainer');

    // $pageWrap.html('<div class="loading"></div>');

    _mock.getArticle(_this.data.category, _this.data.item, function (res) {
      _this.data.content = res.data;
      // console.log(res.data);

      // status=200, 但是内容为空
      if ((_this.data.content.title == null || _this.data.content.title == undefined || _this.data.content.title == '') && (_this.data.content.content == null || _this.data.content.content == undefined || _this.data.content.content == '')) {
        $pageWrap.html('<div><p style="text-align: center; padding-bottom: 100px; ">Sorry, this article might not exist or might not be accessible</p></div>');
        return;
      } else {
        // render数据
        listHtml = _mm.renderHtml(templateIndex, _this.data.content);
        $pageWrap.html(listHtml);
      }

    }, function (errMsg) {
      $('#contentContainer').html('<div><p style="text-align: center; padding-bottom: 100px; ">Sorry, this article might not exist or might not be accessible</p></div>')
    });
  },
  bindEvent : function(){
    
  }
};

$(function () {
  page.init();
});