// Name: Brenden Tung Jian Hui
// Admission No.: 2021177
// Class: DISM/FT/2B/22

const db = require("./databaseConfig");

module.exports = {

    // Used by Endpoint 13
    findAllMovieTiming: function (movieID, callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                console.log("Endpoint 13: Error in findAllMovieTiming (1st)", err);
                return callback(err, null);
            } else {
                const findMovieIDQuery = "SELECT * FROM movie WHERE movieid = ?;";
                dbConn.query(findMovieIDQuery, movieID, (errorMovie, resultsMovie) => {
                    if (resultsMovie.length == 0) {
                        console.log("Endpoint 13: Invalid Movie ID!");
                        dbConn.end();
                        return callback(null, resultsMovie);
                    }
                    else {
                        const findMovieTimingQuery =
                            "SELECT screenid, title, screen_time_1, screen_time_2, screen_time_3 FROM movie, timing WHERE movie.movieid = timing.movieid && movie.movieid = ?;";
                        dbConn.query(findMovieTimingQuery, [movieID], (error, results) => {
                            dbConn.end();
                            if (error) {
                                console.log("Endpoint 13: Error in findAllMovieTiming (2nd)", error);
                                return callback(error, null);
                            }
                            else {
                                console.log("Endpoint 13: Results in findAllMovieTiming:", results);
                                return callback(null, results);
                            }
                        });
                    }
                });
            }
        });
    },

    // Used by Endpoint 14
    insertTiming: function (timingInfo, movieid, callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                console.log("Endpoint 14: Error in insertTiming (1st)", err);
                return callback(err, null);
            }
            else {
                const searchMovieID = "SELECT * FROM movie WHERE movieid = ?";
                dbConn.query(searchMovieID, movieid, (movieError, movieResult) => {
                    if (movieResult.length == 0) {
                        console.log("Endpoint 14: Movie ID Is Invalid!");
                        return callback(null, "Invalid Movie ID");
                    }
                    else {
                        const insertTimingQuery =
                            "INSERT INTO timing (movieid, screen_time_1, screen_time_2, screen_time_3) VALUES (?, ?, ?, ?)";
                        dbConn.query(
                            insertTimingQuery,
                            [movieid, timingInfo.screen_time_1, timingInfo.screen_time_2, timingInfo.screen_time_3], (error, results) => {
                                if (error) {
                                    if (error.errno == 1048) {
                                        console.log("Endpoint 14: Not All Values Are Provided! (400)");
                                    }
                                    else {
                                        console.log("Endpoint 14: Error in insertTiming (2nd)", error);
                                    }
                                    return callback(error, null);
                                }
                                else {
                                    console.log(`Endpoint 14: ID: ${results.insertId} (201)`);
                                    return callback(null, results.insertId);
                                }
                            });
                    }
                });
            }
        });
    },

    // Used by Endpoint 15
    updateTimingInfo: function (updatedInfo, screenid, callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                console.log("Endpoint 15: Error in updateTimingInfo (1st)", err);
                return callback(err, null);
            } else {
                const searchScreenID = "SELECT * FROM timing WHERE screenid = ?;";
                dbConn.query(searchScreenID, [screenid], (error, results) => {
                    if (error) {
                        console.log("Endpoint 15: Error in updateTimingInfo (2nd)", error);
                        return callback(error, null);
                    }
                    else if (results.length == 0) {
                        console.log("Endpoint 15: Invalid Screen ID (404)");
                        return callback(null, null);
                    }
                    else {
                        const updateTimingInfoQuery = "UPDATE timing SET ? WHERE screenid = ?;";
                        dbConn.query(updateTimingInfoQuery, [updatedInfo, screenid], (error, results) => {
                            dbConn.end();
                            if (error) {
                                console.log("Endpoint 15: Error in updateTimingInfo (3rd)", error);
                                return callback(error, null);
                            }
                            else {
                                console.log("Endpoint 15: Timing Updated! (204)");
                                return callback(null, results);
                            }
                        });
                    }
                })
            }
        });
    },

    // Used by Endpoint 16
    deleteTimingInfo: function (id, callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                console.log("Endpoint 16: Error in deleteTimingInfo (1st)", err);
                return callback(err, null);
            } else {
                const deleteTimeByIDQuery = "DELETE FROM timing WHERE screenid = ?;";
                dbConn.query(deleteTimeByIDQuery, [id], (error, results) => {
                    dbConn.end();
                    if (error) {
                        console.log("Endpoint 16: Error in deleteTimingInfo (2nd)", err);
                        return callback(error, null);
                    }
                    else {
                        console.log(`Endpoint 16: ${results.affectedRows} Row(s) Affected (200)`);
                        return callback(null, results.affectedRows);
                    }
                });
            }
        });
    }
}
