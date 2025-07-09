// Name: Brenden Tung Jian Hui
// Admission No.: 2021177
// Class: DISM/FT/2B/22

const mysql = require("mysql");

module.exports = {
    getConnection: function () {
        var conn = mysql.createConnection({
            host: 'localhost',
            port: 3306,
            user: 'root',
            password: 'root', //your own password
            database: 'sp_movie',
            dateStrings: true
        });
        return conn;
    }
};
