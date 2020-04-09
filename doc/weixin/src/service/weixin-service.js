'use strict';

var _mm = require('util/common.js');

var _weixin = {
  /**
   * 消息列表 
   * 目前没有调试成功 2020-03-17
   */
  getMsgList : function(formData, resolve, reject){
    _mm.request({
      url     : _mm.getServerUrl('/WeiXin/mutiLang/goodsCategory.do'),
      dataType: "JSON",
      data    : JSON.stringify(formData),
      method  : 'POST',
      success : resolve,
      error   : reject
    });
  }, 
};

module.exports = _weixin;