/**
 * Created by li on 27/01/2018.
 */
const { connetDB } = require('./connect-db');
const oneDayLong = 24 * 60 * 60 * 1000;

// 自定义错误，方便后续识别来源
function APIError (message, status) {
    this.status = status;
    this.message = message;
    this.stack = (new Error()).stack;
}
APIError.prototype = new Error();

function initApp(app) {

// 跨域问题
    app.all('*', function(req, res, next) {
        res.header("Access-Control-Allow-Origin", req.headers.origin);
        res.header("Access-Control-Allow-Credentials", true);
        res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
        res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
        res.header("X-Powered-By",' 3.2.1')
        if(req.method=="OPTIONS") res.sendStatus(200);/*让options请求快速返回*/
        else  next();
    });

    app.post('/register', function (req, res) {
        /*
         步骤1.判断用户名是否已经存在
         步骤2.向表中插入用户名和密码及创建日期
         步骤3.获取用户ID
         */


        function find(query) {
            return new Promise((resolve, reject) => {
                connetDB(query).then(result => {
                    resolve(result);
                })
                    .catch(e => {
                        reject(new APIError(e.message || '查询用户名错误，请重试', 1));
                    })
            });
        }

        function insert(query) {
            return new Promise((resolve, reject) => {
                connetDB(query).then((result) => {
                    resolve(result);
                })
                    .catch(e => {
                        reject(new APIError(e.message || '存储用户名失败', 1));
                    })
            });
        }

        const body = req.body;
        const queryFind = `select * from  user_info where userName="${body.username}"`;
        const queryInsert = `insert into user_info (userName, userPassword, createDate) values \
        ("${body.username}", "${body.password}", "${body.date}");`;


        find(queryFind).then(result => {
            if (result.length) {
                throw new APIError('该用户名已存在，请更换用户名', 1)
            }
            insert(queryInsert).then(() => {
                find(queryFind).then(result => {
                    console.log(result);
                    res.cookie('userId', result[0].userId, { expires: new Date(Date.now() + oneDayLong) });
                    res.cookie('userName', body.username, { expires: new Date(Date.now() + oneDayLong) });
                    res.cookie('createDate', body.date, { expires: new Date(Date.now() + oneDayLong) });
                    res.send({
                        message: '注册成功',
                        status: 0,
                        data: result[0]
                    });
                });
            })
        })
            .catch(error => {
                res.send(new APIError(error.message, error.status || 1));
            });
    });

    app.post('/login', function (req, res) {
        const body = req.body;
        const query = `select userId, userName, createDate from user_info where userName="${body.username}"`;
        connetDB(query)
            .then(result => {
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
                    throw new APIError('无效的用户名或密码');
                }
            })
            .catch(error => {
                res.send(new APIError(error.message, error.status || 1));
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

exports.initApp = initApp;

