// Name: Brenden Tung Jian Hui
// Admission No.: 2021177
// Class: DISM/FT/2B/22

var express = require('express');
var formidable = require("formidable");
var fs = require('fs');
var app = express();
var user = require('../model/user.js');
var movie = require('../model/movie.js');
var review = require('../model/review.js');
var genre = require('../model/genre.js');
var screen = require('../model/screen.js');
var upload = require("../model/upload.js");
var verifyToken = require('../auth/verifyToken.js');
var path = require('path');

var cors = require('cors');
app.options('*', cors());
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Endpoint 1: POST /users/
app.post('/users/', verifyToken, (req, res) => {
    user.insertUserInfo(req.body, function (err, result) {
        if (!err && result != "Value Error") {
            res.status(201).send(result[0]);
        }
        else if (!err && result == "Value Error") {
            res.status(411).send("Values Must Be Filled In!");
        }
        else if (err.errno == 1048) {
            res.status(400).send("Not All Values Are Provided!");
        }
        else if (err.errno == 1062) {
            res.status(422).send("Please Choose Another Username!");
        }
        else {
            res.status(500).send("An Error Has Occurred!");
        }
    });
});

// Endpoint 3: GET /users/:id/
app.get('/users/:userid/', function (req, res) {
    const userid = parseInt(req.params.userid);
    user.findUserInfoByID(userid, function (err, result) {
        if (!err && result === null) {
            res.status(404).send("Invalid User ID!");
        }
        else if (!err && result !== null) {
            res.status(200).send(result);
        }
        else {
            res.status(500).send("An Error Has Occurred!");
        }
    });
});

// Endpoint 2: GET /users/
app.get('/users/', verifyToken, function (req, res) {
    user.findAllUserInfo(function (err, result) {
        if (!err && result !== null) {
            res.json({ success: true, Users: JSON.stringify(result) });
            return res.statusCode = 200;
        }
        else if (!err && result == null) {
            res.status(404).send("There Are No Users Found!")
        }
        else {
            res.status(500).send("An Error Has Occurred!");
        }
    });
});

// Endpoint 4: PUT /users/:id/
app.put('/users/:userid/', verifyToken, function (req, res) {
    console.log(req.body)
    const userid = parseInt(req.params.userid);
    user.updateUserInfo(req.body, userid, function (err, result) {
        if (result == "Userid") {
            res.status(403).send("UserID cannot be updated!");
        }
        else if (result == "Time") {
            res.status(403).send("Timestamp cannot be updated!");
        }
        else if (!err && result != null) {
            res.json({ success: true });
            return res.statusCode = 204;
        }
        else if (!err && result == null) {
            res.status(404).send("Invalid User ID!")
        }
        else if (err.errno == 1062) {
            res.status(422).send("Please Choose Another Username!")
        }
        else {
            res.status(500).send("An Error Has Occurred!");
        }
    });
});

// Endpoint 5: POST /genre/
app.post('/genre/', verifyToken, function (req, res) {
    genre.insertGenre(req.body, function (err, result) {
        if (!err && result != "Value Error") {
            res.json({ success: true });
            return res.statusCode = 204;
        }
        else if (!err && result == "Value Error") {
            res.status(411).send("Values Must Be Filled In!");
        }
        else if (err.errno == 1048) {
            res.status(400).send("Not All Values Are Provided!");
        }
        else if (err.errno == 1062) {
            res.status(422).send("Please Choose Another Genre Name!");
        }
        else {
            res.status(500).send("An Error Has Occurred!");
        }
    });
});

// Endpoint 6: GET /genre/
app.get('/genre/', function (req, res) {
    genre.findAllGenreInfo(function (err, result) {
        if (!err && result !== null) {
            res.json({ success: true, Genres: JSON.stringify(result) });
            return res.statusCode = 200;
        }
        else if (!err && result == null) {
            res.status(404).send("There Are No Genre Found!")
        }
        else {
            res.status(500).send("An Error Has Occurred!");
        }
    });
});

