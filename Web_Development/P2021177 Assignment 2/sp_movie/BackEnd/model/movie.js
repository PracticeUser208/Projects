// Name: Brenden Tung Jian Hui
// Admission No.: 2021177
// Class: DISM/FT/2B/22

const db = require("./databaseConfig");

module.exports = {

    // Used by Endpoint 7
    insertMovieInfo: function (movieInfo, callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                console.log("Endpoint 7: Error in insertMovieInfo (1st)", err);
                return callback(err, null);
            }

            var array = movieInfo.genres.split(",");
            var notFoundID = [];
            var relationshipInfo = [];
            var genre_packet_name = [];
            for (var a = 0; a < array.length; a++) {
                var genrename = array[a];
                const searchID = "SELECT genre FROM genre WHERE genre = ?";
                dbConn.query(searchID, genrename, (error, results) => {
                    if (results[0] != undefined) {
                        var genres_name = results[0].genre;
                        genre_packet_name.push(genres_name);
                    }
                });
            }

            setTimeout(function () {
                var allgenresname = genre_packet_name.join(",");
                console.log(allgenresname)
                // Checking For Empty Fields (Error Code: 411)
                var movieInfoRequest =
                    [movieInfo.title, movieInfo.description, movieInfo.cast, movieInfo.time, movieInfo.opening_date];
                var movieInfoCheck = [];
                for (var b = 0; b < movieInfoRequest.length; b++) {
                    if (movieInfoRequest[b] == '') {
                        movieInfoCheck.push(movieInfoRequest[b]);
                    }
                }

                if (movieInfoCheck.length != 0) {
                    console.log("Endpoint 7: Values Must Be Filled In! (411)");
                    return callback(null, "Value Error");
                }
                else {
                    // Querying Database
                    const insertMovieInfoQuery =
                        "INSERT INTO movie (title, description, cast, time, opening_date) VALUES (?, ?, ?, ?, ?);";
                    dbConn.query(insertMovieInfoQuery, movieInfoRequest, (error, results) => {
                        if (error) {
                            if (error.errno == 1048) {
                                console.log("Endpoint 7: Not All Values Are Provided! (400)");
                            }
                            else {
                                console.log("Endpoint 7: Error in insertMovieInfo (3rd)", error);
                            }
                            return callback(error, null);
                        }
                        else {
                            console.log(`Endpoint 7: Movie ID: ${results.insertId} (201)`);
                            var movieid = results.insertId;
                            const insertRelationshipInfoQuery =
                                "INSERT INTO relationship (fk_movieid, genres) VALUES (?, ?);";
                            dbConn.query(insertRelationshipInfoQuery,
                                [movieid, allgenresname], (errors, result) => {
                                    if (errors) {
                                        console.log("Endpoint 7: Error in insertMovieInfo (2nd)", errors);
                                    }
                                    else {
                                        const getMovieIDQuery = "SELECT movieid FROM movie WHERE title = ?;";
                                        dbConn.query(getMovieIDQuery, movieInfo.title, (err, getResult) => {
                                            dbConn.end();
                                            if (err) {
                                                console.log("Endpoint 7: Error in insertMovieInfo (3rd)", err);
                                                return callback(err, null);
                                            }
                                            else {
                                                return callback(null, getResult[getResult.length - 1]);
                                            }
                                        });
                                        console.log(`Endpoint 7: Relationship ID: ${result.insertId} (201)`);
                                    }
                                });
                        }
                    });
                }
            }, 2000);
        });
    },

    // Used by Endpoint 8
    findAllMovieInfo: function (callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                console.log("Endpoint 8: Error in findAllMovieInfo (1st)", err);
                return callback(err, null);
            }
            else {
                const findAllMovieInfoQuery =
                `
                SELECT movie.movieid, movie.title, ROUND(AVG(review.rating), 2) AS Average, COUNT(review.userid) AS ReviewCount 
                FROM movie
                JOIN review ON movie.movieid = review.movieid
                GROUP BY movie.movieid, movie.title  -- Include both in GROUP BY
                ORDER BY Average DESC, ReviewCount DESC                `
                dbConn.query(findAllMovieInfoQuery, (error, results) => {
                    dbConn.end();
                    if (error) {
                        console.log("Endpoint 8: Error in findAllMovieInfo (2nd))", error);
                        return callback(error, null);
                    }
                    else if (results.length == 0) {
                        console.log("Endpoint 8: There Are No Movies Found! (404)");
                        return callback(null, null);
                    }
                    else {
                        console.log("Endpoint 8: Results in findAllMovieInfo:", results);
                        return callback(null, results);
                    }
                });
            }
        });
    },

    // Used by Endpoint 9
    findMovieInfoByID: function (movieID, callback) {
        var dbConn = db.getConnection();
        console.log(movieID)
        dbConn.connect(function (err) {
            if (err) {
                console.log("Endpoint 9: Error in findMovieInfoByID (1st)", err);
                return callback(err, null);
            } else {
                const findMovieInfoByIDQuery =
                    `
                SELECT movie.movieid, title, description, cast, time, opening_date, genres 
                FROM movie, relationship 
                WHERE movie.movieid = relationship.fk_movieid && movie.movieid = ?;                
                `
                dbConn.query(findMovieInfoByIDQuery, [movieID], (error, results) => {
                    if (error) {
                        console.log("Endpoint 9: Error in findMovieInfoByID (2nd)", error);
                        return callback(error, null);
                    }
                    else if (results.length == 0) {
                        console.log("Endpoint 9: Invalid Movie ID (404)");
                        return callback(null, null);
                    }
                    else {
                        console.log("Endpoint 9: Results in findMovieInfoByID:", results);
                        return callback(null, results);
                    }
                });
            }
        });
    },

    // Used by Endpoint 10
    deleteMovieInfo: function (movieID, callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                console.log("Endpoint 10: Error in deleteMovieInfo (1st)", err);
                return callback(err, null);
            } else {
                const deleteMovieInfoQuery = "DELETE FROM movie WHERE movieid = ?;";
                dbConn.query(deleteMovieInfoQuery, [movieID], (error, results) => {
                    dbConn.end();
                    if (error) {
                        console.log("Endpoint 10: Error in deleteMovieInfo (2nd)", err);
                        return callback(error, null);
                    }
                    else {
                        console.log("Endpoint 10: Results in deleteMovieInfo:", results);
                        return callback(null, results);
                    }
                });
            }
        });
    },

    // Used by Endpoint 20
    getAllMovieSearch: function (callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                return callback(err, null);
            }
            else {
                const findAllMovieInfoQuery = `
                SELECT movieid, title, genres, image_path 
                FROM movie, relationship, image
                WHERE movie.movieid = relationship.fk_movieid && movie.movieid = image.movie_id`
                dbConn.query(findAllMovieInfoQuery, (error, results) => {
                    dbConn.end();
                    if (error) {
                        return callback(error, null);
                    }
                    else if (results.length == 0) {
                        return callback(null, null);
                    }
                    else {
                        console.log(results)
                        return callback(null, results);
                    }
                });
            }
        });
    },

    // Used by Endpoint 21
    getAllMovieAddImage: function (callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                return callback(err, null);
            }
            else {
                const findAllMovieInfoQuery = `SELECT movieid, title FROM movie`
                dbConn.query(findAllMovieInfoQuery, (error, results) => {
                    dbConn.end();
                    if (error) {
                        return callback(error, null);
                    }
                    else if (results.length == 0) {
                        return callback(null, null);
                    }
                    else {
                        console.log(results)
                        return callback(null, results);
                    }
                });
            }
        });
    }
}
