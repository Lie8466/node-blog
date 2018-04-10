# node-blog

本工程基于node+express+mysql+element-ui，搭建了一个博客，可注册登录

# 使用方法

1. git clone 到本地

2. cd到node-blog文件夹

3. npm install

4. npm run dev

5. 浏览器打开http://localhost:3303/



# 数据库配置  node-server

```
npm run server
```
http://localhost:3000

#### 配置文件 config.js

#### datebase: node_blog
#### table: user_info
```
create table user_info (userId INT AUTO_INCREMENT, userName char(100) not null, userPassword char(100) not null,createDate char(100), primary key(userId));
```
userId: 用户id，关键字

userName: 用户名

userPassword: 密码

createDate: 创建时间

#### table blog_List

```
create table blog_list (blogId INT AUTO_INCREMENT, blogTitle char(100) not null, blogContent text, createDate char(100), userId char(100), primary key(blogId));

```
blogId: blog Id

blogTitle: 博客标题

blogContent: 博客内容

createDate: 博客创建时间

userId: 用户Id


