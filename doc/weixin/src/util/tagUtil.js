'use strict';
var _tagUtil = {
	getRadioTagVal : function (tagNm){
		var selector = '[name="'+tagNm+'"]';
		var ret = "";
		$(selector).each(function(i,elemt){
			if ($(this).hasClass("active")){
				ret= $(this).attr("data");
			}			   
		});	
		return ret;
	},
	
	bindRadioTag : function (tagNm){
		var _this = this;
		var selector = '[name="'+tagNm+'"]';
		$(selector).each(function(i,elemt){
				$(this).click(function(){
					_this.resetRadioActive(tagNm);
				$(this).addClass("active");
				});
		})			
	},
	
	/* 单选 复选 标签框*/
	bindCheckboxTag : function (tagNm){
		var selector = '[name="'+tagNm+'"]';
		$(selector).each(function(i,elemt){
				$(this).click(function(){
				if ($(this).hasClass("active")){
					$(this).removeClass("active");
				} else {
					$(this).addClass("active");
				}
				});
		})			
	},
	
	resetRadioActive : function (tagNm){
		var selector = '[name="'+tagNm+'"]';
		$(selector).each(function(i,elemt){
				$(this).removeClass("active");
		})			
	}
};

module.exports = _tagUtil;