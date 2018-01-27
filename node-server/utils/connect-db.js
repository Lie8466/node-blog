/**
 * Created by li on 18/12/2017.
 */
const config = require('./config');
const mysql = require('mysql');

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

exports.connetDB = connetDB;
