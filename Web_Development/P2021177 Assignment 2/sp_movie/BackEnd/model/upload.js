// Name: Brenden Tung Jian Hui
// Admission No.: 2021177
// Class: DISM/FT/2B/22

const db = require("./databaseConfig");

module.exports = {

    // Used by Endpoint 17
    uploadImage: function (imageInfo, movieid, callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                console.log("Endpoint 17: Error in uploadImage (1st)", err);
                return callback(err, null);
            }
            else {
                var image_fullpath = "/images/" + imageInfo.image.name;
                if (imageInfo.image.size < 1000000 && imageInfo.image.type == "image/jpeg") {
                    const insertImageQuery = "INSERT INTO image (movie_id, image_path) VALUES (?, ?)";
                    dbConn.query(insertImageQuery, [movieid, image_fullpath], (error, results) => {
                        if (error) {
                            console.log("Endpoint 17: Error in uploadImage (2nd)", error);
                            return callback(error, null);
                        }
                        else {
                            console.log(`Endpoint 17: ID: ${results.insertId} (201)`);
                            return callback(null, results);
                        }
                    });
                }
                else if (imageInfo.image.size >= 1000000) {
                    console.log("Endpoint 17: File Size Greater Than 1MB! (413)");
                    return callback(null, "OverSize");
                }
                else if (imageInfo.image.type != "image/jpeg") {
                    console.log("Endpoint 17: Invalid File Type! (415)");
                    return callback(null, "IFT");
                }
            }
        });
    },

    // Used by Endpoint 18
    getAllImages: function (callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                console.log("Endpoint 18: Error in getAllImages (1st)", err);
                return callback(err, null);
            } else {
                const searchMovieIDQuery = "SELECT movie_id, image_path FROM image;";
                dbConn.query(searchMovieIDQuery, (error, results) => {
                    dbConn.end();
                    if (error) {
                        console.log("Endpoint 18: Error in getAllImages (2nd)", error);
                        return callback(error, null);
                    }
                    else if (results.length == 0) {
                        console.log("Endpoint 18: Invalid Image ID (404)");
                        return callback(null, null);
                    }
                    else {
                        console.log("Endpoint 18: Results in getAllImages:", results);
                        return callback(null, results);
                    }
                });
            }
        });
    }
}
