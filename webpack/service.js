/**
 * Created by li on 16/12/2017.
 */
const mysql = require('mysql');

function initApp (app) {
    app.post('/register', function (req, res) {
        const body = req.body;
        const query = `insert into user_info (user_name, user_password, create_date) values \
        ("${body.username}", "${body.password}", "${body.date}")`;
        connetDB(query)
            .then(result => {
                console.info(result);
                res.send({
                    message: '注册成功',
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

    app.post('/login', function (req, res) {
        console.log(req.body);
        const body = req.body;
        const query = `select * from user_info where user_name="${body.username}" and user_password="${body.password}"`;
        connetDB(query)
            .then(result => {
                console.info(result);
                if (result.length) {
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
}

function connetDB(query) {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'host',
        password: '',
        database: 'node_blog'
    });
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
