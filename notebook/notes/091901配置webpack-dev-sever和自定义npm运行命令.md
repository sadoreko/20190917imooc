正常版本的webpack-dev-sever需要webpack2.0以上, 因为需要兼容IE8而使用的是webpack1.15.0, 所以版本: 
​    "webpack-dev-server": "^1.16.5"

1. 安装

   ```
   npm install webpack-dev-server@1.16.5 --save-dev
   
   sudo npm install webpack-dev-server@1.16.5 -g
   
   	全局安装后才能使用webpack-dev-server命令
   	安装包会有缓存, 同一版本的在项目里安装会比较快, 如果换个版本, 要再花时间下载
   ```

2. 执行 

  ```
  $ webpack-dev-server
  
  复制给出的地址, 浏览器打开
  http://localhost:8080/webpack-dev-server/
  
  虽然打开了不同的文件夹或页面, 但是地址始终是localhost:8080/webpack-dev-server/, 不方便调试
  ```

3. 为了让路径显示在地址栏上 ——webpack.config.js

   ```javascript
   // 环境变量配置，dev / online
   var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';
   
   output: {
       path: path.resolve(__dirname, 'dist'),
       publicPath  : 'dev' === WEBPACK_ENV ? '/dist/' : '//s.happymmall.com/mmall-fe/dist/',
       filename: 'js/[name].bundle.js'
     },
   devServer: {
       port: 8088,
       inline: true,
       proxy : {
           '**/*.do' : {
               target: 'http://test.happymmall.com',
               changeOrigin : true
           }
       }
     },
   ```

   publicPath   是访问文件时使用的路径
   path              是存放文件的路径

4. 运行

   ```
   $ WEBPACK_ENV=dev webpack-dev-server --inline --port 8088
   
   http://localhost:8088/
   ```

5. 退出 $ ctrl+C



---

[webpack-dev-server原理分析与HMR实现](<https://github.com/liangklfangl/webpack-hmr>) 热更新相关

---

[注:](https://git.imooc.com/coding-109/coding-109)    

- 升级nodejs版本到6.12.3（升级后需要把原项目中node_modules目录删除，重新执行初始化）
- hogan插件被废弃，替换为hogan.js
- 启动方式改动，不再需要安装全局的webpack和webpack-dev-server（需要nodejs版本在6.12.3）
- 移除webpack-dev-server里的client注入，webpack-dev-server可以自动注入client了
- 添加devServer的proxy选项，开发模式下可以直接访问接口，不再需要charles或fiddler做代理
- 将启动命令中的inline和port选项从命令移到了配置文件中

所以, 实际项目中应如何配置, 还需实践



## 自定义npm运行命令

package.json

```json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "./node_modules/.bin/webpack-dev-server",
    "dev_win": "./node_modules/.bin/webpack-dev-server",
    "dist": "WEBPACK_ENV=online ./node_modules/.bin/webpack -p",
    "dist_win": "set WEBPACK_ENV=online&& ./node_modules/.bin/webpack -p"
  },
```

执行: `$ npm run dev`  相当于运行 `$ ./node_modules/.bin/webpack-dev-server`

_win 是Windows下使用的命令





---

```
$ git merge origin master

$ git tag tag-dev-initial 一般大版本更新时打个标签, 这里的标签名是tag-dev-initial, 方便查看版本
```

