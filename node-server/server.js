/**
 * Created by li on 27/01/2018.
 */
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { initApp } = require('./utils/service');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
    extended: true
})); // for parsing application/x-www-form-urlencoded

initApp(app);


var server = app.listen(3000, function () {
    var port = server.address().port;

    console.log('Example app listening at http://localhost:%s', port);
});

