/**
 * Created by li on 16/12/2017.
 */

function initApp (app) {
    app.post('/register', function (req, res) {
        res.send({
            message: '注册成功',
            status: 0,
            data: {}
        });
    });
}

exports.initApp = initApp;
