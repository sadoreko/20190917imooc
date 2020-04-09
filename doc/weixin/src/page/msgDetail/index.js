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
  },
  listParam : {
    id : _mm.getUrlParam('id')   || "",
  },
	init: function(){
    this.onLoad();
    this.bindEvent();
	},
	onLoad : function(){
    var _this = this,
        from  = _mm.getUrlParam('from') || "";
    $('#headerTitle').html(from);
    _this.loadMsg();
  },
  bindEvent : function(){
    var _this = this;
    $('#sendMsgBtn').click(function(){
      _this.sendMsg();
    });
  },
  loadMsg : function(){
    var _this   = this,
        listParam   = _this.listParam,
        listHtml    = '',
        $pageWrap   = $('#speakBox');
    
    $pageWrap.innerHTML = '<div class="weui-loadmore"><i class="weui-loading"></i><span class="weui-loadmore__tips">正在加载</span></div>';

    _mock.getMsgDetail(listParam, function(res){
      // console.log(res);
      
      _this.data = res.data;

      _this.data.rows.forEach(function(ele){
        var s = parseInt(ele.side);
        if(s === 0){
          ele['leftSide'] = true;
        }else if(s === 1){
          ele['rightSide'] = true;
        }
      });
      // render数据
      listHtml = _mm.renderHtml(templateIndex, _this.data);
      $pageWrap.html(listHtml);
    }, function(errMsg){
      console.log(errMsg);
    });
  },
  sendMsg : function(){
    /**
     * 1.新建div, 2.添加属性、填充内容, 3.添加到$container里
     */
    var _this   = this,
    $speakBox  = $('#speakBox'),
    sendHeader  = $('.question .heard_img img').attr('src'),
    text        = $('.write_box input').val(),
    listParam   = {
      "content" : text
    };

    if (text == '') {
      // alert('请输入提问！');
      $('.saying').show();
      $('.write_box input').focus();
      setTimeout(function(){
        $('.saying').hide();
      }, 1000);
      return;
    }

    var str = '<div class="question">';
    str += '<div class="heard_img right"><img src="' + sendHeader + '"/></div>';
    str += '<div class="question_text clear"><p>' + text + '</p><i></i>';
    str += '</div></div>';

    _mock.sendMsg(listParam, function(res){
      $speakBox.append(str);
      $('.write_box input').val('');
      $('.write_box input').focus();
      _this.autoWidth();
      _this.for_bottom();

    }, function(errMsg){

    });
  },
  for_bottom : function() {
    var speak_height = $('.speak_box').height();
    $('.speak_box,.speak_window').animate({ scrollTop: speak_height }, 500);
  },
  autoWidth : function() {
    $('.question_text').css('max-width', $('.question').width() - 60);
  }
};

$(function(){
  page.init();
});