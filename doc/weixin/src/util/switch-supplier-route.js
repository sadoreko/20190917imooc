/*
 *	工商认证确认框
 * 	-现在认证
 * 	-下次再说
 * 	-不再提醒
 */
function showLicenseDialog(msg){
    $(document).dialog({
        type : 'confirm',
        style: 'ios',
        titleText: '工商认证',
        content: msg,
        buttonStyle: 'stacked',  // side: 并排; stacked: 堆叠
        buttons: [
            { 	
            	name: '现在认证',
                callback: function() {
                    goNow();
                }	            
            },
            { 
            	name: '下次再说',
                callback: function() {
                    nextTime();
                }	            	
            },
            {  
            	name: '不再提醒',
                callback: function() {
                    noRemindRemote();
                }	            
            }
        ]
    });		
}

function routeProfile(){
	//alert(1);
	var postUrl = "../WeiXin/weiXinSupplier/routeLicense.do";
	var token = getToken();
	$.ajax({
		type: "post", // 用POST方式传输
		dataType: "json", // 数据格式:JSON
		url: postUrl, // 目标地址
		data:{supplier_token:token},
		success: function(dto) {
			if(dto != null) {
				if(dto.code == 0) {
					var isCall = 0;
					var licenseImageUrl=dto.result.licenseImageUrl;
					var licenseAduit=dto.result.licenseAduit;
					var noRemind = dto.result.licenseNoRemind;
					var msg = "";
					
					if (noRemind == "1"){
						isCall = 0;
					} else{
						//上传了 未通过 建议再上传
						if (licenseImageUrl == ""){
							isCall = 1;
							msg='为了给您提供更便捷的服务,温馨提醒您<br>请提交营业执照进行工商认证!';
						} else {
							if (licenseAduit == "2"){
								isCall = 1;
								msg='很抱歉通知您，您提交的营业执照照片<br>没有通过审核，请您再次上传进行认证!';
							}							
						}							
					}

					if(isCall == 1){
						showDialog(msg);
					} else {
						var url = "supplier-profile.html";
						goUrl(url);
					}
				} else {
					goUrl("supplier-login.html");
				}
			}
		},
	});	
}

function routeIndex () {
	//TODO	
}

//function routePage () {
//	
//}

/**
 * 
 */
function switchRoute(){
	if(isHasToken()){
		//token过期，去登录页面
		if (isExpireToken()){
			goUrl("supplier-login.html");
			return;
		}
		//token可用
		if (isCertifyNomind()){
			goUrl("supplier-profile.html");
			return;
		} else {
			routeProfile();				
		}

	} else {
		//没有注册或主动退出登录的情况
		//goUrl("switch-register.html");
	}
}

function isHasToken(){
	var token = getToken();
	if (token==null){
		return false;
	} else {
		return true;
	}
}

/**
 * token是否已经过期
 * token包含上次登录时间
 */
function isExpireToken(){
	//TODO 检测token是否已经过期
	return false;
}

function isCertifyNomind() {
	var certifyNomind =localStorage.getItem("certifyNomind");
	if (certifyNomind =="1"){
		return true;
	} else {
		return false;
	}
}

function goNow(){
	goUrl("supplier-certify.html");
}

function nextTime(){
	goUrl("supplier-profile.html");
}
	
function noRemindRemote(){
	var postUrl = "../WeiXin/weiXinSupplier/licenseNoRemind.do";
	var token = getToken();
	$.ajax({
		type: "post", // 用POST方式传输
		dataType: "json", // 数据格式:JSON
		url: postUrl, // 目标地址
		data:{supplier_token:token},
		success: function(dto) {
			if(dto != null) {
				localStorage.setItem("certifyNomind","1");
				goUrl("supplier-profile.html");
			}
		},
	});		
}
	
function getToken(){
	return localStorage.getItem("supplierToken");
}
