function resetMsgTips(){
	var selector = '[name="msg_tip"]';
	$(selector).each(function(i,elemt){
		$(this).hidden();
	});
}

/**
 * 
 */
function validateForm(){
	//TODO
	resetMsgTips();
}

function validatePage(PageNo) {
	resetMsgTips();
	var errCnt = 0;
	var selector = '[pageNo="+PageNo+"]';
	$(selector).each(function(i,elemt){
		var validKey = $(this).attr("validKey");
		var objId = $(this).attr("id");
		var msgId = "#errMsg_"+objId;
		var fmtId = "#fmtMsg_"+objId;
		var value = $.trim($(this).val());
		if (validKey){
			var arr = validKey.split(",");
			for(var i=0; i < arr.length; i++){
				var key = arr[i];
				
				if("required" == key){
					if(value == ""){
						$(msgId).show();
						errCnt++;
						return false;						
					}
				}
				
				if("email" == key){
					if(!isEmail(value)){
						$(fmtId).show();
						errCnt++;
						return false;						
					}
				}
				
				if("number" == key){
					if(!isNumber(value)){
						$(fmtId).show();
						errCnt++;
						return false;						
					}
				}				
			}
		}
	});
	
	if (errCnt > 0){
		return false;
	} else {
		return true;
	}
}

function validRequired(validKey) {
	if (validKey.indexOf("required") >= 0){
		return true;
	} else {
		return false;
	}
}

