---
title: webpack基本配置
---

# webpack基本配置

## 代码块

```js
// 文件名:webpack.config.js

const {resolve} = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

process.env.NODE_ENV = 'production';

const commonCssLoader = [
    MiniCssExtractPlugin.loader,
    'css-loader',
    {
        
    }
]

module.exports={
    // 入口
    entry:{
        main:resolve(__dirname,'src/main.js'),
    },
    output:{
        //打包后输出的文件名
        filename:'"js/[name]-[hash:5]-bundle.js"',
        path:resolve(__dirname,'dist')
    },
    module:{}

}
```