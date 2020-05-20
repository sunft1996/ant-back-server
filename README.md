<h1 align="center">ant-back-server</h1>

![node](https://img.shields.io/badge/node-v12.13.1-blue)
![MIT](https://img.shields.io/badge/license-MIT-red)
![koa](https://img.shields.io/badge/koa-%5E2.11.0-yellow)

ant-back是一个网站后台项目，实现了多角色登录、角色管理、用户管理、富文本、图片上传等常用功能。你可以在本项目基础上定制自己的后台系统。

:rocket: [查看效果点这里](http://back.1cloud.xyz/)

:gem: [前端项目地址点这里](https://github.com/sunft1996/ant-back/)

## 说明
> 项目跑起来后首页有使用说明，里面有接口文档，还有添加页面、添加接口的教程。
> 
> 数据库文件在/sql目录下。
> 
> 如果对您对此项目有兴趣，可以点 "Star" 支持一下 谢谢！:stuck_out_tongue_closed_eyes:

## 技术栈
前端：react + ant-design-pro

后端：node.js + koa + sequelize + mysql

## 安装和运行
> 请确保已安装node

```
git clone git@github.com:sunfutao/ant-back-server.git
cd ant-back-server
npm install 
// 安装依赖后项目运行
node index.js
```
## 项目部署

```
// 服务器安装pm2，防止node服务挂掉
npm i -s pm2 
// 启动程序，在4000端口启动
pm2 start index.js --name 'ant-back-server'

```


## License
[MIT](https://github.com/sunfutao/ant-back-server/blob/master/LICENSE)