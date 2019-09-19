方法1、原始打包

```javascript
新建
.src/page/index/cats.js

var cats = ['dave', 'henry', 'martha'];
module.exports = cats;
```

```javascript
.src/page/index/index.js

cats = require('./cats.js');
console.log(cats);
```

```
打包 
$ webpack 入口文件 目标文件

$ webpack ./src/page/index/index.js ./dist/app.js
```



方法2、使用 webpack.config.js

```javascript
项目根目录下新建webpack.config.js  `mmall-fe/webpack.config.js`

module.exports = {
  entry: './src/page/index/index.js',
  output: {
    path: './dist',  						// 相对路径容易出问题, 使用绝对路径
    filename: 'index.bundle.js'
  }
}

改为

var path = require('path');
var config = {
  entry: './src/page/index/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),   // __dirname是当前文件的绝对路径
    filename: 'index.bundle.js'
  }
};
module.exports = config;

打包命令: 
$ cd /Users/sherrywong/Documents/GitHub/20190917imooc/doc/mmall-fe
$ webpack
```



> webpack.config.js
>
> 指挥webpack要做什么



> webpack.config.js:
>
> 1. mode:	决定webpack的优化级别
>
>    none:   			不优化
>
>    development:  	输出调试信息, 设置process.env.NODE_ENV
>
>    production: 		最高优化, 启用压缩, 忽略错误
>
> 2. entry:   入口
>
>    单入口—— 适用于SPA(单页应用)
>
>    多入口—— MPA
>
> 3. output:    输出, 须为json
>
>    {
>
>    ​	path: 		路径——须为绝对路径, 可用 path.resolve(__dirname, 文件夹名) 辅助生成绝对路径,
>
>    ​	filename: 	文件名
>
>    }



> fileheader 插件
>
> User Settings inside, set and modify the creator's name.
>
> ```
> "fileheader.Author": "tom",
> "fileheader.LastModifiedBy": "jerry"
> ```
>
> ctrl+alt+i   insert comments in the head



**IE8 不支持2.0以上版本的jQuery**  



## 处理JS


#### Q: JS用什么loader加载?  

