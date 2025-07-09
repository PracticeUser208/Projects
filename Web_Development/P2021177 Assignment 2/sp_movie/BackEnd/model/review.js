// Name: Brenden Tung Jian Hui
// Admission No.: 2021177
// Class: DISM/FT/2B/22

const db = require("./databaseConfig");

module.exports = {

    // Used by Endpoint 11
    insertReview: function (reviewInfo, movieid, callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                console.log("Endpoint 11: Error in insertReview (1st)", err);
                return callback(err, null);
            }
            else {
                const searchMovieID = "SELECT * FROM movie WHERE movieid = ?";
                dbConn.query(searchMovieID, movieid, (movieError, movieResult) => {
                    if (movieResult.length == 0) {
                        console.log("Endpoint 11: Movie ID Is Invalid!");
                        return callback(null, "Invalid Movie ID");
                    }
                    else {
                        var movieInfoRequest = [reviewInfo.rating, reviewInfo.review];
                        var movieInfoCheck = [];
                        for (var a = 0; a < movieInfoRequest.length; a++) {
                            if (movieInfoRequest[a] == '') {
                                movieInfoCheck.push(movieInfoRequest[a]);
                            }
                        }

                        setTimeout(function () {
                            var userid = reviewInfo.userid;
                            if (userid == undefined) {
                                dbConn.end();
                                console.log("Endpoint 11: Not All Values Are Provided! (400)");
                                return callback(null, "Not Provided");
                            }
                            else {
                                const searchUserID = "SELECT * FROM user WHERE userid = ?";
                                dbConn.query(searchUserID, userid, (error, results) => {
                                    if (error) {
                                        return callback(error, null);
                                    }
                                    else if (results.length == 0) {
                                        console.log("Endpoint 11: User ID Is Invalid! (404)");
                                        return callback(null, "Invalid User ID");
                                    }
                                    else {
                                        if (movieInfoCheck.length != 0) {
                                            console.log("Endpoint 11: Values Must Be Filled In! (411)");
                                            return callback(null, "Value Error");
                                        }
                                        else {
                                            const getReviewQuery = "SELECT movieid FROM review where userid = ?;";
                                            dbConn.query(getReviewQuery, userid, (checkerr, checkmovieid) => {
                                                if (checkerr) {
                                                    return callback(checkerr, null);
                                                }
                                                else {
                                                    console.log(checkmovieid)
                                                    var check = 0;
                                                    for (var a = 0; a < checkmovieid.length; a++) {
                                                        if (checkmovieid[a].movieid == movieid) {
                                                            return callback(null, "Present");
                                                        }
                                                        else {
                                                            check += 1;
                                                        }
                                                    }
                                                    if (check == checkmovieid.length) {
                                                        const insertReviewInfoQuery =
                                                            "INSERT INTO review (movieid, userid, rating, review) VALUES (?, ?, ?, ?);";
                                                        dbConn.query(insertReviewInfoQuery,
                                                            [movieid, userid, reviewInfo.rating, reviewInfo.review], (error, results) => {
                                                                if (error) {
                                                                    if (error.errno == 1048) {
                                                                        console.log("Endpoint 11: Not All Values Are Provided! (400)");
                                                                    }
                                                                    else {
                                                                        console.log("Endpoint 11: Error in insertReview (2nd)", error);
                                                                    }
                                                                    return callback(error, null);
                                                                }
                                                                else {
                                                                    const getReviewIDQuery = "SELECT reviewid FROM review WHERE review = ?;";
                                                                    dbConn.query(getReviewIDQuery, reviewInfo.review, (err, getreview) => {
                                                                        if (err) {
                                                                            console.log("Endpoint 11: Error in insertReview (3rd)", err);
                                                                            return callback(err, null);
                                                                        }
                                                                        else {
                                                                            return callback(null, getreview[0])
                                                                        }
                                                                    })
                                                                }
                                                            });
                                                    }
                                                }
                                            });
                                        }
                                    }
                                });
                            }
                        }, 2000);
                    }
                });
            }
        });
    },

    // Used by Endpoint 12
    findReviewByID: function (movieID, callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                console.log("Endpoint 12: Error in findReviewByID (1st)", err);
                return callback(err, null);
            } else {
                const findReviewByIDQuery =
                    "SELECT movieid, review.userid, username, rating, review, review.created_at FROM review, user WHERE review.userid = user.userid && review.movieid = ?;";
                dbConn.query(findReviewByIDQuery, [movieID], (error, results) => {
                    dbConn.end();
                    if (error) {
                        console.log("Endpoint 12: Error in findReviewByID (2nd)", error);
                        return callback(error, null);
                    }
                    else if (results.length == 0) {
                        return callback(null, null);
                    }
                    else {
                        return callback(null, results);
                    }
                });
            }
        });
    }
}
