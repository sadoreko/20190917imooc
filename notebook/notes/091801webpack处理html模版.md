最终发布的是webpack打包的/dist/文件夹, /src/文件夹是不管的, 所以需要把html文件打包到/dist/里



插件: html文件使用 [html-webpack-plugin](<https://www.webpackjs.com/plugins/html-webpack-plugin/>)  

```
"html-loader": "^0.4.5",
"html-webpack-plugin": "^2.28.0",
```

```javascript
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

var webpackConfig = {
  entry: 'index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index_bundle.js'
  },
  plugins: [new HtmlWebpackPlugin()]
};
```



1. 安装 (我怕出问题, 直接安装了讲师用的版本)

   ```
   $ npm install --save-dev html-webpack-plugin@2.28.0
   + html-webpack-plugin@2.28.0
   ```

2. webpack.config.js

   ```javascript
   按上面的添加
   
   var HtmlWebpackPlugin = require('html-webpack-plugin');
   
   plugins: 加上
   
   new HtmlWebpackPlugin({
         template : './src/view/index.html',
         filename : 'view/index.html',
         inject   : true,
         hash     : true,
         chunks   : ['common', 'index']
       })
   ```

   template: 打包哪个文件

   filename: 保存成什么文件

   chunks: 使用哪些js文件

3. ./src/view/index.html

   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <meta http-equiv="X-UA-Compatible" content="ie=edge">
     <title>测试使用</title>
   </head>
   <body>
     <script src="https://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"></script>
   </body>
   </html>
   ```

   执行 $ webpack 后, 会在 `</body>` 前添加script标签



### html文件里公共的部分如何提取

1. 新建./src/view/layout/ 存放公共的东西

   在里面新建 html-head.html, 内容如下

   ```html
   <head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <meta http-equiv="X-UA-Compatible" content="ie=edge">
   </head>
   ```

2. 安装html的loader

   `$ npm install html-loader --save-dev`  

3. 在index.html里写入使用的模版html-head.html, 和使用的插件html-loader

   ```html
   <!DOCTYPE html>
   <html lang="en">
     <!-- 
   	<%= require('./layout/html-head.html') %> 
   	加上html-loader作为中介 
     -->
     <%= require('html-loader!./layout/html-head.html') %>
   <body>
     <script src="https://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"></script>
   </body>
   </html>
   ```