[loader](https://webpack.docschina.org/loaders/) 

1. webpack本身支持JS加载

2. [`babel-loader`](https://webpack.docschina.org/loaders/babel-loader) 加载 ES2015+ 代码，然后使用 [Babel](https://babel.docschina.org/) 转译为 ES5.  

   Babel、ES2015、polyfill均不能保证兼容IE8, 所以使用webpack自带的.



#### Q: 官方文档的entry只有一个js, 实际项目里有多个, 怎么做


多入口 ——
把entry改为Object对象形式,  output的filename改为: 根据entry的文件名自动填充

```javascript
var path = require('path');
var config = {
  mode: 'development',
  entry: {
    index: './src/page/index/index.js',
    test: './src/page/index/测试多入口的webpack.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  }
};
module.exports = config;
```

```javascript
课程里的写法是
entry: {
    index: ['./src/page/index/index.js'],
    test: ['./src/page/index/测试多入口的webpack.js']
  },
```

```javascript
如果想存在dist文件夹下的js文件夹, 可以改成
filename: 'js/[name].bundle.js'
```





####  Q: 怎么引入jquery

```javascript
方法一
$ npm install jquery --save

js 文件里
var $ = require('jquery');

缺点: 每个用到jquery的js文件都要写require('jquery')
	 有的jquery插件依赖的是全局的jquery对象, 上面这种以变量形式加载的jquery是无法放在插件里使用的
```

```html
方法二
<script src="jquery的本地地址或CDN地址"></script>

IE8 不支持2.0以上版本的jQuery
```

```
方法三
<script src="jquery的本地地址或CDN地址"></script>

js文件:
var $$ = require('jquery');
$$('body').html('用模块形式使用jquery');

webpack.config.js的output:
externals: {
    'jquery': 'window.jQuery'
  }
```





####  Q: 怎么提取公共模块

[CommonsChunkPlugin](<https://webpack.docschina.org/plugins/commons-chunk-plugin/#src/components/Sidebar/Sidebar.jsx>)  

**方法一**  

```javascript
page/CommonsChunkPlugin提取公共模块.js

module.exports = {
  test: 1234
};
```

```javascript
page/index/index.js
page/index/引入jquery.js
page/index/测试多入口的webpack.js
都写入

require('../CommonsChunkPlugin提取公共模块.js');
```

```javascript
webpack.config.js

var webpack = require('webpack');
var options = {
  name : 'commons',
  filename : 'js/base.js' 
};

plugins: [
    new webpack.optimize.CommonsChunkPlugin(options)
  ]
```

```
执行 $ webpack
dist/js/base.js 里面保存了提取到的公共部分

module.exports = {
	test: 1234
};
```



**方法二** 

```javascript
./src/page/ 下新建 common/index.js
里面写入公共模块代码

entry: {
    'jquery': ['./src/page/index/引入jquery.js'],
    'commonModule': ['./src/page/common/index.js'] 
  },

plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name : 'commonModule',
      filename : 'js/base.js' 
    })
  ]
  
$ webpack

dist/js/base.js 即写入了公共模块
// commonModule 名字自定义, entry和plugins里一致即可
```





## 处理样式

```javascript
$ npm install css-loader style-loader --save-dev 
	安装css样式的loader

$ cat package.json
	可以查看已经安装的loaders

./src/page/index 新建 /index.css
	body{
      background-color: #eee;
    }

./src/page/index/index.js
	require('./index.css');
	
webpack.config.js 里	
    module: {
        loaders: [
          { test: /\.css$/, loader: 'style-loader!css-loader' }
        ]
      },
      
$ webpack

生成的dist/js/index.bundle.js里
	// Module
	exports.push([module.id, "body{background-color: #eee;}", ""]);
```



>  在webpack.config.js里配置loader
>
>  ​          loaders: [ {  
>
>  ​                test: /\.css$/,  
>
>  ​               loader:'style-loaer!css-loader'  
>
>  ​          }， {  
>
>  ​                test: /\.less$/,  
>
>  ​               loader:'style-loaer!css-loader'  
>
>  ​          }  ]  
>
>  注：loaders是一个数组，其中的元素是我们使用的所有loader，每个loader对应一个object，test是加载器要匹配的文件后缀正则，! 用来分隔不同的加载器。上述loader配置表示，webpack在打包过程中，遇到后缀为css的文件，就会使用style-loader和css-loader去加载这个文件。上面的loader配置是webpack1的写法，对应的webpack2写法如下（建议用webpack2）
>
>   rules: [  {  
>
>  ​               test: /\.css$/,  
>
>  ​                use: ['style-loader', 'css-loader']  
>
>  ​            }，{  
>
>  ​               test: /\.less$/,  
>
>  ​                use: ['style-loader', 'css-loader']  
>
>    } ]  
>
>  注：1.遇到后缀为.css的文件，webpack先用css-loader加载器去解析这个文件，遇到“@import”等语句就将相应样式文件引入（所以如果没有css-loader，就没法解析这类语句），最后计算完的css，将会使用style-loader生成一个内容为最终解析完的css代码的style标签，放到head标签里。
>
>  ​       2.loader是有顺序的，webpack肯定是先将所有css模块依赖解析完得到计算结果再创建style标签。因此应该把style-loader放在css-loader的前面（webpack loader的执行顺序是从右到左）。
>
>  [原文](https://www.jianshu.com/p/cbd3375e2575)



####  Q: webpack打包的css怎么生成单独的文件

[WEBPACK分离css单独打包](https://www.jianshu.com/p/439764e3eff2)  

```
loaders的高版本不能用的解决办法:

npm install style-loader@0.17.0 css-loader@0.28.1 extract-text-webpack-plugin@1.0.1 --save-dev

参考 091704webpack脚手架搭建概要.md 里dependencies的版本
```



```javascript
$ npm install extract-text-webpack-plugin --save-dev


webpack.config.js 里	
	var ExtractTextPlugin = require('extract-text-webpack-plugin');
	
	module: {
        loaders: [
          { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader') }
        ]
      },
	plugins: [
        new webpack.optimize.CommonsChunkPlugin(options),
        new ExtractTextPlugin("css/[name].css")
      ]

$ webpack
```

