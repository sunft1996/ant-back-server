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
> 请确保已安装node，nginx，mysql

1. 克隆项目

```
git clone https://github.com/sunft1996/ant-back-server.git
```

2. 创建数据库并导入sql文件
2. 修改config/sequelizeBase.js文件

```
const Sequelize = require('sequelize');
// 参数依次为：要导入的数据库名，账号，密码
const sequelize = new Sequelize('common', 'root', '123456', {
    // 数据库ip
    host: '127.0.0.1',
    dialect: 'mysql'
});

module.exports = sequelize;
```
4. 进入项目根目录执行：

```
npm install 
<!--项目运行-->
npm start
```
## 项目部署

```
// 服务器安装pm2，防止node服务挂掉
npm i -s pm2 
// 启动程序，在4000端口启动
pm2 start index.js --name 'ant-back-server'
// 有安装防火墙的需要打开4000端口
firewall-cmd --zone=public --add-port=4000/tcp
// 重启防火墙
firewall-cmd --reload

// 还可能会用到下面指令
// 项目重启
pm2 restart all
// 查看启动的node项目
pm2 list
// 删除项目进程
pm2 delete ant-back-server

```
修改nginx配置

```
server{
        listen 80;
        # 你的域名或ip
        server_name www.baidu.com;
        
        location ~* \.(gif|jpg|png|webp)$ {
                # 后端项目下的图片存放位置
                root /mnt/ant-back-server/public;
        }

        location / {
                 # 前端打包后的静态文件位置
                 root /mnt/dist;
                 try_files $uri $uri/ /index.html;
        }

        # 请求转发到后端
        location /empty-item {
                proxy_pass http://127.0.0.1:4000;
        }

}

```
重启nginx

```
nginx -s reload
```



## License
[MIT](https://github.com/sunfutao/ant-back-server/blob/master/LICENSE)