// Endpoint 17: POST /movie/upload/:movieid (Bonus Feature: Upload Image)
app.post('/movie/upload/:movieid', verifyToken, function (req, res) {
    var movieid = parseInt(req.params.movieid);
    const uploadedImage = new formidable.IncomingForm();
    uploadedImage.parse(req, function (err, fields, files) {
        upload.uploadImage(files, movieid, function (error, result) {
            if (result == "IFT") {
                res.status(415).send("Invalid File Type!");
            }
            else if (result == "OverSize") {
                res.status(413).send("File Size Greater Than 1MB!");
            }
            else if (result) {
                file_path = "C:\\BED\\P2021177 Assignment 2\\sp_movie\\BackEnd\\public\\images\\" + files.image.name;
                read_file = fs.readFileSync(files.image.path)
                fs.writeFile(file_path, read_file, function (err) {
                    res.status(201).send(`File Successfully Uploaded! (ID: ${result.insertId})`);
                });
            }
            else {
                res.status(500).send("An Error Has Occurred!");
            }
        });
    });
});

// Endpoint 7: POST /movie/ (Edited)
app.post('/movie/', verifyToken, function (req, res) {
    movie.insertMovieInfo(req.body, function (err, result) {
        if (!err && result != "Value Error" && result != "Missing Genre ID") {
            res.json({ success: true });
            return res.statusCode = 201;
        }
        else if (result == "Missing Genre ID" || err.errno == 1048) {
            res.status(400).send("Not All Values Are Provided!");
        }
        else if (!err && result == "Value Error") {
            res.status(411).send("Values Must Be Filled In!");
        }
        else {
            res.status(500).send("An Error Has Occurred!");
        }
    });
});

// Endpoint 18: GET /movie/upload/ (Bonus Feature: Upload Image)
app.get('/movie/upload/', function (req, res) {
    upload.getAllImages(function (error, result) {
        if (result == null) {
            res.status(404).send("Invalid Image ID!");
        }
        else if (result != null) {
            res.status(200).send(result);
        }
        else {
            res.status(500).send("An Error Has Occurred!");
        }
    });
});

// Endpoint 9: GET /movie/:id/
app.get('/movie/:movieid/', function (req, res) {
    const movieid = parseInt(req.params.movieid);
    movie.findMovieInfoByID(movieid, function (err, result) {
        if (!err && result === null) {
            res.status(404).send("Invalid Movie ID!");
        }
        else if (!err && result !== null) {
            res.status(200).send(result);
        }
        else {
            res.status(500).send("An Error Has Occurred!");
        }
    });
});

// Endpoint 8: GET /movie/
app.get('/movie/', function (req, res) {
    movie.findAllMovieInfo(function (err, result) {
        if (!err && result !== null) {
            res.status(200).send(result)
        }
        else if (!err && result == null) {
            res.status(404).send("There Are No Movies Found!")
        }
        else {
            res.status(500).send("An Error Has Occurred!");
        }
    });
});

// Endpoint 10: DELETE /movie/:id/
app.delete('/movie/:id/', verifyToken, function (req, res) {
    const movieid = parseInt(req.params.id);
    movie.deleteMovieInfo(movieid, function (err, result) {
        if (result.affectedRows == 0) {
            res.status(404).send("Invalid Movie ID!");
        }
        else if (!err && result !== null) {
            res.status(204).send(result.affectedRows + " row(s) deleted");
        }
        else {
            res.status(500).send("An Error Has Occurred!");
        }
    });
});

// Endpoint 11: POST /movie/:id/review/
app.post('/movie/:id/review/', verifyToken, function (req, res) {
    const movieid = parseInt(req.params.id);
    review.insertReview(req.body, movieid, function (err, result) {
        if (result == "Invalid Movie ID") {
            res.status(404).send("Invalid Movie ID!");
        }
        else if (result == "Invalid User ID") {
            res.status(404).send("Invalid User ID!");
        }
        else if (result == "Value Error") {
            res.status(411).send("Values Must Be Filled In!");
        }
        else if (!err && result != "Not Provided" && result != "Present") {
            res.status(201).send(result);
        }
        else if (result == "Present") {
            res.status(406).send("Review Exists!");
        }
        else if (result == "Not Provided" || err.errno == 1048) {
            res.status(400).send("Not All Values Are Provided!");
        }
        else {
            res.status(500).send("An Error Has Occurred!");
        }
    });
});

