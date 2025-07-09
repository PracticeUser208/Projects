// Name: Brenden Tung Jian Hui
// Admission No.: 2021177
// Class: DISM/FT/2B/22

const db = require("./databaseConfig");

module.exports = {

    // Used by Endpoint 5
    insertGenre: function (genreInfo, callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                console.log("Endpoint 5: Error in insertGenre (1st)", err);
                return callback(err, null);
            }

            var genreInfoRequest = [genreInfo.genre, genreInfo.description];
            var genreInfoCheck = [];
            for (var a = 0; a < genreInfoRequest.length; a++) {
                if (genreInfoRequest[a] == '') {
                    genreInfoCheck.push(genreInfoRequest[a]);
                }
            }

            if (genreInfoCheck.length != 0) {
                console.log("Endpoint 5: Values Must Be Filled In! (411)");
                return callback(null, "Value Error");
            }
            else {
                const insertGenreInfoQuery = "INSERT INTO genre (genre, description) VALUES (?, ?);";
                dbConn.query(
                    insertGenreInfoQuery, genreInfoRequest, (error, results) => {
                        dbConn.end();
                        if (error) {
                            if (error.errno == 1062) {
                                console.log("Endpoint 5: Please Choose Another Genre Name! (422)");
                            }
                            else if (error.errno == 1048) {
                                console.log("Endpoint 5: Not All Values Are Provided! (400)");
                            }
                            else {
                                console.log("Endpoint 5: Error in insertGenre (2nd)", error);
                            }
                            return callback(error, null);
                        }
                        else {
                            console.log(`Endpoint 5: ID: ${results.insertId} (204)`);
                            return callback(null, results.insertId);
                        }
                    });
            }
        });
    },

    // Used by Endpoint 6
    findAllGenreInfo: function (callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                console.log("Endpoint 6: Error in findAllGenreInfo (1st)", err);
                return callback(err, null);
            }
            else {
                const findAllGenreInfoQuery = "SELECT genreid, genre, description FROM genre;";
                dbConn.query(findAllGenreInfoQuery, (error, results) => {
                    dbConn.end();
                    if (error) {
                        console.log("Endpoint 6: Error in findAllGenreInfo (2nd))", error);
                        return callback(error, null);
                    }
                    else if (results.length == 0) {
                        console.log("Endpoint 6: There Are No Genre Found! (404)");
                        return callback(null, null);
                    }
                    else {
                        console.log("Endpoint 6: Results in findAllGenreInfo:", results);
                        return callback(null, results);
                    }
                });
            }
        });
    },

    findGenres: function (callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                return callback(err, null);
            }
            else {
                const findAllGenreInfoQuery = "SELECT genreid, genre, description FROM genre;";
                dbConn.query(findAllGenreInfoQuery, (error, results) => {
                    dbConn.end();
                    if (error) {
                        console.log("Endpoint 6: Error in findAllGenreInfo (2nd))", error);
                        return callback(error, null);
                    }
                    else if (results.length == 0) {
                        console.log("Endpoint 6: There Are No Genre Found! (404)");
                        return callback(null, null);
                    }
                    else {
                        console.log("Endpoint 6: Results in findAllGenreInfo:", results);
                        return callback(null, results);
                    }
                });
            }
        });
    },

}
