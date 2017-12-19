# node-blog

本工程基于node+express+mysql+element-ui，搭建了一个博客，可注册登录

# 使用方法

1. git clone 到本地

2. cd到node-blog文件夹

3. npm install

4. npm run dev

5. 浏览器打开http://localhost:3303/

# 数据库配置 config.js

#### datebase: node_blog
#### table: user_info
```
create table user_info (user_id INT AUTO_INCREMENT, user_name char(100) not null, user_password char(100) not null,create_date char(100), primary key(user_id));
```
user_id: 用户id，关键字

user_name: 用户名

user_password: 密码

create_date: 创建时间