// Endpoint 12: GET /movie/:id/reviews/
app.get('/movie/:id/reviews/', function (req, res) {
    const movieid = parseInt(req.params.id);
    review.findReviewByID(movieid, function (err, result) {
        if (!err && result === null) {
            res.status(404).send("Invalid Movie ID!");
        }
        else if (!err && result !== null) {
            res.status(200).send(result);
        }
        else {
            res.status(500).send("An Error Has Occurred!");
        }
    });
});

// Endpoint 13: GET /movie/:id/timing/ (Bonus Feature: Screen Time)
app.get('/movie/:id/timing/', function (req, res) {
    const movieid = parseInt(req.params.id);
    screen.findAllMovieTiming(movieid, function (err, result) {
        if (result.length == 0) {
            res.status(404).send("Invalid Movie ID!");
        }
        else if (!err && result !== null) {
            res.status(200).send(result);
        }
        else {
            res.status(500).send("An Error Has Occurred!");
        }
    });
});

// Endpoint 14: POST /movie/:id/timing/ (Bonus Feature: Screen Time)
app.post('/movie/:id/timing/', function (req, res) {
    const movieid = parseInt(req.params.id);
    screen.insertTiming(req.body, movieid, function (err, result) {
        if (result == "Invalid Movie ID") {
            res.status(404).send("Movie ID Is Invalid!");
        }
        else if (!err && result != "Not Provided") {
            res.status(201).send(`Record with ID (${result}) inserted`);
        }
        else if (result == "Not Provided" || err.errno == 1048) {
            res.status(400).send("Not All Values Are Provided!");
        }
        else {
            res.status(500).send("An Error Has Occurred!");
        }
    });
});

// Endpoint 15: PUT /movie/:screenid/timing/ (Bonus Feature: Screen Time)
app.put('/movie/:screenid/timing/', function (req, res) {
    const screenid = parseInt(req.params.screenid);
    screen.updateTimingInfo(req.body, screenid, function (err, result) {
        if (!err && result != null) {
            res.status(204).send("Timing Updated!");
        }
        else if (!err && result == null) {
            res.status(404).send("Invalid Screen ID!")
        }
        else {
            res.status(500).send("An Error Has Occurred!");
        }
    });
});

// Endpoint 16: DELETE /movie/:id/timing/ (Bonus Feature: Screen Time)
app.delete('/movie/:id/timing/', function (req, res) {
    const id = parseInt(req.params.id);
    screen.deleteTimingInfo(id, function (err, result) {
        if (result == 0) {
            res.status(404).send("Invalid Screen ID!");
        }
        else if (!err && result !== 0) {
            res.status(200).send(`${result} Row(s) Affected!`);
        }
        else {
            res.status(500).send("An Error Has Occurred!");
        }
    });
});

// Endpoint 19: POST /users/login
app.post('/users/login', function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    console.log(`In BackEnd app.post username: ${username} and password: ${password}`)
    user.loginUser(username, password, function (err, token, result) {
        if (!err & result.length != 0) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            console.log(token)
            delete result[0]['password'];//clear the password in json data, do not send back to client
            console.log(result);
            res.json({ success: true, UserData: JSON.stringify(result), token: token, status: 'You are successfully logged in!' });
            res.send();
        } else {
            res.statusCode = 500;
            res.send();
        }
    });
});

// Endpoint 20: GET /allmovie/search/
app.get('/allmovie/search/', function (req, res) {
    movie.getAllMovieSearch(function (err, result) {
        if (!err && result !== null) {
            res.status(200).send(result)
        }
        else {
            res.status(500).send("An Error Has Occurred!");
        }
    });
});

// Endpoint 21: GET /allmovie/addimage/
app.get('/allmovie/addimage/', function (req, res) {
    movie.getAllMovieAddImage(function (err, result) {
        if (!err && result !== null) {
            res.status(200).send(result)
        }
        else {
            res.status(500).send("An Error Has Occurred!");
        }
    });
});

module.exports = app;
