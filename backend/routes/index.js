var express = require("express");
var path = require("path");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const userData = require("../models/user");
const logData = require("../models/data");
const randomString = require("../helper/random");
const jwt = require('jsonwebtoken');
// const config = require('./config.json');

var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.sendfile(path.resolve("templates/index.html"));
});

router.post("/login", (req, res) => {
  queryParam = req.body;
  let username = queryParam.user;
  var passwText = queryParam.passw;
  console.log(passwText);
  var passw = bcrypt.hashSync(passwText, 10);

  var existingUserList = userData
    .find({ username: username })
    .exec((err, result) => {
      if (err) {
        res.send("Error while searching for user");
      } else {
        //check if user present in DB or not
        if (result.length < 1) {
          //user not present, create user
          let API = randomString(12);
          var newUser = new userData({
            username: username,
            password: passw,
            API: API
          });
          newUser
            .save()
            .then(data => {
              res.send("new User Created in atlas with API: " + data.API);
            })
            .catch(err => {
              res.send("Unable to create user");
            });
        } else {
          console.log(result[0].password);
          if (bcrypt.compareSync(passwText, result[0].password)) {
            const accessToken = jwt.sign({user : result[0].username, api : result[0].API}, "rakesh");
            res.send({accessToken : accessToken,  api : result[0].API});
          } else {
            res.send("EXISTING USER, INVALID PASSWORD...");
          }
        }
      }
    });
});

router.get("/log", (req, res) => {
  var queryParam = req.query;
  username = queryParam.user;
  api = queryParam.api;
  logText = queryParam.text;

  if (!username) {
    res.send("please provide username");
  } else if (!api) {
    res.send("api not provided");
  }

  userData.find({ username: username }).exec((err, result) => {
    if (err) {
      res.send("Error Finding user");
    } else {
      if (result.length > 0) {
        if (result[0].API == api) {
          var logThisData = new logData({
            username: username,
            log: logText
          });
          logThisData
            .save()
            .then(result => {
              console.log(result.username);
              res.status(200);
              res.send("OK");
            })
            .catch(error => {
              console.log("Error saving Data");
              res.send("Error saving Data");
            });
        } else {
          res.send("Invalid API");
        }
      } else {
        res.send("invaid username");
        console.log("Invalid username: " + username);
      }
    }
  });
});


router.get('/dump', (req, res) => {

  username = req.query.user;
  if(! username){
    res.send("provide username to view log");
  }

  logData.find({'username' : username}).exec((err, result) => {
    var resMsg = [];
    result.forEach((element, index) => {
      // console.log(element);
      resMsg.push({"id": index, "timestamp" : element.time, "logText" : element.log});
    });

    //if no log text found
    if(resMsg.length == 0){
      res.send("No logs Found for user : " + username);
    } else{
      resMsg.unshift({"username" : username});
      res.send(resMsg);
    }

  });

    
});

module.exports = router;
