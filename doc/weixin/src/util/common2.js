function GetQueryString(name){
 var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
 var r = window.location.search.substr(1).match(reg);
 if(r!=null)return  unescape(r[2]); return null;
}



function goUrl(url){
	window.location.href=url;
}

//回到顶部
function scrollToTop(){
	$('html,body').animate({scrollTop: '0px'}, 10);
	return false;    
}







function popUpConfirm(text,url){
	$(document).dialog({
		type : 'confirm',
		content:text,
        onClickConfirmBtn: function(){
        	goUrl(url);
        }					
	});	
}

function bindBack(url){
	$("#btnBack").click(function(){
		var text = "返回后将不保存您已经修改的数据！<br>您确定要离开该页面吗？";
		popUpConfirm(text,url);				
	})	
}

function bindBackNoWarnMsg(url){
	$("#btnBackNoWarnMsg").click(function(){
		goUrl(url);				
	})	
}





function fieldValue(tagNm){
	var tmp = $("#"+tagNm).val();
	return $.trim(tmp);
}



