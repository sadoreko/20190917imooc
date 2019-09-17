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
    path: './dist',
    filename: 'index.bundle.js'
  }
}
```



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