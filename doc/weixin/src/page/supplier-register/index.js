'use strict';

require('page/common/style.css');
require('util/jquery-labelauty.css');
// require('util/ydui.css?rev=@@hash'); 如果不用ydui, 就不用这个css
require('page/common/demo.css');
require('page/common/dialog.css');
require('./index.css');

require('util/common.js');
require('util/datePicker.js');
require('util/dialog.js');
require('util/switch-supplier-route.js');
require('util/tagUtil.js');
require('util/jquery-labelauty.js');

var _mm = require('util/common.js');

var page = {
  init: function () {
    this.onLoad();
    this.bindEvent();
  },
  loadInfo: function () {
    // 默认数据
    var area = document.getElementById("exportCountries");
    area.options.length = 0;
    result = {
      "1": "安道尔",
      "2": "阿拉伯联合酋长国",
      "3": "阿富汗",
      "4": "安提瓜和巴布达",
      "5": "阿尔巴尼亚",
      "6": "安圭拉",
      "7": "亚美尼亚",
      "8": "安哥拉",
      "9": "阿根廷",
      "10": "奥地利",
      "11": "澳大利亚",
      "12": "津巴布韦"
    };
    for (var item in result) {
      area.options.add(new Option(result[item], result[item]));
    }

    $('.selectpicker').selectpicker('refresh');
  },
  initInfo: function () {
    $('.selectpicker').selectpicker({
      noneSelectedText: '请选择',
      noneResultsText: '没有找到匹配的国家 {0}'
    });

    this.loadInfo();
  },
  /*弹窗*/
  callDialog: function (infoTextValue, goFlag) {
    var titleText = "";
    var buttonTextConfirm = "";
    titleText = "提示";
    buttonTextConfirm = "确定";

    $(document).dialog({
      type: 'alert',
      titleText: titleText,
      buttonTextConfirm: buttonTextConfirm,
      content: infoTextValue,
      onClickConfirmBtn: function () {
        if (goFlag) {
          //window.location.href="event.html";
        }
      }
    });
  },
  resetErrMsg: function () {
    $("#errMsgOrgNameZh").hide();
    $("#errMsgEmail").hide();
    $("#errMsgEmailFormat").hide();
    $("#errMsgLoginPassword").hide();
    $("#errMsgCorporation").hide();
    $("#errMsgContact").hide();
    $("#errMsgContactTel").hide();
    $("#errMsgAddress").hide();
    $("#errMsgPolice").hide();
    $("#errMsgMainProducts").hide();
  },
  validate: function () {
    var _this = this;
    //return true;
    var orgNameZh = $('#orgNameZh').val();
    var corporation = $('#corporation').val();
    var contact = $('#contact').val();
    var contactTel = $('#contactTel').val();
    var picker = $('#picker').val();
    var police = $('#police').val();
    var loginAccount = $('#loginAccount').val();
    var loginPassword = $('#loginPassword').val();

    var mainProductsArr = [];
    $(':checkbox[name="mainProducts"]:checked').each(function () {
      mainProductsArr.push($(this).val());
    });

    var otherMainProduct = $('#otherMainProduct').val();
    mainProductsArr.push(otherMainProduct);
    var mainProducts = mainProductsArr.join(',');

    _this.resetErrMsg();

    if (orgNameZh == "") {
      $("#orgNameZh").focus();
      $("#errMsgOrgNameZh").show();
      return false;
    }

    if (loginAccount == "") {
      $("#loginAccount").focus();
      $("#errMsgEmail").show();
      return false;
    } else {
      if (loginAccount.indexOf("@") < 0) {
        $("#loginAccount").focus();
        //$("#errMsgEmail").hide();
        $("#errMsgEmailFormat").show();
        return false;
      }
    }

    if (loginPassword == "") {
      $("#loginPassword").focus();
      $("#errMsgLoginPassword").show();
      return false;
    }

    if (corporation == "") {
      $("#corporation").focus();
      $("#errMsgCorporation").show();
      return false;
    }

    if (contact == "") {
      $("#contact").focus();
      $("#errMsgContact").show();
      return false;
    }

    if (contactTel == "") {
      $("#contactTel").focus();
      $("#errMsgContactTel").show();
      return false;
    }

    if (picker == "") {
      $("#picker").focus();
      $("#errMsgAddress").show();
      return false;
    }

    if (police == "") {
      $("#police").focus();
      $("#errMsgPolice").show();
      return false;
    }

    //alert(mainProducts);
    if (mainProducts == "") {
      $("#police").focus();
      $("#errMsgMainProducts").show();
      return false;
    }

    return true;
  },
  submitForm: function () {
    if (!this.validate()) {
      return;
    }

    var submitMsgBox = $(document).dialog({
      type: 'toast',
      infoIcon: '../images/loading.gif',
      infoText: '数据提交中'
    });

    /*步骤1 开始*/
    var orgNameZh = $('#orgNameZh').val();
    var corporation = $('#corporation').val();
    var contact = $('#contact').val();
    var contactTel = $('#contactTel').val();
    var picker = $('#picker').val();
    var police = $('#police').val();
    var loginAccount = $('#loginAccount').val();
    var loginPassword = $('#loginPassword').val();

    var mainProductsArr = [];
    $(':checkbox[name="mainProducts"]:checked').each(function () {
      mainProductsArr.push($(this).val());
    });
    var otherMainProduct = $('#otherMainProduct').val();
    mainProductsArr.push(otherMainProduct);
    var mainProducts = mainProductsArr.join(',');
    /*步骤1 结束*/

    /*步骤2 开始*/
    //var orgTypeArr
    var orgType = "";
    $(':radio[name="orgType"]:checked').each(function () {
      orgType = $(this).val();
    });
    var otherOrgType = $('#otherOrgType').val();
    if (otherOrgType != "") {
      orgType = otherOrgType;
    }

    var startDate = $('#startDate').val();
    var registerMoney = $('#registerMoney').val();
    var orgCode = $('#orgCode').val();
    var licenseImageUrl = $('#licenseImageUrl').val();
    /*步骤2 结束*/

    /*步骤3 开始*/
    var isForeignTrade = "";
    $(':radio[name="isForeignTrade"]:checked').each(function () {
      isForeignTrade = $(this).val();
    });

    var isForeignTradeTeam = "";
    $(':radio[name="isForeignTradeTeam"]:checked').each(function () {
      isForeignTradeTeam = $(this).val();
    });

    var exportModeArr = [];
    $(':checkbox[name="exportMode"]:checked').each(function () {
      exportModeArr.push($(this).val());
    });
    var otherExportMode = $('#otherExportMode').val();
    exportModeArr.push(otherExportMode);
    var exportMode = exportModeArr.join(',');

    var rmbExportVolume = $('#rmbExportVolume').val();
    var dollarExportVolume = $('#dollarExportVolume').val();

    var exportCountries = $('#exportCountries').val();

    var exportProductsArr = [];
    $(':checkbox[name="exportProducts"]:checked').each(function () {
      exportProductsArr.push($(this).val());
    });
    var otherExportProducts = $('#otherExportProducts').val();
    exportProductsArr.push(otherExportProducts);

    var exportProducts = exportProductsArr.join(',');

    /*步骤3 结束*/

    /*步骤4 开始*/
    var homeImageUrls = $('#homeImageUrls').val();
    var internationalImageUrls = $('#internationalImageUrls').val();
    /*步骤4 结束*/

    /*步骤5 开始*/

    var worksiteType = "";
    $(':radio[name="worksiteType"]:checked').each(function () {
      worksiteType = $(this).val();
    });

    var tenancyStart = $('#tenancyStart').val();
    var tenancyEnd = $('#tenancyEnd').val();
    var worksiteArea = $('#worksiteArea').val();
    var workshopArea = $('#workshopArea').val();
    var finishedgoodsArea = $('#finishedgoodsArea').val();
    var inspectArea = $('#inspectArea').val();
    /*步骤5 结束*/

    /*步骤6 开始*/
    var onEmpVolume = $('#onEmpVolume').val();
    var mngEmpVolume = $('#mngEmpVolume').val();
    var technicalStaffVolume = $('#technicalStaffVolume').val();
    var qualityStaffVolume = $('#qualityStaffVolume').val();
    /*步骤6 结束*/

    var url = "/WeiXin/weiXinSupplier/signUp.do";
    $.ajax({
      type: "post", // 用POST方式传输
      dataType: "json", // 数据格式:JSON
      url: url, // 目标地址
      data: {
        orgNameZh: orgNameZh,
        corporation: corporation,
        contact: contact,
        contactTel: contactTel,
        picker: picker,
        police: police,
        loginAccount: loginAccount,
        loginPassword: loginPassword,
        mainProducts: mainProducts,
        orgType: orgType,
        startDate: startDate,
        registerMoney: registerMoney,
        orgCode: orgCode,
        licenseImageUrl: licenseImageUrl,
        isForeignTrade: isForeignTrade,
        isForeignTradeTeam: isForeignTradeTeam,
        exportMode: exportMode,
        rmbExportVolume: rmbExportVolume,
        dollarExportVolume: dollarExportVolume,
        exportCountries: exportCountries,
        exportProducts: exportProducts,
        homeImageUrls: homeImageUrls,
        internationalImageUrls: internationalImageUrls,
        worksiteType: worksiteType,
        tenancyStart: tenancyStart,
        tenancyEnd: tenancyEnd,
        worksiteArea: worksiteArea,
        workshopArea: workshopArea,
        finishedgoodsArea: finishedgoodsArea,
        inspectArea: inspectArea,
        onEmpVolume: onEmpVolume,
        mngEmpVolume: mngEmpVolume,
        technicalStaffVolume: technicalStaffVolume,
        qualityStaffVolume: qualityStaffVolume
      },
      success: function (dto) {
        submitMsgBox.close();
        if (dto != null) {
          if (dto.code == 0) {
            var supplierToken = dto.result.supplierToken;
            localStorage.setItem("supplierToken", supplierToken);
            //alert(supplierToken);
            var url = "supplier-profile.html";
            _mm.popUpAlert(dto.message, url);
          } else {
            _mm.popUpWarn(dto.message);
          }
        }
      },
    });
  },
  switchStep: function (id) {
    $('#step1').hide();
    $('#step2').hide();
    $('#step3').hide();
    $('#step4').hide();
    $('#step5').hide();
    $('#step6').hide();

    $('#step' + id).show();

    var btnText = "下一步";
    if (parseInt(id) == 6) {
      btnText = "提交";
    }
    $("#btnNext").val(btnText);
  },

  // initCityPicker: function () {
  //   var $target = $('#picker');

  //   $target.citySelect();

  //   $target.on('click', function (event) {
  //     event.stopPropagation();
  //     $target.citySelect('open');
  //   });

  //   $target.on('done.ydui.cityselect', function (ret) {
  //     $(this).val(ret.provance + ' ' + ret.city + ' ' + ret.area);
  //   });
  // },
  initStep: function () {
    $('#step').val(1);
    this.switchStep(1);
  },
  initUpload: function () {
    var arr = ["licenseImageUrl", "homeImageUrls", "internationalImageUrls"];
    for (var i = 0; i < arr.length; i++) {
      var item = arr[i];
      $("#" + item).val("");
      $("#" + item + "Upd").show();
      $("#" + item + "View").hide();
      $("#" + item + "Text").hide();
      $("#" + item + "Del").hide();
    }
  },
  downloadImages: function (mediaIds) {
    $.post("../WeiXin/weiXinSupplier/uploadPhotoMuti.do", { "mediaIds": mediaIds }, function (res) {
      //填写你自己的业务逻辑
      if (res != null) {
        if (res.code == 0) {
          alert(res.result.filenames);
        } else {
          //alert(res.message);
          this.callDialog(res.message);
        }
      }
    });
  },
  onLoad: function () {
    var other_value = "其他";
    var loadMsgBox = $(document).dialog({
      type: 'toast',
      infoIcon: '../images/loading.gif',
      infoText: '正在加载中'
    });
    loadMsgBox.update({
      infoIcon: '../images/success.png',
      infoText: '加载成功',
      autoClose: 1000,
    });

    _mm.getWeixinConfig();

    this.initUpload();

    // this.initCityPicker();
    this.initStep();

    //公司性质
    $(":radio[name='orgType']").labelauty();
    //主要产品
    $(":checkbox[name='mainProducts']").labelauty();

    //厂房持有
    $(":radio[name='worksiteType']").labelauty();

    //外贸经验
    $(":radio[name='isForeignTrade']").labelauty();
    //有无出口业务团队
    $(":radio[name='isForeignTradeTeam']").labelauty();
    //出口方式
    $(":checkbox[name='exportMode']").labelauty();

    //出口方式
    $(":checkbox[name='exportProducts']").labelauty();

    // //公司成立时间
    // initDatePicker("startDate");

    // //租期开始时间
    // initDatePicker("tenancyStart");
    // //租期结束时间
    // initDatePicker("tenancyEnd");

  },
  bindEvent: function () {
    var _this = this;
    // $("#selectBtn").click(function () {
    //   _this.initCityPicker();
    // })

    /*			$("#otherOrgTypeNode").hide();
        
        $("#orgType").click(function() {
          
          var value = $(this).val();
          alert(value);
          if (value == other_value){
            $("#otherOrgTypeNode").show();
            $("#otherOrgType").focus();
          } else {
            $("#otherOrgTypeNode").hide();
          }
        })*/

    //上传图片
    $("#licenseImageUrlUpd").click(function () {
      var trigger = "licenseImageUrl";
      _mm.uploadImageSigle(trigger);
    })

    //上传图片
    $("#homeImageUrlsUpd").click(function () {
      var trigger = "homeImageUrls";
      _mm.uploadImageMuti(trigger);
    })

    //上传图片
    $("#internationalImageUrlsUpd").click(function () {
      //alert(3);
      var trigger = "internationalImageUrls";
      _mm.uploadImageMuti(trigger);
    })

    //清空图片
    $("#licenseImageUrlDel").click(function () {
      var trigger = "licenseImageUrl";
      _mm.switchUpload(trigger, false);
    })

    //清空图片
    $("#homeImageUrlsDel").click(function () {
      var trigger = "homeImageUrls";
      _mm.switchUpload(trigger, false);
    })

    //清空图片
    $("#internationalImageUrlsDel").click(function () {
      var trigger = "internationalImageUrls";
      _mm.switchUpload(trigger, false);
    })
    //
    $("#btnNext").click(function () {
      _mm.scrollToTop();

      var step = $('#step').val();
      if (parseInt(step) == 1) {
        if (!_this.validate()) {
          return;
        }
      }

      /* if(parseInt(step) == 2) {
        var orgType = "";
        $(':radio[name="orgType"]:checked').each(function() {
          orgType = $(this).val();
        });
        
        if (orgType == other_value){
          var otherOrgType = $('#otherOrgType').val();
          if (otherOrgType == ""){
            $('#errMsgOtherOrgType').show();
            $('#otherOrgType').focus();
            return;
          }
        }
      }*/

      if (parseInt(step) < 6) {
        step = parseInt(step) + 1;
        $('#step').val(step);
        _this.switchStep(step);
      } else {
        _this.submitForm();
      }
    });
  }
};

$(function () {
  page.init();
});