'use strict';

var _mm = require('util/common.js');
require('mock/mockInfo.js');

var _mock = {
  // article.html 文章详情
  getArticle : function(category, id, resolve, reject){
    _mm.request({
      url     : _mm.getServerUrl('/supplier/information/detail?categoryId=' +category+ '&itemId=' +id),
      success : resolve,
      error   : reject
    });
  },
  // 首页 资讯列表
  getList : function(resolve, reject){
    _mm.request({
      url     : _mm.getServerUrl('weixin/indexNewsList'),
      method  : 'GET',
      success : resolve,
      error   : reject
    });
  },
  // 首页 点击更多 跳转到newsMore.html
  getNewsMore : function(listParam, resolve, reject){
    _mm.request({
      url     : _mm.getServerUrl('weixin/newsMore'),
      data    : JSON.stringify(listParam),
      method  : 'POST',
      success : resolve,
      error   : reject
    });
  },
  // 微信底部菜单 行业资讯下的4个tab页
  getTabNews : function(category, listParam, resolve, reject){
    _mm.request({
      url     : _mm.getServerUrl('/weixin/tabNews/category=' + category),
      data    : JSON.stringify(listParam),
      method  : 'POST',
      success : resolve,
      error   : reject
    });
  }, 
  // 客服 消息列表
  getMsgList : function(listParam, resolve, reject){
    _mm.request({
      url     : _mm.getServerUrl('/weixin/msgList'),
      data    : JSON.stringify(listParam),
      method  : 'POST',
      success : resolve,
      error   : reject
    });
  }, 
  // 客服 消息详情
  getMsgDetail : function(listParam, resolve, reject){
    _mm.request({
      url     : _mm.getServerUrl('/weixin/msgDetail'),
      data    : JSON.stringify(listParam),
      method  : 'POST',
      success : resolve,
      error   : reject
    });
  },
  // 客服 回复消息
  sendMsg : function(listParam, resolve, reject){
    _mm.request({
      url     : _mm.getServerUrl('/weixin/sendMsg'),
      data    : JSON.stringify(listParam),
      method  : 'POST',
      success : resolve,
      error   : reject
    });
  },

  // 检索文章
  getSearchResult : function(text, resolve, reject){
    _mm.request({
      url     : _mm.getServerUrl('/weixin/search'),
      data    : JSON.stringify({ "text" : text }),
      method  : 'POST',
      success : resolve,
      error   : reject
    });
  },

  // 登录
  userlogin : function(formData, resolve, reject){
    _mm.request({
      url     : _mm.getServerUrl('/weixin/login'),
      data    : JSON.stringify(formData),
      method  : 'POST',
      success : resolve,
      error   : reject
    });
  },
  // 退出
  userlogout : function(resolve, reject){
    _mm.request({
      url     : _mm.getServerUrl('/weixin/logout'),
      data    : null,
      method  : 'POST',
      success : resolve,
      error   : reject
    });
  },
};

module.exports = _mock;