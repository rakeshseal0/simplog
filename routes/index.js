var express = require("express");
var path = require("path");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const userData = require("../models/user");
const logData = require("../models/data");
const randomString = require("../helper/random");
const jwt = require("jsonwebtoken");
const { VerifyJWT } = require("../helper/jwtAuth");
const config = require("../config.json");

var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.sendfile(path.join(__dirname, "/frontend/build"));
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
            API: API,
          });
          newUser
            .save()
            .then((data) => {
              const accessToken = jwt.sign(
                { user: data.username, api: data.API },
                config.JWT_SECRET
              );
              res.send({
                accessToken: accessToken,
                api: data.API,
                new_user: true,
              });
            })
            .catch((err) => {
              res.send("Unable to create user");
            });
        } else {
          console.log(result[0].password);
          if (bcrypt.compareSync(passwText, result[0].password)) {
            const accessToken = jwt.sign(
              { user: result[0].username, api: result[0].API },
              config.JWT_SECRET
            );
            res.send({ accessToken: accessToken, api: result[0].API });
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
  const incomingIP =
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    (req.connection.socket ? req.connection.socket.remoteAddress : null);
  incomingIPAddr = incomingIP.slice(7) === "" ? "null" : incomingIP.slice(7);

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
            log: logText,
            incomingIP: incomingIPAddr,
          });
          logThisData
            .save()
            .then((result) => {
              console.log(result.username);
              res.status(200);
              res.send("OK");
            })
            .catch((error) => {
              console.log("Error saving Data", error);
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

router.get("/dump", (req, res) => {
  username = req.query.user;
  if (!username) {
    res.send("provide username to view log");
  }

  logData.find({ username: username }).exec((err, result) => {
    var resMsg = [];
    result.forEach((element, index) => {
      console.log(element);
      resMsg.push({
        _id: element._id,
        id: index,
        ip: element.incomingIP,
        timestamp: element.createdAt,
        logText: element.log,
      });
    });

    //if no log text found
    console.log(username);
    resMsg.unshift({ username: username });
    res.send(resMsg);
  });
});

router.delete("/delete", (req, res) => {
  const userName = req.query.user;
  const api = req.query.api;
  const id = req.query.id;
  const jwtToken = req.query.jwt;
  // console.log(userName, api);
  try {
    const userdat = userData
      .find({ username: userName })
      .exec((err, result) => {
        if (!err) {
          if (result.length > 0) {
            // () => VerifyJWT(jwtToken, res);
            logData
              .findOneAndRemove({ username: userName, _id: id })
              .exec((err, ress) => {
                if (!err) {
                  if (ress !== null) {
                    res.status(200).send("ok");
                  } else {
                    res.status(400).send("no such log");
                  }
                } else {
                  res.status(500).send("unable to delete");
                }
              });
          } else {
            //user does not exist very rare case
            res.status.send("user does not exist");
          }
        } else {
          console.log("error");
          res.send("error");
        }
      });
  } catch (err) {
    console.log(err);
  }

  // res.send("hello");
});

module.exports = router;
