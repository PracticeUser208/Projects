// Name: Brenden Tung Jian Hui
// Admission No.: 2021177
// Class: DISM/FT/2B/22

const db = require("./databaseConfig");
var config = require('../config.js');
var jwt = require('jsonwebtoken');

module.exports = {

    // Used by Endpoint 1
    insertUserInfo: function (userInfo, callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                console.log("Endpoint 1: Error in insertUserInfo (1st)", err);
                return callback(err, null);
            }

            var userInfoRequest = [userInfo.username, userInfo.email, userInfo.contact, userInfo.password, userInfo.type, userInfo.profile_pic_url];
            var userInfoCheck = [];
            for (var a = 0; a < userInfoRequest.length; a++) {
                if (userInfoRequest[a] == '') {
                    userInfoCheck.push(userInfoRequest[a]);
                }
            }

            if (userInfoCheck.length != 0) {
                console.log("Endpoint 1: Values Must Be Filled In! (411)");
                return callback(null, "Value Error");
            }
            else {
                const insertUserInfoQuery =
                    "INSERT INTO user (username, email, contact, password, type, profile_pic_url) VALUES (?, ?, ?, ?, ?, ?);";
                dbConn.query(
                    insertUserInfoQuery, userInfoRequest, (error, results) => {
                        if (error) {
                            if (error.errno == 1062) {
                                console.log("Endpoint 1: Please Choose Another Username! (422)");
                            }
                            else if (error.errno == 1048) {
                                console.log("Endpoint 1: Not All Values Are Provided! (400)");
                            }
                            else {
                                console.log("Endpoint 1: Error in insertUserInfo (2nd)", error);
                            }
                            return callback(error, null);
                        }
                        else {
                            const getInfoQuery = "SELECT userid FROM user WHERE username = ?";
                            dbConn.query(getInfoQuery, userInfo.username, (err, getResult) => {
                                if (err) {
                                    console.log("Endpoint 1: Error in insertUserInfo (3rd)", err);
                                    return callback(err, null);
                                }
                                else {
                                    return callback(null, getResult);
                                }
                            });
                        }
                    });
            }
        });
    },

    // Used by Endpoint 2
    findAllUserInfo: function (callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                console.log("Endpoint 2: Error in findAllUserInfo (1st)", err);
                return callback(err, null);
            }
            else {
                const findAllUserInfoQuery = "SELECT userid, username, email, contact, type, profile_pic_url, created_at FROM user;";
                dbConn.query(findAllUserInfoQuery, (error, results) => {
                    dbConn.end();
                    if (error) {
                        console.log("Endpoint 2: Error in findAllUserInfo (2nd))", error);
                        return callback(error, null);
                    }
                    else if (results.length == 0) {
                        console.log("Endpoint 2: There Are No Users Found! (404)");
                        return callback(null, null);
                    }
                    else {
                        console.log("Endpoint 2: Results in findAllUserInfo:", results);
                        return callback(null, results);
                    }
                });
            }
        });
    },

    // Used by Endpoint 3
    findUserInfoByID: function (userID, callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                console.log("Endpoint 3: Error in findUserInfoByID (1st)", err);
                return callback(err, null);
            }
            else {
                const findUserInfoByIDQuery =
                    "SELECT userid, username, email, contact, type, profile_pic_url, created_at FROM user WHERE userid = ?;";
                dbConn.query(findUserInfoByIDQuery, [userID], (error, results) => {
                    dbConn.end();
                    if (error) {
                        console.log("Endpoint 3: Error in findUserInfoByID (2nd)", error);
                        return callback(error, null);
                    }
                    else if (results.length == 0) {
                        console.log("Endpoint 3: Invalid User ID (404)");
                        return callback(null, null);
                    }
                    else {
                        console.log("Endpoint 3: Results in findUserInfoByID:", results);
                        return callback(null, results);
                    }
                });
            }
        });
    },

    // Used by Endpoint 4
    updateUserInfo: function (updatedInfo, userid, callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                console.log("Endpoint 4: Error in updateUserInfo (1st)", err);
                return callback(err, null);
            }
            else if (updatedInfo.userid != undefined) {
                console.log("Endpoint 4: UserID cannot be updated! (403)");
                return callback(null, "Userid");
            }
            else if (updatedInfo.created_at != undefined) {
                console.log("Endpoint 4: Timestamp cannot be updated! (403)");
                return callback(null, "Time");
            }
            else {
                const userInfoQuery = "SELECT * FROM user WHERE userid = ?;";
                dbConn.query(userInfoQuery, [userid], (error, results) => {
                    if (error) {
                        console.log("Endpoint 4: Error in updateUserInfo (2nd)", error);
                        return callback(error, null);
                    }
                    else if (!error && results.length == 0) {
                        console.log("Endpoint 4: Invalid User ID (404)");
                        return callback(null, null);
                    }
                    else {
                        const updateUserInfoQuery = "UPDATE user SET ? WHERE userid = ?;";
                        dbConn.query(updateUserInfoQuery, [updatedInfo, userid], (error, results) => {
                            dbConn.end();
                            if (error) {
                                if (error.errno == 1062) {
                                    console.log("Endpoint 4: Please Choose Another Username! (422)");
                                }
                                else {
                                    console.log("Endpoint 4: Error in updateUserInfo (3rd)", error);
                                }
                                return callback(error, null);
                            }
                            else {
                                console.log("Endpoint 4: User Information Updated! (204)");
                                return callback(null, results);
                            }
                        });
                    }
                })
            }
        });
    },

    // Used by Endpoint 19
    loginUser: function (username, password, callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = 'SELECT * FROM user WHERE username=? and password=?';
                conn.query(sql, [username, password], function (err, result) {
                    conn.end();
                    console.log(result)
                    if (err) {
                        console.log(err);
                        return callback(err, null);
                    }
                    else {
                        var token = "";
                        if (result.length == 1) {
                            token = jwt.sign({ id: result[0].userid, type: result[0].type }, config.key, {
                                expiresIn: 600
                            });
                        }
                        return callback(null, token, result);
                    }
                });
            }
        });
    }
}
