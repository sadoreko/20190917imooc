'use strict';
require('page/common/index.css');
require('page/common/form.css');
require('page/common/dialog.css');
require('./index.css');

require('page/addition/nav/index.js'); // 点击返回按钮
require('util/dialog.js');

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
		$("#btnSubmit").click(function(){
      if (_this.validate()){
        _this.save();
      }
    });
	},
	getSectionId : function (){
		return "supplyCapacity";			
	},
	
	getHref : function (){
		return "supplier-model.html";			
	},
	
	//初始化画面数据
	load : function () {
		var _this = this;
		var token = _mm.getSupplierToken();
		var url = "/WeiXin/weiXinSupplier/getSection.do";
		var sectionId = _this.getSectionId();
		$.ajax({
			type: "post", // 用POST方式传输
			dataType: "json", // 数据格式:JSON
			url: url, // 目标地址
			data: {
				supplier_token: token
				,sectionId:sectionId
			},
			success: function(dto) {
				if(dto != null) {
					if(dto.code == 0) {
						//alert(1);
						var rowCnt = 0;
						var html=[];
						$.each(dto.result.datalist, function(i, obj) {
							//alert(obj.monthMax);
							html.push('<div class="form-group"><label style="width: 100%;">产品名称: <b>' + obj.goodsName + '</b></label>   ');
							html.push('  <input type="hidden"  name="goodsName" value=' + obj.goodsName + ' > ');
							html.push('</div>                                                                           ');
							html.push('<div class="form-group"><label>供货能力</label>                                  ');
							html.push('    <input style="text-align: right;" placeholder="月最大供货能力"  name="monthMax" type="text" value=' + obj.monthMax + '><label>每月</label> ');
							html.push('</div>                                                                           ');
							html.push('<div class="form-group"><label>交货期</label>                                    ');
							html.push('    <input style="text-align: right;" placeholder="正常交货期" name="normalDeliveryPeriod" type="text" value=' + obj.normalDeliveryPeriod + ' ><label>个月</label>');
							html.push('</div>                                                                           ');
							html.push('<div class="form-group"><label>最短交货</label>                                  ');
							html.push('    <input style="text-align: right;" placeholder="紧急状况最短交货周期" name="minDeliveryPeriod" type="text" value=' + obj.minDeliveryPeriod + ' ><label>个月</label>  ');
							html.push('</div>                                                                           ');
							html.push('<div class="form-group">                                                         ');
							html.push('</div>                                                                           ');
							
							rowCnt++;
						});
						$("#frmD").append(html.join(''));
						$("#rowCnt").val(rowCnt);							
					} else {
					}
				}
			},
		});
	},

	validate : function () {
		var _this = this;
		var errCnt = 0;
		var emptyCnt = 0;
		$(':input[name="monthMax"]').each(function() {
			var value = $.trim($(this).val());
			if (value != ""){
				if (!_mm.isInteger(value)){
					_mm.popUpErrMsg("", "供货能力必须输入整数！");
					$(this).focus();
					errCnt++;
					return false;
				}					
			} else{
				emptyCnt++;
			}
		});
		
		if (errCnt > 0){
			return false;
		}
		
		$(':input[name="normalDeliveryPeriod"]').each(function() {
			var value = $.trim($(this).val());
			if (value != ""){
				if (!_mm.isNumber(value)){
					_mm.popUpErrMsg("", "正常交货期必须输入数字!!！");
					$(this).focus();
					errCnt++;
					return false;
				}					
			} else{
				emptyCnt++;
			}
		});	
		
		if (errCnt > 0){
			return false;
		}
		
		$(':input[name="minDeliveryPeriod"]').each(function() {
			var value = $.trim($(this).val());
			if (value != ""){
				if (!_mm.isNumber(value)){
					_mm.popUpErrMsg("", "最短交货周期必须输入数字！");
					$(this).focus();
					errCnt++;
					return false;
				}					
			} else{
				emptyCnt++;
			}
		});
		
		if (errCnt > 0){
			return false;
		}
		
		if (emptyCnt > 0){
			_mm.popUpErrMsg("", "请将信息补充完整再进行提交！");
			return false;
		}			
		
		return true;
	},

	//保存数据
	save : function () {
		var _this = this;
		//alert(2);
		var goodsNameArr = [];
		$(':input[name="goodsName"]').each(function() {
			goodsNameArr.push($(this).val());
		});
		
		//var goodsNmSize = goodsNameArr.length;
		var goodsNames = goodsNameArr.join(',');

		var monthMaxArr = [];
		$(':input[name="monthMax"]').each(function() {
			monthMaxArr.push($(this).val());
		});
		//var monthMaxSize = monthMaxArr.length;
		var monthMaxs = monthMaxArr.join(',');

		var normalDeliveryPeriodArr = [];
		$(':input[name="normalDeliveryPeriod"]').each(function() {
			normalDeliveryPeriodArr.push($(this).val());
		});
		//var normalDeliveryPeriodSize = normalDeliveryPeriodArr.length;
		var normalDeliveryPeriods = normalDeliveryPeriodArr.join(',');

		var minDeliveryPeriodArr = [];
		$(':input[name="minDeliveryPeriod"]').each(function() {
			minDeliveryPeriodArr.push($(this).val());
		});
		//var minDeliveryPeriodSize = minDeliveryPeriodArr.length;
		var minDeliveryPeriods = minDeliveryPeriodArr.join(',');


		/*var allSize = parseInt(monthMaxSize) + parseInt(normalDeliveryPeriodSize) + parseInt(minDeliveryPeriodSize);
		var unitSize = parseInt(goodsNmSize);
		alert(allSize);
		if (allSize % unitSize > 0){
			popUpErrMsg("", "请将信息补充完整再进行提交！");
			return false;
		}*/
		
		//var supplierId = localStorage.getItem("supplierId");
		var token = _mm.getSupplierToken();
		var url="/WeiXin/weiXinSupplier/saveSection.do";
		var sectionId = _this.getSectionId();
		$.ajax({
			type: "post", // 用POST方式传输
			dataType: "json", // 数据格式:JSON
			url: url, // 目标地址
			data: {
				supplier_token:token,
				sectionId:sectionId,
				goodsNames: goodsNames,
				monthMaxs: monthMaxs,
				normalDeliveryPeriods: normalDeliveryPeriods,
				minDeliveryPeriods: minDeliveryPeriods
			},
			success: function(dto) {
				if(dto != null) {
					if(dto.code == 0) {
						var url=_this.getHref();
						_mm.popUpAlert(dto.message,url);
					} else {
						_mm.popUpWarn(dto.message);
					}
				}
			},
		});	

	}

};

$(function(){
  page.init();
});
