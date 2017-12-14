/**
 * Created by li on 09/12/2017.
 */
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const config = require('./webpack.conf.js');
const compiler = webpack(config);


app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
}));

app.post('/register', function (req, res) {
    res.send({
        message: '注册成功',
        status: 0,
        data: {}
    });
});

module.exports = app.listen(3303, function (err) {
    if (err) {
        console.log(err)
        return
    }
    var uri = 'http://localhost:3303';
    console.log('Listening at ' + uri + '\n')
})
