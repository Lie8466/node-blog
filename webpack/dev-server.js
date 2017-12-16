/**
 * Created by li on 09/12/2017.
 */
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const config = require('./webpack.conf.js');
const compiler = webpack(config);
const service = require('./service.js');


app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
}));

service.initApp(app);

module.exports = app.listen(3303, function (err) {
    if (err) {
        console.log(err)
        return
    }
    var uri = 'http://localhost:3303';
    console.log('Listening at ' + uri + '\n')
})
