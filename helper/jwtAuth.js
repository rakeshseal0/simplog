const jwt = require("jsonwebtoken");
const config = require("../config.json");

const VerifyJWT = (jwtToken, resp) => {
  jwt.verify(jwtToken, config.JWT_SECRET, (err, res) => {
    if (err) {
      resp.headers(400).send("invalid webtoken");
      return false;
    } else {
      console.log(res);
      return true;
    }
  });
};
module.exports = VerifyJWT;
