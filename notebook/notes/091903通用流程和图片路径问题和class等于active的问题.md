新建分支 —— 我没做这步, 考虑是商业项目, 就放在本地了

```
$ git checkout -b mmall_v2.0
	git checkout 切换分支; -b 这个分支尚不存在
	
$ git branch 或 $ git b
	  master
	  mmall_v1.0
	  * mmall_v2.0  *表示当前分支  
	  
```

---

```
1. cd /Users/sherrywong/Documents/GitHub/20190917imooc/高桥项目测试

2. $ npm init

3. 复制粘贴之前项目的package.json里的命令行和依赖包
"scripts": {
    "dev": "./node_modules/.bin/webpack-dev-server",
    "dev_win": "./node_modules/.bin/webpack-dev-server",
    "dist": "WEBPACK_ENV=online ./node_modules/.bin/webpack -p",
    "dist_win": "set WEBPACK_ENV=online&& ./node_modules/.bin/webpack -p"
  },
"devDependencies": {
    "css-loader": "^0.28.1",
    "extract-text-webpack-plugin": "^1.0.1",
    "file-loader": "^0.11.1",
    "html-loader": "^0.5.5",
    "html-webpack-plugin": "^2.28.0",
    "style-loader": "^0.17.0",
    "url-loader": "^0.5.8",
    "webpack": "^1.15.0",
    "webpack-dev-server": "^1.16.5"
  },
  "dependencies": {
    "font-awesome": "^4.7.0",
    "hogan.js": "^3.0.2",
    "jquery": "^3.4.1"
  }

4. $ npm install  自动按依赖包安装

5. webpack

6. npm run dev  
```





## 图片路径问题

20190920

/Users/sherrywong/Documents/GitHub/20190917imooc/高桥项目测试/src/view/layout/footer.html

和header.html文件里的 `<a href="#"><img src="<%= require('../images/link1.png') %>"></a> `

图片路径有问题, 暂时没找到解决方法



20190921

暂时没找到直接在footer.html、header.html文件里写图片路径的方法

即: index.html通过 `<%= require('html-loader!./layout/header.html') %>` 引入header.html, 

header.html里面再用require引入图片, 有问题.

目前的解决方法是改成 a 或 p 标签, 把图片作为背景加进去.

注意直接写 `<a href="#"><img src="">或<img></a>` , 因为src为空, 浏览器会给图片的位置加一个框, 

而这个框不是border, 用 `img { border: 0 或 none }` 无法去除.



## 流程

```javascript
1. 新建 src/view/test.html

2. 新建 src/page/test/index.js
       src/page/test/index.css  

3. webpack.config.js

    entry: {
        'test' : ['./src/page/test/index.js'],
    },
    plugins: [
        new HtmlWebpackPlugin(getHtmlConfig('test', '测试页面')),
    ]
        
4. test.html
        
   图片链接改成 <img src="<%= require('../images/xq3-2.jpg') %>" /> 的形式, 如
    <div class="swiper-slide">
        <a href="#"><img src="<%= require('../images/1.jpg') %>"></a>
    </div>

5. 写入css样式代码, 注意图片url的路径要改. 如何不管怎么变动, 无需手动改url?
      
6. src/page/test/index.js 里

'use strict';
require('page/common/nav-simple/index.js'); // 顶部导航条
require('page/common/header/index.js');     // logo和导航栏
require('../common/style.css');				// 通用样式
require('./index.css');						// test下的index.css

```



## class="active"的问题

20190921

```html
需要解决
<nav>
<a href="index.html">首页</a> 
<a href="buyer/index.html">我是买家</a> 
<a href="outservice.html">出口服务</a>
<a href="news-list.html" class="active">活动资讯</a> 
<a href="register.html">商家入驻</a> 
<a href="#">关于我们</a> 
</nav> 

针对不同页面, 里面class="active"怎么用js处理
```



## 注意

1. register页面的js文件注意更改 imgSrc 的拼接路径


```javascript
var imgSrc = "../images/"+"step"+id+".png";
$("#imgStep").attr("src",imgSrc);
```



2.  step1.png是一开始就用到的, 能正常编译到dist/images里, 但后续需要使用的step2.png、step3.png、step4.png 不在dist/images里 

—— 暂时的解决方法: 

```html
<p><img id="imgStep" src="<%= require('../images/step1.png') %>" ></p>
<p class="notShow"><img id="imgStep" src="<%= require('../images/step2.png') %>" ></p>
<p class="notShow"><img id="imgStep" src="<%= require('../images/step3.png') %>" ></p>
<p class="notShow"><img id="imgStep" src="<%= require('../images/step4.png') %>" ></p>

.notShow { display: none; }
```

