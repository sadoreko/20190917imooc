## Webpack

编译原理—— 用 node.js 把 CommonJS 下的模块全部转换成浏览器支持的 function 形式的模块, 再用模块加载器组织这些模块

```
/Users/sherrywong/Documents/GitHub/20190917imooc/doc/mmall-fe

$ npm init

填写信息

$ ls 
	package.json	src
	
$ sudo npm install webpack@1.15.0 -g
	
$ npm install webpack@1.15.0 --save-dev
```



> 全局安装的是提供全局webpack 命令，本地的webpack才是项目里需要执行的
>
> 优先使用项目本地的, 找不到时使用全局的



[Webpack-IE低版本兼容指南](https://www.cnblogs.com/godghdai/p/7657716.html)



> ```
> webpack@1.15.0这个版本是不是太旧了？
> ```
>
> 经过测试再新的版本对IE8不兼容，如果对IE8有兼容要求的话最好用这个版本。如果没有要求，在qun共享里也提供了webpack@4.2.0的升级包，可以使用新版webpack。升级过程参考手记[《小记webpack4.x升级过程》](https://www.imooc.com/article/24738)。若果是新手的话建议还是先按着课程里的过程来开发，对npm熟悉以后再进行项目升级。



```
用 --save-dev 安装的包的名称、版本都会保存在devDependences字段, 存放开发用的辅助工具, 一般不会被打包进业务代码

用 --save 安装的, 存在dependencies里, 放业务代码的依赖包

 "devDependencies": {
    "css-loader": "^0.28.1",
    "extract-text-webpack-plugin": "^1.0.1",
    "file-loader": "^0.11.1",
    "html-loader": "^0.4.5",
    "html-webpack-plugin": "^2.28.0",
    "style-loader": "^0.17.0",
    "url-loader": "^0.5.8",
    "webpack": "^1.15.0",
    "webpack-dev-server": "^1.16.5"
  },
  "dependencies": {
    "font-awesome": "^4.7.0",
    "hogan.js": "^3.0.2"
  }
```



## webpack.config.js

entry 		: js入口文件

externals	: 外部依赖的声明, 外部的内容可以通过它转换成CommonJS可引用的模块

[详见](<https://www.webpackjs.com/concepts/>)



**[核心是Webpack Loaders](https://www.webpackjs.com/concepts/loaders/)**  



### webpack-dev-server

前端开发服务器

文件改变时, 自动刷新浏览器

1. 安装:  npm install webpack-dev-server --save-dev
2. 配置:   `webpack-dev-server/client?http://localhost:8088`
3. 使用:  webpack-dev-server --port 8088 --inline
4. npm install webpack-dev-server -g      进行全局安装服务器

