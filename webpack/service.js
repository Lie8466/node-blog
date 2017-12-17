/**
 * Created by li on 16/12/2017.
 */
const mysql = require('mysql');

function initApp (app) {
    app.post('/register', function (req, res) {
        console.log(req.body);
        const body = req.body;
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'host',
            password: '',
            database: 'node_blog'
        });

        connection.connect();

        connection.query(`insert into user_info (user_name, user_password, create_date) values \
        ("${body.username}", "${body.password}", "${body.date}")`,
            (error) => {
            if (error) {
                console.log(error);
                res.send({
                    message: error,
                    status: 1,
                    data: {}
                });
            } else {
                console.log('insert into user_info (user_name, user_password, create_date) values');
                res.send({
                    message: '注册成功',
                    status: 0,
                    data: {}
                });
            }
        });
    });
}

exports.initApp = initApp;
