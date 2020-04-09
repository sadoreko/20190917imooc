$(function () {
  var Mock = require('mockjs');

  // 文章详情
  Mock.mock('/supplier/information/detail?categoryId=0&itemId=111', {
    "status": 200,
    "msg": "OK",
    "data": {
      "title": "进博会特别报道丨“湘”约进博会，湖南高桥大市场再次成为亮点",
      "date": "2019-11-09",
      "time": "07:11:00",
      "content": "<p style=\"line-height: 1.5em; text-indent: 2em;\"><span style=\"font-family: 宋体, SimSun; color: rgb(0, 0, 0); font-size: 16px;\">11月5日下午，由湖南省商务厅、澳大利亚贸易投资委员会主办的“湖南市场采购贸易方式推介暨湖南-澳大利亚进出口商品采购对接会”在第二届中国国际进口博览会上举行。</span></p><p style=\"line-height: 1.5em; text-align: center;\"><span style=\"font-family: 宋体, SimSun; color: rgb(0, 0, 0); font-size: 16px;\"><img src=\"http://s.hngqglobal.com/mall-image/info-detail/2019110953960605.jpg\" title=\"合影_副本.jpg\"/></span></p><p style=\"line-height: 1.5em; text-indent: 2em;\"><span style=\"font-family: 宋体, SimSun; color: rgb(0, 0, 0); font-size: 16px;\">澳大利亚驻华领事馆商务公使、澳大利亚贸易投资委员会大中华区总经理Daniel Boyer，湖南省商务厅厅长徐湘平，湖南省财政厅副厅长何伟文，湖南省商务厅副厅长李心球，长沙市人民政府副市长邱继兴，澳大利亚驻上海总领事馆、澳大利亚贸易投资委员会、澳大利亚相关州政府以及湖南省直、长沙市相关部门的领导出席活动。长沙市人民政府副秘书长王体泽担任此次活动主持人，300余位来自湖南和澳大利亚各行业的采购商和展商们参加了此次对接会。</span></p><p style=\"line-height: 1.5em; text-indent: 0em; text-align: center;\"><span style=\"font-family: 宋体, SimSun; color: rgb(0, 0, 0); font-size: 16px;\"><img src=\"http://s.hngqglobal.com/mall-image/info-detail/2019110954004545.jpg\" title=\"IMG_0557_副本.jpg\"/></span></p><p style=\"line-height: 1.5em; text-indent: 2em;\"><span style=\"font-family: 宋体, SimSun; color: rgb(0, 0, 0); font-size: 16px;\">近几年，中国与澳大利亚经贸往来密切。省商务厅副厅长李心球先生介绍，澳大利亚是全球第四大农产品出口国，也是多种矿产出口量全球第一的国家，湖南与澳大利亚经贸领域合作潜力大、来势好。</span></p><p style=\"line-height: 1.5em; text-indent: 0em; text-align: center;\"><span style=\"font-family: 宋体, SimSun; color: rgb(0, 0, 0); font-size: 16px;\"><img src=\"http://s.hngqglobal.com/mall-image/info-detail/2019110954025417.jpg\" title=\"李心球_副本.jpg\"/></span></p><p style=\"line-height: 1.5em; text-indent: 2em;\"><span style=\"font-family: 宋体, SimSun; color: rgb(0, 0, 0); font-size: 16px;\">长沙市人民政府副市长邱继兴先生表示，此次湖南-澳大利亚进出口商品采购对接会，就是要进一步推动更多湖南产品走向澳大利亚，推动更多澳大利亚企业和产品走向湖南，实现共赢发展，共创中澳进出口双向贸易发展新局面。</span></p><p style=\"line-height: 1.5em; text-indent: 0em; text-align: center;\"><span style=\"font-family: 宋体, SimSun; color: rgb(0, 0, 0); font-size: 16px;\"><img src=\"http://s.hngqglobal.com/mall-image/info-detail/2019110954053061.jpg\" title=\"邱继兴_副本.jpg\"/></span></p><p style=\"line-height: 1.5em; text-indent: 2em;\"><span style=\"font-family: 宋体, SimSun; color: rgb(0, 0, 0); font-size: 16px;\">对接会上，模特们身穿精美的旗袍，向采购商们展示了湖南高桥大市场出口产品集聚区的湖湘特色产品湘绣、湘瓷、湘茶、湘包等，深受澳大利亚采购商青睐。这些湖湘特色产品，正通过市场采购贸易方式，从高桥走出国门，走向世界。</span></p><p style=\"line-height: 1.5em; text-indent: 0em; text-align: center;\"><span style=\"font-family: 宋体, SimSun; color: rgb(0, 0, 0); font-size: 16px;\"><img src=\"http://s.hngqglobal.com/mall-image/info-detail/2019110954076653.jpg\" title=\"模特1_副本.jpg\"/></span></p><p style=\"line-height: 1.5em; text-indent: 2em;\"><span style=\"font-family: 宋体, SimSun; color: rgb(0, 0, 0); font-size: 16px;\">湖南高桥大市场董事总经理罗晓就市场采购贸易方式进行了现场推介。市场采购贸易方式是中国深化新一轮对外开放的一种新型外贸发展模式，具有通关便捷、结汇灵活等特点。</span></p><p style=\"line-height: 1.5em; text-indent: 0em; text-align: center;\"><span style=\"font-family: 宋体, SimSun; color: rgb(0, 0, 0); font-size: 16px;\"><img src=\"http://s.hngqglobal.com/mall-image/info-detail/2019110954097433.jpg\" title=\"罗总讲话2_副本.jpg\"/></span></p><p style=\"line-height: 1.5em; text-indent: 2em;\"><span style=\"font-family: 宋体, SimSun; color: rgb(0, 0, 0); font-size: 16px;\">2018年，湖南高桥大市场获批成为“市场采购贸易方式试点”，搭建了湖南最便捷的出口贸易通道。据不完全统计，此次对接会现场达成交易11批次，意向交易总额达数千万人民币。</span></p><p style=\"line-height: 1.5em; text-indent: 0em; text-align: center;\"><span style=\"font-family: 宋体, SimSun; color: rgb(0, 0, 0); font-size: 16px;\"><img src=\"http://s.hngqglobal.com/mall-image/info-detail/2019110954130545.jpg\" title=\"罗总2_副本.jpg\"/></span></p><p style=\"line-height: 1.5em; text-indent: 2em;\"><span style=\"font-family: 宋体, SimSun; color: rgb(0, 0, 0); font-size: 16px;\">作为湖南商贸龙头企业，湖南高桥大市场大力推动湖南和中国产品走向全球，打造中部进出口双向贸易平台，建设湖南出口产品集聚区，汇聚了服饰、箱包、陶瓷、茶叶、假发等众多湖南名优特产，成为国际采购商“一站式”采购中国和湖南产品的首选基地。</span></p><p style=\"line-height: 1.5em; text-indent: 0em; text-align: center;\"><span style=\"font-family: 宋体, SimSun; color: rgb(0, 0, 0); font-size: 16px;\"><img src=\"http://s.hngqglobal.com/mall-image/info-detail/2019110954287089.jpg\" title=\"91327d50ec814e9b4219dfb7302b735_副本.jpg\"/></span></p><p style=\"line-height: 1.5em; text-indent: 2em;\"><span style=\"font-family: 宋体, SimSun; color: rgb(0, 0, 0); font-size: 16px;\">未来，高桥将以更开放的姿态，更加优惠的政策，更加优质的服务、加强与澳大利亚乃至世界各国的商贸合作，搭建一个资源共享、市场共拓的平台。推动国际企业和商品聚集在高桥，同时推广市场采购贸易方式，推进“湘品出海”，真正成为买全球、卖全球的现代化国际市场，构建一个全球商贸价值共享平台，最终实现合作共赢。</span></p><p><br/></p>",
      "author": "湖南高桥大市场",
      "source": "某某某",
      "sourceLink": "www.customs.gov.cn/customs/302249/302266/302267/2867108/index.html",
      "readNum": 8,
      "linkList": null
    }
  });

  // 首页 资讯列表
  Mock.mock('weixin/indexNewsList', {
    "status": 200,
    "msg": "OK",
    "data": {
      "page": 1,
      "total": 3,
      "records": 12,
      "rows": [
        {
          "category": "0",
          "id": "111",
          "title": "中国（长沙）-南非经贸合作推介会在南非约翰内斯堡市成功召开",
          "keywords": null,
          "summary": "2019年3月30日，长沙市人民政府邱继兴副市长、高桥大市场董事总经理罗晓女士一行出访南非，并于4月3日在南非约翰内斯堡希尔顿酒店举办了中国（长沙）-南非经贸合作推介会",
          "markIcon": null,
          "isMain": null,
          "mainImageHost": "http://s.hngqglobal.com/",
          "mainImageUrl": "mall-image/info/2019041165105417.jpg",
          "publishDate": "2019-12-04",
          "viewNum": "81"
        },
        {
          "category": "0",
          "id": "111",
          "title": "进博会特别报道丨“湘”约进博会，湖南高桥大市场再次成为亮点",
          "keywords": null,
          "summary": "11月5日下午，由湖南省商务厅、澳大利亚贸易投资委员会主办的“湖南市场采购贸易方式推介暨湖南-澳大利亚进出口商品采购对接会”在第二届中国国际进口博览会上举行。",
          "markIcon": null,
          "isMain": null,
          "mainImageHost": "http://s.hngqglobal.com/",
          "mainImageUrl": "mall-image/info/2019110953960605.jpg",
          "publishDate": "2019-11-09",
          "viewNum": "81"
        },
        {
          "category": "0",
          "id": "1234567803",
          "title": "湖南高桥大市场亮相第四届东盟•湖南名优产品交易会， 助推“湘品出海”",
          "keywords": null,
          "summary": "11月1日-4日，由湖南省商务厅和长沙市人民政府主办的第四届东盟•湖南名优产品交易会(以下简称交易会)在长沙红星国际会展中心隆重举行。来自东盟十国及湖南省内的名优企业携各品类名优产品进行集中展示展览，搭建了东盟和湖南贸易投资的长效性发展平台。",
          "markIcon": null,
          "isMain": null,
          "mainImageHost": "http://s.hngqglobal.com/",
          "mainImageUrl": "mall-image/info/2019110953107561.jpg",
          "publishDate": "2019-11-09",
          "viewNum": "81"
        },
        {
          "category": "0",
          "id": "723111",
          "title": "23年蝶变，高桥大市场演绎商贸“神话”",
          "keywords": null,
          "summary": "湖南高桥大市场是湖南唯一的市场采购贸易方式试点市场和国家重点扶持建设市场。通过23年的发展，由一家偏居城乡接合部的批发市场，成长为总占地面积1000亩、拥有8000多个优质商贸流通企业和8个成熟专业化市场.",
          "markIcon": null,
          "isMain": null,
          "mainImageHost": "http://s.hngqglobal.com/",
          "mainImageUrl": "mall-image/info/2019110840421481.jpg",
          "publishDate": "2019-10-30",
          "viewNum": "81"
        }
      ]
    }
  });

  // 首页 点击更多 跳转到newsMore.html
  // Mock.mock('weixin/newsMore', {
  //   // 全部加载了, 没有更多内容了
  //   "status": 200,
  //   "msg": "OK",
  //   "data": null
  // });

  // 首页 点击更多 跳转到newsMore.html
  Mock.mock('weixin/newsMore', {
    "status": 200,
    "msg": "OK",
    "data": [
      {
        "category": "0",
        "id": "111",
        "imageHost": "http://s.hngqglobal.com/",
        "imageUrl": "mall-image/info/2019041165105417.jpg",
        "title": "首届中非经贸博览会",
        "content": "100余种非洲商品等你来品鉴购买，100余种非洲商品等你来品鉴购买。",
        "readNum": "355"
      },
      {
        "category": "1",
        "id": "111",
        "imageHost": "http://s.hngqglobal.com/",
        "imageUrl": "mall-image/info/2019041165105417.jpg",
        "title": "进博会特别报道丨“湘”约进博会，湖南高桥大市场再次成为亮点进博会特别报道丨“湘”约进博会，湖南高桥大市场再次成为亮点",
        "content": "100余种非洲商品等你来品鉴购买，100余种非洲商品等你来品鉴购买。",
        "readNum": "66"
      },
      {
        "category": "2",
        "id": "111",
        "imageHost": "http://s.hngqglobal.com/",
        "imageUrl": "mall-image/info/2019041165105417.jpg",
        "title": "首届中非经贸博览会进博会特别报道丨“湘”约进博会，湖南高桥大市场再次成为亮点进博会特别报道丨“湘”约进博会，湖南高桥大市场再次成为亮点",
        "content": "100余种非洲商品等你来品鉴购买，100余种非洲商品等你来品鉴购买。",
        "readNum": "22"
      },
      {
        "category": "3",
        "id": "111",
        "imageHost": "http://s.hngqglobal.com/",
        "imageUrl": "mall-image/info/2019041165105417.jpg",
        "title": "首届中非经贸博览会",
        "content": "100余种非洲商品等你来品鉴购买，100余种非洲商品等你来品鉴购买。",
        "readNum": "58"
      },
      {
        "category": "2",
        "id": "111",
        "imageHost": "http://s.hngqglobal.com/",
        "imageUrl": "mall-image/info/2019041165105417.jpg",
        "title": "首届中非经贸博览会",
        "content": "100余种非洲商品等你来品鉴购买，100余种非洲商品等你来品鉴购买。",
        "readNum": "10"
      }
    ]
  });

  // 微信底部菜单 行业资讯下的4个tab页
  Mock.mock('/weixin/tabNews/category=0', {
    "status": 200,
    "msg": "OK",
    "data": [
      {
        "category": "0",
        "id": "111",
        "imageHost": "http://s.hngqglobal.com/",
        "imageUrl": "mall-image/info/2019041165105417.jpg",
        "title": "tab 0 test data",
        "content": "100余种非洲商品等你来品鉴购买，100余种非洲商品等你来品鉴购买。",
        "tag": "紧急",
        "readNum": "355"
      },
      {
        "category": "0",
        "id": "111",
        "imageHost": "http://s.hngqglobal.com/",
        "imageUrl": "mall-image/info/2019041165105417.jpg",
        "title": "进博会特别报道丨“湘”约进博会，湖南高桥大市场再次成为亮点进博会特别报道丨“湘”约进博会，湖南高桥大市场再次成为亮点",
        "content": "100余种非洲商品等你来品鉴购买，100余种非洲商品等你来品鉴购买。",
        "tag": "沸",
        "readNum": "66"
      },
      {
        "category": "0",
        "id": "111",
        "imageHost": "http://s.hngqglobal.com/",
        "imageUrl": "mall-image/info/2019041165105417.jpg",
        "title": "首届中非经贸博览会进博会特别报道丨“湘”约进博会，湖南高桥大市场再次成为亮点进博会特别报道丨“湘”约进博会，湖南高桥大市场再次成为亮点",
        "content": "100余种非洲商品等你来品鉴购买，100余种非洲商品等你来品鉴购买。",
        "tag": "爆",
        "readNum": "22"
      },
      {
        "category": "0",
        "id": "111",
        "imageHost": "http://s.hngqglobal.com/",
        "imageUrl": "mall-image/info/2019041165105417.jpg",
        "title": "首届中非经贸博览会",
        "content": "100余种非洲商品等你来品鉴购买，100余种非洲商品等你来品鉴购买。",
        "tag": "爆",
        "readNum": "58"
      },
      {
        "category": "0",
        "id": "111",
        "imageHost": "http://s.hngqglobal.com/",
        "imageUrl": "mall-image/info/2019041165105417.jpg",
        "title": "首届中非经贸博览会",
        "content": "100余种非洲商品等你来品鉴购买，100余种非洲商品等你来品鉴购买。",
        "tag": "沸",
        "readNum": "10"
      }
    ]
  });

  Mock.mock('/weixin/tabNews/category=1', {
    "status": 200,
    "msg": "OK",
    "data": [
      {
        "category": "0",
        "id": "111",
        "imageHost": "http://s.hngqglobal.com/",
        "imageUrl": "mall-image/info/2019041165105417.jpg",
        "title": "tab 1 100余种非洲商品等你来品鉴购买，100余种非洲商品等你来品鉴购买。",
        "content": "100余种非洲商品等你来品鉴购买，100余种非洲商品等你来品鉴购买。100余种非洲商品等你来品鉴购买，100余种非洲商品等你来品鉴购买。",
        "tag": "新",
        "readNum": "355"
      }
    ]
  });

  Mock.mock('/weixin/tabNews/category=2', {
    "status": 200,
    "msg": "OK",
    "data": [
      {
        "category": "0",
        "id": "111",
        "imageHost": "http://s.hngqglobal.com/",
        "imageUrl": "mall-image/info/2019041165105417.jpg",
        "title": "tab 2 100余种非洲商品等你来品鉴购买，100余种非洲商品等你来品鉴购买。",
        "content": "100余种非洲商品等你来品鉴购买，100余种非洲商品等你来品鉴购买。100余种非洲商品等你来品鉴购买，100余种非洲商品等你来品鉴购买。",
        "tag": "新",
        "readNum": "355"
      }
    ]
  });

  Mock.mock('/weixin/tabNews/category=3', {
    "status": 200,
    "msg": "OK",
    "data": [
      {
        "category": "0",
        "id": "111",
        "imageHost": "http://s.hngqglobal.com/",
        "imageUrl": "mall-image/info/2019041165105417.jpg",
        "title": "tab 3 100余种非洲商品等你来品鉴购买，100余种非洲商品等你来品鉴购买。",
        "content": "100余种非洲商品等你来品鉴购买，100余种非洲商品等你来品鉴购买。100余种非洲商品等你来品鉴购买，100余种非洲商品等你来品鉴购买。",
        "tag": "新",
        "readNum": "355"
      }
    ]
  });

  // 客服消息列表
  Mock.mock('/weixin/msgList', {
    "status": 200,
    "msg": "OK",
    "data": [
      {
        "msgId": "1111",
        "imageHost": "../images/",
        "imageUrl": "msgHeader.png",
        "sender": "Vivianshaw",
        "date": "2020-02-06",
        "tips": "[Total 8 messages]",
        "content": "I want to buy 50 I want to buy 50",
        "hasRead": "true",
      },
      {
        "msgId": "2222",
        "imageHost": "../images/",
        "imageUrl": "msgHeader2.png",
        "sender": "Sephora",
        "date": "2020-02-02",
        "tips": "[Total 3 messages]",
        "content": "I want to buy 50 I want to buy 50",
        "hasRead": "false"
      },
      {
        "msgId": "3333",
        "imageHost": "../images/",
        "imageUrl": "msgHeader.png",
        "sender": "DRAWWIND",
        "date": "2020-01-31",
        "tips": "",
        "content": "When will the goods be delivered？",
        "hasRead": "true"
      },
      {
        "msgId": "1111",
        "imageHost": "../images/",
        "imageUrl": "msgHeader.png",
        "sender": "BUFFR SHOP",
        "date": "2020-02-06",
        "tips": "[Total 8 messages]",
        "content": "I want to buy 50 I want to buy 50",
        "hasRead": "false"
      },
      {
        "msgId": "2222",
        "imageHost": "../images/",
        "imageUrl": "msgHeader.png",
        "sender": "SENSE online shop",
        "date": "2020-02-02",
        "tips": "[Total 3 messages]",
        "content": "I want to buy 50 I want to buy 50",
        "hasRead": "false"
      },
      {
        "msgId": "3333",
        "imageHost": "../images/",
        "imageUrl": "msgHeader.png",
        "sender": "FanoStudios",
        "date": "2020-01-31",
        "tips": "",
        "content": "When will the goods be delivered？",
        "hasRead": "true"
      },
      {
        "msgId": "3333",
        "imageHost": "../images/",
        "imageUrl": "msgHeader.png",
        "sender": "David",
        "date": "2020-01-31",
        "tips": "",
        "content": "When will the goods be delivered？When will the goods be delivered？",
        "hasRead": "true"
      }
    ]
  });

  // 客服消息详情
  Mock.mock('/weixin/msgDetail', {
    "status": 200,
    "msg": "OK",
    "data": {
      "rows": [
        {
          "side": 0,
          "imageHost": "//s.hngqglobal.com/mall-image/casegrid/",
          "imageUrl": "2020999900004.jpg",
          "content": "对话框左侧 确性，对在任何情况下因使用或不能使用本网络服务所产生的直接、间接、偶然、特殊及后续的损害及风险，本公司不承担任何责任"
        },
        {
          "side": 1,
          "imageHost": "//s.hngqglobal.com/mall-image/casegrid/",
          "imageUrl": "201911281603172.jpg",
          "content": "对话框右侧  网络服务不作任何类型的担保，包括但不限于网络服务的及时性、安全性、准确性"
        }, 
        {
          "side": 1,
          "imageHost": "//s.hngqglobal.com/mall-image/casegrid/",
          "imageUrl": "201911281603172.jpg",
          "content": "对话框右侧  继续第二个问题"
        }, 
        {
          "side": 0,
          "imageHost": "//s.hngqglobal.com/mall-image/casegrid/",
          "imageUrl": "2020999900004.jpg",
          "content": "对话框左侧 2019年市场交易总额超过1480亿元。先后荣获“全国内外贸结合示范市场”、“全国转型升级示范市场”、“中国优秀示范市场”等称号。"
        }
      ]
    }
  });

  // 发送消息
  Mock.mock('/weixin/sendMsg', {
    "status": 200,
    "msg": "OK",
    "data": null
  });

  // 检索文章
  Mock.mock('/weixin/search', {
    "status": 200,
    "msg": "OK",
    "data": [
      {
        "category": "0",
        "id": "111",
        "imageHost": "http://s.hngqglobal.com/mall-image/",
        "imageUrl": "casegrid/201911281609194.jpg",
        "title": "首届中非经贸博览会",
        "content": "100余种非洲商品等你来品鉴购买，100余种非洲商品等你来品鉴购买。",
        "readNum": "355"
      },
      {
        "category": "1",
        "id": "111",
        "imageHost": "http://s.hngqglobal.com/mall-image/",
        "imageUrl": "casegrid/201911281609194.jpg",
        "title": "进博会特别报道丨“湘”约进博会，湖南高桥大市场再次成为亮点进博会特别报道丨“湘”约进博会，湖南高桥大市场再次成为亮点",
        "content": "100余种非洲商品等你来品鉴购买，100余种非洲商品等你来品鉴购买。",
        "readNum": "66"
      },
      {
        "category": "2",
        "id": "111",
        "imageHost": "http://s.hngqglobal.com/mall-image/",
        "imageUrl": "casegrid/201911281609194.jpg",
        "title": "首届中非经贸博览会进博会特别报道丨“湘”约进博会，湖南高桥大市场再次成为亮点进博会特别报道丨“湘”约进博会，湖南高桥大市场再次成为亮点",
        "content": "100余种非洲商品等你来品鉴购买，100余种非洲商品等你来品鉴购买。",
        "readNum": "22"
      },
      {
        "category": "3",
        "id": "111",
        "imageHost": "http://s.hngqglobal.com/",
        "imageUrl": "mall-image/info/2019041165105417.jpg",
        "title": "首届中非经贸博览会",
        "content": "100余种非洲商品等你来品鉴购买，100余种非洲商品等你来品鉴购买。",
        "readNum": "58"
      },
      {
        "category": "2",
        "id": "111",
        "imageHost": "http://s.hngqglobal.com/",
        "imageUrl": "mall-image/info/2019041165105417.jpg",
        "title": "首届中非经贸博览会",
        "content": "100余种非洲商品等你来品鉴购买，100余种非洲商品等你来品鉴购买。",
        "readNum": "10"
      }
    ]
  });
  
  // 登录
  Mock.mock('/weixin/login', {
    "status": 200,
    "msg": "OK",
    "data": null
  });
  // 退出
  Mock.mock('/weixin/logout', {
    "status": 200,
    "msg": "OK",
    "data": null
  });


});