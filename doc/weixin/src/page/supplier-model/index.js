'use strict';
require('page/common/index.css');
require('page/common/modelglobal.css');
require('./index.css');

require('util/Chart.js');
require('page/addition/nav/index.js'); // 点击返回按钮
require('util/jquery.countup.min.js');
require('util/jquery.waypoints.min.js');

var _mm           = require('util/common.js');
var _mock         = require('service/mock-service.js');

var page = {
  init: function () {
    this.onLoad();
    this.bindEvent();
  },
  onLoad: function () {
    // 2020-03-21 暂时注释, 否则未登录, 跳转登录页
    // this.load();
  },
  bindEvent : function(){
    var _this = this;
    $(".JB").click(function() {
      _mm.goUrl("./supplier-fix-JB.html");
    });
    
    $(".JY").click(function() {
      _mm.goUrl("./supplier-fix-JY.html");
    });
    
    $(".GH").click(function() {
      _mm.goUrl("./supplier-fix-GH.html");
    });
    
    $(".ZN").click(function() {
      _mm.goUrl("./supplier-fix-ZN.html");
    });
    
    $(".PL").click(function() {
      _mm.goUrl("./supplier-fix-PL.html");
    });
    
    $(".RY").click(function() {
      _mm.goUrl("./supplier-fix-RY.html");
    });
  },
  load : function(){
    var _this = this;
    var token = _mm.getSupplierToken();
    var url="/WeiXin/weiXinSupplier/getModel.do";
    $.ajax({
      type: "post", // 用POST方式传输
      dataType: "json", // 数据格式:JSON
      url: url, // 目标地址
      data: {
        supplier_token:token
      },
      success: function(dto) {
        if(dto != null) {
          if(dto.code == 0) {
            
            _this.printChart(dto.result);
            
            $("#scoreJB").html(dto.result.scoreJB);
            $("#scoreJY").html(dto.result.scoreJY);
            $("#scoreGH").html(dto.result.scoreGH);
            $("#scoreRY").html(dto.result.scoreRY);
            $("#scorePL").html(dto.result.scorePL);
            $("#scoreZN").html(dto.result.scoreZN);
            
            $("#scoreJB").countUp();
            $("#scoreJY").countUp();
            $("#scoreGH").countUp();
            $("#scoreRY").countUp();
            $("#scorePL").countUp();
            $("#scoreZN").countUp();							
            
                          $("#percentJB").val(dto.result.percentJB);
                          $("#percentJY").val(dto.result.percentJY);
                          $("#percentGH").val(dto.result.percentGH);
                          $("#percentRY").val(dto.result.percentRY);
                          $("#percentPL").val(dto.result.percentPL);
                          $("#percentZN").val(dto.result.percentZN);
                          
                          $("#percentTextJB").html(dto.result.percentJB + '%');
                          $("#percentTextJY").html(dto.result.percentJY + '%');
                          $("#percentTextGH").html(dto.result.percentGH + '%');
                          $("#percentTextRY").html(dto.result.percentRY + '%');
                          $("#percentTextPL").html(dto.result.percentPL + '%');
                          $("#percentTextZN").html(dto.result.percentZN + '%');
                          
            $("#scoreTotal").html(dto.result.scoreTotal);
            $("#scoreTotal").countUp();
          } else {

          }
        }
      },
    });
  },
  printChart : function(score){
    var JB = score.scoreJB;
    var JY = score.scoreJY;
    var GH = score.scoreGH;
    var ZN = score.scoreZN;
    var PL = score.scorePL;
    var RY = score.scoreRY;
    var radarChartData = {
      labels: ["基本信息", "外贸经验", "供货能力", "质量认证", "生产场所", "人员情况"],
      datasets: [{
        fillColor: "rgba(220,220,220,0.5)",
        strokeColor: "rgba(220,220,220,1)",
        pointColor: "rgba(220,220,220,1)",
        pointStrokeColor: "#fff",
        data: [JB, JY, GH, ZN,PL, RY]
      }]	
    }

    var myRadar = new Chart(document.getElementById("canvas").getContext("2d")).Radar(radarChartData, {
      scaleShowLabels: false,
      pointLabelFontSize: 14
    });
  },
};
$(function(){
  page.init();
});