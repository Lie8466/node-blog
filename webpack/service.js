/**
 * Created by li on 16/12/2017.
 */
const mysql = require('mysql');
const config  = require('../config');
const oneDayLong = 24 * 60 * 60 * 1000;

function initApp (app) {
    app.post('/register', function (req, res) {
        /*
        步骤1.判断用户名是否已经存在
        步骤2.向表中插入用户名和密码及创建日期
        步骤3.获取用户ID
         */
        const body = req.body;
        const queryName = `select * from  user_info where userName="${body.username}"`;
        const queryInsert = `insert into user_info (userName, userPassword, createDate) values \
        ("${body.username}", "${body.password}", "${body.date}")`;
        const queryId = `select userId, userName, createDate from user_info where userName="${body.username}"`;
        connetDB(queryName)
            .then(result => {
                if (!result.length) {
                    return false;
                } else {
                    return {
                        message: '该用户名已存在，请更换用户名',
                        status: 1,
                        data: {}
                    };
                }
            })
            .then(data => {
                if (data) {
                    return data;
                } else {
                    connetDB(queryInsert)
                        .then(() => {
                            return false;
                        })
                        .catch(error => {
                            return {
                                message: error || '注册失败',
                                status: 1,
                                data: {}
                            };
                        });
                }
            })
            .then(json => {
                if (json) {
                    res.send(json);
                } else {
                    connetDB(queryId)
                        .then(result => {
                            res.cookie('userId', result[0].userId, { expires: new Date(Date.now() + oneDayLong) });
                            res.cookie('userName', result[0].userName, { expires: new Date(Date.now() + oneDayLong) });
                            res.cookie('createDate', result[0].createDate, { expires: new Date(Date.now() + oneDayLong) });
                            res.send({
                                message: '注册成功',
                                status: 0,
                                data: result[0]
                            });
                        })
                }
            })
            .catch(error => {
                res.send({
                    message: error,
                    status: 1,
                    data: {}
                });
            });
    });

    app.post('/login', function (req, res) {
        console.log(req.body);
        const body = req.body;
        const query = `select userId, userName, createDate from user_info where userName="${body.username}"`;
        connetDB(query)
            .then(result => {
                console.info(result);
                if (result.length) {
                    res.cookie('userId', result[0].userId, { expires: new Date(Date.now() + oneDayLong) });
                    res.cookie('userName', result[0].userName, { expires: new Date(Date.now() + oneDayLong) });
                    res.cookie('createDate', result[0].createDate, { expires: new Date(Date.now() + oneDayLong) });
                    res.send({
                        message: '登录成功',
                        status: 0,
                        data: result[0]
                    });
                } else {
                    res.send({
                        message: '无效的用户名或密码',
                        status: 1,
                        data: {}
                    });
                }
            })
            .catch(error => {
                console.error(error);
                res.send({
                    message: error,
                    status: 1,
                    data: {}
                });
            });
    });

    app.get('/logout', function (req, res) {
        res.cookie('userId', '', {expires: new Date(Date.now())});
        res.cookie('userName', '', {expires: new Date(Date.now())});
        res.cookie('createDate', '', {expires: new Date(Date.now())});
        res.send({
            message: '退出成功',
            status: 0,
            data: {}
        });
    });

    app.get('/blogList', function (req, res) {
        const query = `select * from blog_list where userId="${req.query.userId}"`;
        connetDB(query)
            .then(result => {
                res.send({
                    message: '成功',
                    status: 0,
                    data: result
                });
            })
            .catch(error => {
                console.error(error);
                res.send({
                    message: error,
                    status: 1,
                    data: {}
                });
            });
    });

    app.post('/addBlog', function (req, res) {
        const body = req.body;
        const query = `insert into blog_list (blogTitle, blogContent, createDate, userId) values \
        ("${body.blogTitle}", "${body.blogContent}", "${body.createDate}", "${body.userId}")`;
        connetDB(query)
            .then(() => {
                res.send({
                    message: '新增成功',
                    status: 0,
                    data: {}
                });
            })
            .catch(error => {
                console.error(error);
                res.send({
                    message: error,
                    status: 1,
                    data: {}
                });
            });
    });
}

function connetDB(query) {
    const connection = mysql.createConnection(config.mysql);
    connection.connect();
    return new Promise((resolve, reject) => {
        connection.query(query,
            (error, result) => {
                if (error) {
                    connection.end();
                    reject(error);
                } else {
                    connection.end();
                    resolve(JSON.parse(JSON.stringify(result)));
                }
        });
    });

}

exports.initApp = initApp;
