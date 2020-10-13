---
title: React-cli与项目优化
---
# React-cli与项目优化

## 1.React脚手架

### create-react-app

#### 安装

```bash
    npm install -g create-react-app
```

#### 创建react项目

```bash
    create-react-app myapp
```

>项目依赖：react,react-dom,react-scripts

通常情况下，我们创建spa应用时是使用npm安装项目依赖，在通过配置webpack.config.js进行配置，搭建好环境后在src编写源代码。而create-react-app是自动构建，在package.json中只有react-scripts作为依赖

#### 目录结构

![folder](/assets/img/React/folder.png "Optional title")


#### 命令
* 启动项目
```bash
    npm start
```
* 扩展webpack配置
    * `npm run eject`
      
        >单向操作不可逆，npm run eject命令暴露项目的配置，这样用户就可以完全取得 webpack 文件的控制权
    * `react-app-rewired`
        >通过创建一个config-overrides.js文件来对 webpack 配置进行扩展。
        1. 配置config-overrides.js
        ```js
            const { injectBabelPlugin } = require('react-app-rewired');
            module.exports = function override(config, env) {
                // 修改配置
            config.resolve.alias['@'] = path.join(__dirname,'./src/')
    
                config = injectBabelPlugin([
                    "@babel/plugin-proposal-decorators", { "legacy": true }
                ], config);
                
                return config;
            }
        ```
        2. 修改package.json中的npm script
        ```json
            "scripts": {
                -   "start": "react-scripts start",
                +   "start": "react-app-rewired start",
                -   "build": "react-scripts build",
                +   "build": "react-app-rewired build",
                -   "test": "react-scripts test --env=jsdom",
                +   "test": "react-app-rewired test --env=jsdom",
                    "eject": "react-scripts eject"
            }
        ```
    
        > PS: react-app-rewired2.x 已经把所有配置方法移置到了`customize-cra`模块
        ```js
            const {override,addDecoratorsLegacy,disableEsLint,useBabelRc,fixBabelImports} = require('customize-cra');
            module.exports = override(
                addDecoratorsLegacy(), // 装饰器支持
                fixBabelImports('import',{ libraryName: "antd", style: "css" })
            )
         ```



## 2.项目优化

### 优化类型

* 性能优化
  * 合并压缩
  * 服务器压缩
  * 按需加载
    * UI框架按需加载
    * 路由懒加载
  * 图片优化
    * base64编码
  * 事件委托
  * 虚拟DOM
  * ...
* 用户体验优化
* 搜索引擎优化

### React项目优化

React项目常出现的问题是打包体积过大，导致线上访问页面过慢，可以通过以下方式进行优化

#### 路由懒加载

* 传统写法

```js
    import React from "react";
    import {Switch,Route} from 'react-router-dom';
    import Home from './pages/Home';
    import Mine from './pages/Mine';
    import Login from './pages/Login';
    <Switch>
        <Route path="/home" component={Home}/>
        <Route path="/mine" component={Mine}/>
        <Route path="/login" component={Login}/>
    </Switch>
```

* 路由懒加载

  > 通过 `React.lazy()` 与 `import()` 实现组件的懒加载（需要安装`@babel/plugin-syntax-dynamic-import`进行支持）

  ```jsx
      import React, {Suspense, lazy } from "react";
      import {Switch,Route} from 'react-router-dom';
      const Home = lazy(() => import("./pages/Home"));
      const Mine = lazy(() => import("./pages/Mine"));
      const Login = lazy(() => import("./pages/Login"));
      <Suspense fallback={<div>loading...</div>}>
          <Switch>
              <Route path="/home" component={Home}/>
              <Route path="/mine" component={Mine}/>
              <Route path="/login" component={Login}/>
          </Switch>
      </Suspense>
  ```

  > 路由懒加载在打包编译后与传统的方式有很大区别

#### UI框架按需加载

* 传统引入方式

  ```js
      import { Row,Col,Menu,Upload } from 'antd';
      import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
  ```

  这种方式会导致把整个antd的js和css全部引入项目，但你的页面中也许只需要antd中的某一个小功能的代码，这样会造成打包文件过大的问题，所以需要使用按需加载的方式

* 按需加载

  * 手动按需引入

    > 缺点：引入繁琐，代码量过大，不容易维护

    ```js
        import DatePicker from 'antd/es/date-picker'; // 加载 JS
        import 'antd/es/date-picker/style/css'; // 加载 CSS
        // import 'antd/es/date-picker/style';         // 加载 LESS
    ```

  * 使用 `babel-plugin-import`（推荐）

    > 需要配置babel插件, 可以在`webpack.config.js` 、`babel.config.js`、`.babelrc`任意一种方式中配置

    ```json
        {
            "plugins": [
                ["import", {
                "libraryName": "antd",
                "libraryDirectory": "es",
                "style": "css" // `style: true` 会加载 less 文件
                }]
            ]
        }
    ```

    配置完后，只需要编写以下代码，babel会自动帮我们引入js和css代码

    ```js
        import { DatePicker } from 'antd';
    ```

#### 服务器压缩

> Gzip 是高效的，压缩后通常能帮我们减少响应 70% 左右的大小，在NodeJS中需要安装第三方中间件`compression`来启动服务器gzip压缩

* Gzip 压缩背后的原理：是在一个文本文件中找出一些重复出现的字符串、临时替换它们，从而使整个文件变小。根据这个原理，文件中代码的重复率越高，那么压缩的效率就越高，使用 Gzip 的收益也就越大。反之亦然

* node服务器开启zip

```js
    const compression = require('compression');
    app.use(compression());
```

* webpack-dev-server开启gzip

```js
    devServer: {
        contentBase: path.join(__dirname, "./src"),
        host: "0.0.0.0",
        compress:true
    },
```