/*
Navicat MySQL Data Transfer

Source Server         : 我的主机
Source Server Version : 50557
Source Host           : 139.199.152.16:3306
Source Database       : common

Target Server Type    : MYSQL
Target Server Version : 50557
File Encoding         : 65001

Date: 2020-05-19 18:11:43
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for article
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `type` bigint(20) DEFAULT NULL,
  `remark` varchar(255) DEFAULT NULL,
  `content` longtext,
  `create_date` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of article
-- ----------------------------
INSERT INTO `article` VALUES ('2', '如何新建一个列表页', '1', '新建页面', '<h3>步骤：</h3><h3>1. 添加页面文件（内容直接复制基础列表页，本地路径：/src/pages/Demo/List.js）；</h3><p><img src=\"http://127.0.0.1:4000/uploadImg/1589858923127_image.png\" style=\"max-width:100%;\"><span style=\"color: rgba(0, 0, 0, 0.65); font-size: 14px;\"><br></span></p><h3>2. 在前端路由配置文件中添加路由（ 本地路径：/config/router.config.js&nbsp; ）；</h3><p><span style=\"color: rgba(0, 0, 0, 0.65); font-size: 14px;\"><br></span></p><p><img src=\"http://127.0.0.1:4000/uploadImg/1588831306668_image.png\" style=\"max-width:100%;\"><span style=\"color: rgba(0, 0, 0, 0.65); font-size: 14px;\"><br></span></p><p><span style=\"color: rgba(0, 0, 0, 0.65); font-size: 14px;\"><br></span></p><h3>3. 菜单管理页面：添加菜单（菜单URL需要与路由配置中的path一致）；&nbsp;&nbsp;<br></h3><p><br></p><p><img src=\"http://127.0.0.1:4000/uploadImg/1588821941286_image.png\" style=\"color: rgba(0, 0, 0, 0.65); font-size: 14px; max-width: 100%;\"></p><p><br></p><h3><p>4. 角色管理页面：给角色分配菜单权限；</p><p><br></p></h3><p><img src=\"http://127.0.0.1:4000/uploadImg/1588822281286_image.png\" style=\"max-width: 100%;\"></p><p><br></p><h3>5. 重新登录系统后可以看到菜单栏发生变化（注：必须重新登录，因为所有菜单页面是在用户登录时后端返回的）&nbsp; &nbsp;</h3><p>&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</p><p><img src=\"http://127.0.0.1:4000/uploadImg/1588822533011_image.png\" style=\"max-width: 100%;\"></p><p><br></p><h3><p>6. 修改你的List文件，把请求路径修改为新的接口（接口格式参考：<a href=\"http://localhost:8000/article/detail?id=5\" target=\"_blank\">接口文档</a>）；</p><p><br></p></h3><p><img src=\"http://127.0.0.1:4000/uploadImg/1588822834456_image.png\" style=\"max-width: 100%;\"></p><p><span style=\"color: rgba(0, 0, 0, 0.85);\"><br></span></p><h3>7.接口成功返回后，我们需要修改表格显示的字段：&nbsp;<span style=\"color: rgba(0, 0, 0, 0.65); font-size: 14px;\">&nbsp;</span><span style=\"color: rgba(0, 0, 0, 0.85);\">&nbsp;</span></h3><p><br></p><p><img src=\"http://127.0.0.1:4000/uploadImg/1588823478073_image.png\" style=\"max-width: 100%;\"></p><p><br></p><h3>8. 修改表格的数据源：&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;<br></h3><p><br></p><p><img src=\"http://127.0.0.1:4000/uploadImg/1588823708217_image.png\" style=\"max-width: 100%;\"></p><p><br></p><h3>9. 修改查询条件。</h3><p><img src=\"http://127.0.0.1:4000/uploadImg/1589859700207_image.png\" style=\"max-width:100%;\"><br></p><h3>10.修改删除接口路径。</h3><h3>11.修改新增、修改、详情页面。</h3><h3>12.列表页完成。&nbsp;<br></h3>', '2020-04-24 00:00:00', '2020-05-19 03:41:45');
INSERT INTO `article` VALUES ('5', '接口文档——基础列表页', '1', '接口文档', '<h2>基础列表页</h2><h3>1. 基础列表</h3><p>请求方法：POST</p><p>请求路径：/empty-item/demo/list</p><p>请求参数：createdAt（Array），remark，type（0：全部，1：banner，2：海报）</p><p>返回结果：</p><p><img src=\"http://127.0.0.1:4000/uploadImg/1588832231454_image.png\" style=\"max-width:100%;\"><br></p><h3>2. 详情</h3><p>请求方法：GET</p><p>请求路径：/empty-item/demo/detail</p><p>请求参数：id</p><p>返回结果：</p><p><img src=\"http://127.0.0.1:4000/uploadImg/1588832943047_image.png\" style=\"max-width:100%;\"><br></p><h3>3. 新增/修改</h3><p>请求方法：POST</p><p>请求路径：/empty-item/demo/saveOrUpdate</p><p>请求参数：id（修改时必填），type（必填，0：全部，1：banner，2：海报），url（必填，图片相对路径）,remark，</p><p>返回结果：</p><p><img src=\"http://127.0.0.1:4000/uploadImg/1588833256434_image.png\" style=\"max-width:100%;\"><br></p><h3>4. 上传图片</h3><p>请求方法：POST</p><p>请求路径：/empty-item/api/uploadImg</p><p>请求参数：file（Form Data）</p><p>返回结果：</p><p><img src=\"http://127.0.0.1:4000/uploadImg/1588833553012_image.png\" style=\"max-width:100%;\"><br></p><h3>5. 删除</h3><p>请求方法：POST</p><p>请求路径：/empty-item/demo/delete</p><p>请求参数：id</p><p>返回结果：</p><p><img src=\"http://127.0.0.1:4000/uploadImg/1588833725493_image.png\" style=\"max-width:100%;\"><br></p>', '2020-05-07 06:10:11', '2020-05-07 06:42:15');
INSERT INTO `article` VALUES ('6', '如何模拟接口数据', '1', 'mock', '<p>Mock 数据是前端开发过程中必不可少的一环，是分离前后端开发的关键链路。通过预先跟服务器端约定好的接口，模拟请求数据甚至逻辑，能够让前端开发独立自主，不会被服务端的开发所阻塞。</p><p>在 Ant Design Pro 中，因为我们的底层框架是 umi，而它自带了代理请求功能，通过代理请求就能够轻松处理数据模拟的功能。</p><h2 id=\"使用-umi-的-mock-功能\">使用 umi 的 mock 功能</h2><p>直接在&nbsp;<span style=\"font-weight: bold; color: rgb(0, 0, 0);\">/mock/api.js&nbsp;</span>文件中添加要模拟的接口即可：</p><pre><code>// 支持自定义函数，API 参考 express@4\n// 这是首页图表的模拟接口\n  \'POST /api/general/chartList\': (req, res) =&gt; {<br>    const list = [<br>      {<br>        time: \"2020-05-18\",<br>        type: \"1\",<br>        amount: 102000,<br>        num: 303<br>      },<br>      {<br>        time: \"2020-05-19\",<br>        type: \"1\",<br>        amount: 131000,<br>        num: 200<br>      },<br>      {<br>        time: \"2020-05-20\",<br>        type: \"1\",<br>        amount: 83000,<br>        num: 400<br>      },<br>      {<br>        time: \"2020-05-21\",<br>        type: \"1\",<br>        amount: 137000,<br>        num: 30<br>      },<br>      {<br>        time: \"2020-05-22\",<br>        type: \"1\",<br>        amount: 61000,<br>        num: 99<br>      },<br>      {<br>        time: \"2020-05-23\",<br>        type: \"1\",<br>        amount: 100000,<br>        num: 230<br>      },<br>      {<br>        time: \"2020-05-24\",<br>        type: \"1\",<br>        amount: 50000,<br>        num: 130<br>      }<br>    ];<br>    res.end(JSON.stringify({<br>      code:\'SUCCESS\',<br>      data:list<br>    }));<br>  },</code></pre><p>添加结束后，直接在前端添加请求即可：</p><p><span style=\"font-weight: bold;\">General.js</span></p><pre><code>// 请求图标数据，这里是mock的数据<br>  getChartData = () =&gt; {<br>    request(\'/api/general/chartList\', {<br>      method: \'POST\',<br>      data:JSON.stringify({})<br>    }).then(res =&gt; {<br>      if (res.code === \'SUCCESS\') {<br>        this.setState({<br>          list: res.data,<br>        });<br>      }<br>    });<br>  };</code></pre><p><br></p>', '2020-05-18 06:31:59', '2020-05-18 06:43:34');
INSERT INTO `article` VALUES ('7', '如何给后端项目添加接口', '1', '如何给后端项目添加接口', '<p>以下示例展示如何添加一个新模块，通过它你可以了解 接收请求-&gt;处理请求整个流程。</p><h2>1.添加路由文件</h2><p>在routes目录下添加demo.js文件，并添加代码：</p><p><span style=\"font-weight: bold;\">/routes/demo.js&nbsp;&nbsp;</span><br></p><div><div><pre><code>const router = require(\'koa-router\')();<br>const demo = require(\'../controllers/demo\');\n\nrouter.get(\'/empty-item/demo/detail\', demo.queryDetail);<br>module.exports = router;</code></pre><h2>2.引入路由文件</h2></div></div><p>在根目录下index.js文件中添加一下配置</p><p><span style=\"font-weight: bold;\">/index.js</span></p><pre><code><p>const demo = require(\'./routes/demo\');</p>...\n\n// routes<br>app.use(role.routes(), role.allowedMethods());<br>app.use(user.routes(), user.allowedMethods());<br>app.use(menu.routes(), menu.allowedMethods());<br>app.use(article.routes(), article.allowedMethods());<br>app.use(api.routes(), api.allowedMethods());<br>//添加的新路由<br>app.use(demo.routes(), demo.allowedMethods());</code></pre><p><divcourier new\',=\"\" monospace;font-weight:=\"\" normal;font-size:=\"\" 16px;line-height:=\"\" 22px;white-space:=\"\" pre;\"=\"\"></divcourier></p><h2>3.添加controller层</h2><p>在controllers目录下添加demo.js文件</p><pre><code>const { <span style=\"font-size: 1em;\">demoModel</span><span style=\"font-size: 1em;\">} = require(\'../models/index\');</span><br>const Sequelize = require(\'sequelize\');\n<p>// 获取列表<br>exports.query = async ctx =&gt; {};</p><p>// 详情<br>exports.queryDetail = async ctx =&gt; {};</p>\n</code></pre><h2>4.添加model层</h2><p>后端项目利用sequelize做ORM，这样你就不需要写sql语句来操作数据库，直接利用它简单的语法即可完成CRUD。</p><p>在models目录下添加demo.js文件&nbsp;&nbsp;<br></p><pre><code>const Sequelize = require(\'sequelize\');<br>const sequelize = require(\'../config/sequelizeBase\');<br><br>const demoModel = sequelize.define(\'demo\', {<br>    id: {<br>        type: Sequelize.BIGINT,<br>        primaryKey: true,<br>        allowNull: false,<br>        autoIncrement: true<br>    },<br>    url: {<br>        type: Sequelize.BIGINT,<br>    },<br>    type: {<br>        type: Sequelize.STRING(255),<br>    },<br>    remark: {<br>        type: Sequelize.STRING(255),<br>    },<br>    createdAt: {<br>        type: Sequelize.DATE,<br>        field: \'create_date\'<br>    },<br>    updatedAt: {<br>        type: Sequelize.DATE,<br>        field: \'update_date\'<br>    },<br>}, {<br>    // 启用时间戳<br>    timestamps: true,<br>    freezeTableName: true,<br>});<br><br>module.exports = demoModel;</code></pre><p>以上步骤完成后，重启后端服务即可。</p><pre><code>// 关闭后重新执行\nnode index.js</code></pre><p><br></p>', '2020-05-18 07:36:25', '2020-05-19 03:07:28');
INSERT INTO `article` VALUES ('8', '如何给页面添加子权限', '1', '权限', '<h3>1.修改页面代码，以权限可控的列表页（目录：src/pages/Demo/AuthList）这个页面为例：</h3><p>页面需要添加子权限的部分添加<span style=\"color: rgb(194, 79, 74);\">judgePageAuth</span>方法，它接收权限编码作为参数，权限编码你可以自定义。</p><pre><code><p>import judgePageAuth from \'@/utils/judgePageAuth\';</p>// judgePageAuth()返回true或false\n{judgePageAuth(\'deleteAuthList\') &amp;&amp;<br>              &lt;Popconfirm<br>                title=\"确定删除？\"<br>                onConfirm={() =&gt; this.delete(record)}<br>                okText=\"确定\"<br>                cancelText=\"取消\"<br>                className=\"marginLeft\"<br>              &gt;<br>                &lt;a&gt;删除&lt;/a&gt;<br>              &lt;/Popconfirm&gt;<br>            }</code></pre><p><br></p><h3>2.进入菜单管理页面，选择&nbsp;<span style=\"font-weight: bold;\">新建按钮级权限</span>，添加刚刚代码写入的<span style=\"font-weight: bold;\">权限编码</span>:</h3><p><img src=\"http://127.0.0.1:4000/uploadImg/1589853151475_image.png\" style=\"max-width:100%;\"><br></p><p><span style=\"font-weight: bold;\">权限范围</span>：如果你不需要给接口添加权限，选择&nbsp;<span style=\"font-weight: bold;\">页面</span>；如果你需要给接口添加权限，选择&nbsp;<span style=\"font-weight: bold;\">页面+接口</span>，需要填入接口相对路径，后端会根据这个路径拦截用户请求。</p><p><span style=\"font-weight: bold;\">权限编码</span>：权限的唯一编码，在用户登录时会返回当前用户被分配的所有编码，前端页面根据这个编码判断按钮显示隐藏。</p><h3>3.进入角色管理页面，给角色添加权限。</h3><p><img src=\"http://127.0.0.1:4000/uploadImg/1589853884905_image.png\" style=\"max-width:100%;\"><br></p><h3>4.修改角色权限后，相应角色需要重新登录，页面权限生效。</h3>', '2020-05-19 02:18:31', '2020-05-19 03:06:02');

-- ----------------------------
-- Table structure for demo
-- ----------------------------
DROP TABLE IF EXISTS `demo`;
CREATE TABLE `demo` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `url` varchar(255) DEFAULT NULL,
  `remark` varchar(255) DEFAULT NULL,
  `type` bigint(20) DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of demo
-- ----------------------------
INSERT INTO `demo` VALUES ('14', '/uploadImg/1588241143697_1588063559369.jpg', null, '2', '2020-04-30 10:05:51', '2020-05-07 06:30:13');
INSERT INTO `demo` VALUES ('15', '/uploadImg/1588245593998_20200422195303_0-200x200.png', null, '1', '2020-04-30 11:20:02', '2020-04-30 11:20:02');
INSERT INTO `demo` VALUES ('17', '/uploadImg/1589860390617_首页.png', '项目首页', '1', '2020-05-19 03:53:34', '2020-05-19 03:53:34');
INSERT INTO `demo` VALUES ('18', '/uploadImg/1589860607304_角色管理.png', '项目-角色管理页面图片', '1', '2020-05-19 03:56:51', '2020-05-19 03:56:51');
INSERT INTO `demo` VALUES ('19', '/uploadImg/1589862137858_写文章.png', '写文章页面图片', '1', '2020-05-19 04:22:38', '2020-05-19 04:22:38');
INSERT INTO `demo` VALUES ('20', '/uploadImg/1589862281309_图片上传.png', '图片上传页面图片', '1', '2020-05-19 04:24:55', '2020-05-19 04:24:55');

-- ----------------------------
-- Table structure for sys_menu
-- ----------------------------
DROP TABLE IF EXISTS `sys_menu`;
CREATE TABLE `sys_menu` (
  `id` bigint(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL COMMENT '名称',
  `code` varchar(255) NOT NULL DEFAULT '' COMMENT '编码',
  `sort` bigint(10) DEFAULT '0' COMMENT '排序',
  `href` text COMMENT '链接',
  `target` varchar(20) DEFAULT NULL COMMENT '目标（ mainFrame、_blank、_self、_parent、_top）',
  `is_show` char(1) DEFAULT '1' COMMENT '是否在菜单中显示（1：显示；0：不显示）',
  `create_date` datetime DEFAULT NULL COMMENT '创建日期',
  `update_date` datetime DEFAULT NULL COMMENT '最后更新时间',
  `remark` varchar(200) DEFAULT NULL COMMENT '备注',
  `resource_type` varchar(20) DEFAULT NULL COMMENT '类型（menu, button）',
  `parent_id` bigint(20) DEFAULT '0' COMMENT '上级菜单id',
  `deletedAt` datetime DEFAULT NULL,
  `apiUrl` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=utf8 COMMENT='系统菜单表';

-- ----------------------------
-- Records of sys_menu
-- ----------------------------
INSERT INTO `sys_menu` VALUES ('25', '首页', 'general', '0', '/general', null, '1', '2020-04-26 07:35:27', '2020-04-30 08:23:06', null, 'button', '0', null, null);
INSERT INTO `sys_menu` VALUES ('29', '权限控制', 'authoritycontrol', '0', '/authoritycontrol', null, '1', '2019-06-10 06:11:27', '2019-06-10 06:11:27', '1', 'menu', '0', null, null);
INSERT INTO `sys_menu` VALUES ('45', '角色管理', 'sub-authcontrol', '1', '/authoritycontrol/authoritycontrol', null, '1', '2019-06-10 07:12:38', '2020-05-07 03:17:26', '', 'button', '29', null, null);
INSERT INTO `sys_menu` VALUES ('46', '用户管理', 'usercontrol', '2', '/authoritycontrol/usercontrol', null, '1', '2019-06-10 07:13:11', '2019-10-28 18:25:39', '2', 'button', '29', null, null);
INSERT INTO `sys_menu` VALUES ('47', '菜单管理', 'menucontrol', '0', '/authoritycontrol/menucontrol', null, '1', '2019-06-10 07:13:44', '2019-06-10 07:13:44', '2', 'button', '29', null, null);
INSERT INTO `sys_menu` VALUES ('50', '修改密码', 'EditPassword', '1', '/EditPassword', null, '0', '2020-04-22 09:14:04', '2020-04-22 09:14:04', null, 'button', '0', null, null);
INSERT INTO `sys_menu` VALUES ('51', '文章管理', 'article', '1', '/article', null, '1', '2020-04-23 08:45:59', '2020-04-23 08:46:10', '文章管理-菜单', 'menu', '0', null, null);
INSERT INTO `sys_menu` VALUES ('52', '文章列表', 'articlelist', '1', '/article/articlelist', null, '1', '2020-04-23 08:47:40', '2020-04-23 08:47:40', '文章列表', 'button', '51', null, null);
INSERT INTO `sys_menu` VALUES ('53', '写文章', 'articleEditor', '2', '/article/articleEditor', null, '0', '2020-04-23 08:49:32', '2020-04-23 08:49:32', '文章新增、修改页面', 'button', '51', null, null);
INSERT INTO `sys_menu` VALUES ('54', '新增用户', '/empty-item/sysUser/saveOrUpdateUser', '0', null, null, '1', '2020-04-26 05:23:19', '2020-04-26 05:23:19', null, 'pageAuth', '46', null, null);
INSERT INTO `sys_menu` VALUES ('55', '查看用户列表', '/empty-item/sysUser/userList', '0', null, null, '1', '2020-04-26 06:31:43', '2020-04-26 06:31:43', null, 'pageAuth', '46', null, null);
INSERT INTO `sys_menu` VALUES ('57', '删除用户', 'deleteByUser', '0', null, null, '1', '2020-04-26 09:11:12', '2020-04-26 09:56:35', null, 'pageAuth', '46', null, '/empty-item/sysUser/deleteByUser/');
INSERT INTO `sys_menu` VALUES ('60', '用户详情', 'userDetail', '1', '/authoritycontrol/userDetail', null, '0', '2020-04-27 05:23:32', '2020-04-27 06:33:00', null, 'button', '29', null, null);
INSERT INTO `sys_menu` VALUES ('61', '保存文章', 'saveOrUpdateArticle', '0', null, null, '1', '2020-04-27 06:39:44', '2020-04-27 06:39:44', null, 'pageAuth', '53', null, '/empty-item/article/saveOrUpdateArticle');
INSERT INTO `sys_menu` VALUES ('62', '删除角色', 'deleteRole', '0', null, null, '1', '2020-04-27 06:44:31', '2020-04-27 06:44:31', null, 'pageAuth', '45', null, '/empty-item/role/deleteById');
INSERT INTO `sys_menu` VALUES ('63', '保存角色', 'saveOrUpdateRole', '0', null, null, '1', '2020-04-27 06:45:22', '2020-04-27 06:45:22', null, 'pageAuth', '45', null, '/empty-item/role/saveOrUpdateRole');
INSERT INTO `sys_menu` VALUES ('64', '保存菜单', 'saveOrUpdateMenu', '0', null, null, '1', '2020-04-27 07:20:54', '2020-04-27 07:20:54', null, 'pageAuth', '47', null, '/empty-item/sysMenu/saveOrUpdateMenu');
INSERT INTO `sys_menu` VALUES ('65', '删除菜单', 'deleteByMenu', '0', null, null, '1', '2020-04-27 07:21:36', '2020-04-27 07:21:36', null, 'pageAuth', '47', null, '/empty-item/sysMenu/deleteByMenu');
INSERT INTO `sys_menu` VALUES ('66', '删除文章', 'deleteArticle', '0', null, null, '1', '2020-04-27 07:22:20', '2020-04-27 07:22:20', null, 'pageAuth', '52', null, '/empty-item/article/deleteArticle');
INSERT INTO `sys_menu` VALUES ('67', '重置密码', 'resetPassword', '0', null, null, '1', '2020-04-27 07:23:28', '2020-04-27 07:23:28', null, 'pageAuth', '46', null, '/empty-item/sysUser/resetPassword');
INSERT INTO `sys_menu` VALUES ('68', '修改密码', 'editUserPassword', '0', null, null, '1', '2020-04-27 07:24:53', '2020-04-27 07:24:53', null, 'pageAuth', '50', null, '/empty-item/sysUser/editPassword');
INSERT INTO `sys_menu` VALUES ('69', '示例页面', 'demoMenu', '0', '/demo', null, '1', '2020-04-28 06:42:41', '2020-04-28 06:47:57', null, 'menu', '0', null, null);
INSERT INTO `sys_menu` VALUES ('70', '基础列表页', 'basicList', '0', '/demo/list', null, '1', '2020-04-28 06:43:47', '2020-04-28 06:48:08', null, 'button', '69', null, null);
INSERT INTO `sys_menu` VALUES ('71', '新增页', 'addDemo', '0', '/demo/add', null, '0', '2020-04-30 04:01:54', '2020-04-30 08:15:29', null, 'button', '69', null, null);
INSERT INTO `sys_menu` VALUES ('72', '修改页', 'updateDemo', '0', '/demo/update', null, '0', '2020-04-30 04:02:34', '2020-04-30 08:15:43', null, 'button', '69', null, null);
INSERT INTO `sys_menu` VALUES ('73', '基础详情页', 'detailDemo', '0', '/demo/detail', null, '0', '2020-04-30 04:05:18', '2020-04-30 08:15:34', null, 'button', '69', null, null);
INSERT INTO `sys_menu` VALUES ('76', '文章详情', 'detail', '0', '/article/detail', null, '0', '2020-05-07 05:02:48', '2020-05-07 05:02:48', null, 'button', '51', null, null);
INSERT INTO `sys_menu` VALUES ('77', '权限可控的列表页', 'authList', '0', '/demo/authList', null, '1', '2020-05-18 07:46:57', '2020-05-18 07:46:57', null, 'button', '69', null, null);
INSERT INTO `sys_menu` VALUES ('78', '新增按钮', 'addAuthList', '0', null, null, '1', '2020-05-18 08:32:47', '2020-05-18 08:32:47', '新增按钮-权限可控的列表页', 'pageAuth', '77', null, null);
INSERT INTO `sys_menu` VALUES ('79', '编辑按钮', 'editAuthList', '0', null, null, '1', '2020-05-18 08:33:25', '2020-05-18 08:33:25', '编辑按钮-权限可控的列表页', 'pageAuth', '77', null, null);
INSERT INTO `sys_menu` VALUES ('80', '删除按钮', 'deleteAuthList', '0', null, null, '1', '2020-05-18 08:34:24', '2020-05-18 08:34:24', '删除按钮-权限可控的列表页', 'pageAuth', '77', null, null);
INSERT INTO `sys_menu` VALUES ('81', '成功页', 'success', '0', '/demo/success', null, '1', '2020-05-06 08:46:58', '2020-05-06 08:46:58', null, 'button', '69', null, null);
INSERT INTO `sys_menu` VALUES ('82', '失败页', 'error', '0', '/demo/error', null, '1', '2020-05-06 08:47:27', '2020-05-06 08:47:27', null, 'button', '69', null, null);

-- ----------------------------
-- Table structure for sys_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_role`;
CREATE TABLE `sys_role` (
  `id` bigint(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(20) DEFAULT NULL COMMENT '描述',
  `role` varchar(20) DEFAULT NULL COMMENT '角色编码',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=96 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='角色表';

-- ----------------------------
-- Records of sys_role
-- ----------------------------
INSERT INTO `sys_role` VALUES ('22', '超级管理员', 'root');
INSERT INTO `sys_role` VALUES ('94', '游客', 'user');

-- ----------------------------
-- Table structure for sys_role_menu
-- ----------------------------
DROP TABLE IF EXISTS `sys_role_menu`;
CREATE TABLE `sys_role_menu` (
  `role_id` bigint(11) NOT NULL,
  `menu_id` bigint(11) NOT NULL,
  PRIMARY KEY (`role_id`,`menu_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT COMMENT='角色菜单表';

-- ----------------------------
-- Records of sys_role_menu
-- ----------------------------
INSERT INTO `sys_role_menu` VALUES ('22', '25');
INSERT INTO `sys_role_menu` VALUES ('22', '29');
INSERT INTO `sys_role_menu` VALUES ('22', '45');
INSERT INTO `sys_role_menu` VALUES ('22', '46');
INSERT INTO `sys_role_menu` VALUES ('22', '47');
INSERT INTO `sys_role_menu` VALUES ('22', '50');
INSERT INTO `sys_role_menu` VALUES ('22', '51');
INSERT INTO `sys_role_menu` VALUES ('22', '52');
INSERT INTO `sys_role_menu` VALUES ('22', '53');
INSERT INTO `sys_role_menu` VALUES ('22', '54');
INSERT INTO `sys_role_menu` VALUES ('22', '55');
INSERT INTO `sys_role_menu` VALUES ('22', '57');
INSERT INTO `sys_role_menu` VALUES ('22', '60');
INSERT INTO `sys_role_menu` VALUES ('22', '61');
INSERT INTO `sys_role_menu` VALUES ('22', '62');
INSERT INTO `sys_role_menu` VALUES ('22', '63');
INSERT INTO `sys_role_menu` VALUES ('22', '64');
INSERT INTO `sys_role_menu` VALUES ('22', '65');
INSERT INTO `sys_role_menu` VALUES ('22', '66');
INSERT INTO `sys_role_menu` VALUES ('22', '67');
INSERT INTO `sys_role_menu` VALUES ('22', '68');
INSERT INTO `sys_role_menu` VALUES ('22', '69');
INSERT INTO `sys_role_menu` VALUES ('22', '70');
INSERT INTO `sys_role_menu` VALUES ('22', '71');
INSERT INTO `sys_role_menu` VALUES ('22', '72');
INSERT INTO `sys_role_menu` VALUES ('22', '73');
INSERT INTO `sys_role_menu` VALUES ('22', '76');
INSERT INTO `sys_role_menu` VALUES ('22', '77');
INSERT INTO `sys_role_menu` VALUES ('22', '78');
INSERT INTO `sys_role_menu` VALUES ('22', '79');
INSERT INTO `sys_role_menu` VALUES ('22', '80');
INSERT INTO `sys_role_menu` VALUES ('22', '81');
INSERT INTO `sys_role_menu` VALUES ('22', '82');
INSERT INTO `sys_role_menu` VALUES ('94', '25');
INSERT INTO `sys_role_menu` VALUES ('94', '29');
INSERT INTO `sys_role_menu` VALUES ('94', '45');
INSERT INTO `sys_role_menu` VALUES ('94', '46');
INSERT INTO `sys_role_menu` VALUES ('94', '47');
INSERT INTO `sys_role_menu` VALUES ('94', '50');
INSERT INTO `sys_role_menu` VALUES ('94', '51');
INSERT INTO `sys_role_menu` VALUES ('94', '52');
INSERT INTO `sys_role_menu` VALUES ('94', '55');
INSERT INTO `sys_role_menu` VALUES ('94', '60');
INSERT INTO `sys_role_menu` VALUES ('94', '64');
INSERT INTO `sys_role_menu` VALUES ('94', '65');
INSERT INTO `sys_role_menu` VALUES ('94', '69');
INSERT INTO `sys_role_menu` VALUES ('94', '70');
INSERT INTO `sys_role_menu` VALUES ('94', '71');
INSERT INTO `sys_role_menu` VALUES ('94', '72');
INSERT INTO `sys_role_menu` VALUES ('94', '73');
INSERT INTO `sys_role_menu` VALUES ('94', '76');
INSERT INTO `sys_role_menu` VALUES ('94', '77');
INSERT INTO `sys_role_menu` VALUES ('94', '81');
INSERT INTO `sys_role_menu` VALUES ('94', '82');

-- ----------------------------
-- Table structure for sys_user
-- ----------------------------
DROP TABLE IF EXISTS `sys_user`;
CREATE TABLE `sys_user` (
  `id` bigint(11) NOT NULL AUTO_INCREMENT,
  `login_name` varchar(50) NOT NULL COMMENT '用户名',
  `password` varchar(256) DEFAULT NULL COMMENT '登陆密码',
  `real_name` varchar(100) DEFAULT NULL COMMENT '真实姓名',
  `email` varchar(100) DEFAULT NULL COMMENT '电子邮件地址',
  `phone` varchar(200) DEFAULT NULL COMMENT '电话号码',
  `mobile` varchar(200) DEFAULT NULL COMMENT '手机号码',
  `photo` text COMMENT '头像地址',
  `login_ip` varchar(100) DEFAULT NULL COMMENT '最近登陆IP',
  `login_date` datetime DEFAULT NULL COMMENT '最近登陆日期',
  `status` varchar(64) DEFAULT NULL COMMENT '账号状态 0 正常 1 禁用',
  `create_by` varchar(64) DEFAULT NULL COMMENT '创建人ID',
  `create_date` datetime DEFAULT NULL COMMENT '创建日期',
  `update_by` varchar(64) DEFAULT NULL COMMENT '最后更新人ID',
  `update_date` datetime DEFAULT NULL COMMENT '最后更新时间',
  `remark` varchar(200) DEFAULT NULL COMMENT '备注',
  `del_flag` char(1) DEFAULT NULL COMMENT '删除标记（0：正常；1：删除；2：审核）',
  `parent_id` bigint(11) DEFAULT '0' COMMENT '父id（所属上级）',
  `role_id` bigint(11) DEFAULT NULL COMMENT '用户类型 Merchant 商户 Agent 代理 SubAccount 子账户 salesman 业务员',
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT COMMENT='用户信息';

-- ----------------------------
-- Records of sys_user
-- ----------------------------
INSERT INTO `sys_user` VALUES ('53', 'user', 'WKbvIA0TSzA=', '游客2020', null, null, null, null, '::ffff:127.0.0.1', '2020-05-19 09:10:16', null, null, '2020-05-19 08:53:23', null, '2020-05-19 09:24:17', null, null, '0', '94', null);
INSERT INTO `sys_user` VALUES ('54', 'root', 'WKbvIA0TSzA=', 'root', null, null, null, null, '::ffff:127.0.0.1', '2020-05-19 09:23:56', null, null, '2020-05-19 08:57:31', null, '2020-05-19 09:23:56', null, null, '0', '22', null);
