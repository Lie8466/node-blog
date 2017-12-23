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
const bodyParser = require('body-parser');


app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
}));

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
    extended: true
})); // for parsing application/x-www-form-urlencoded

service.initApp(app);

module.exports = app.listen(3303, function (err) {
    if (err) {
        return
    }
    var uri = 'http://localhost:3303';
    console.log('Listening at ' + uri + '\n')
})
