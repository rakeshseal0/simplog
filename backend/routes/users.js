var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/hash', (req, res) => {

  var text = req.query.text;
  if(!text){
    res.send("No value to hash");
  }
  console.log(text);

  n_sal = 10;

  bcrypt.hash(text, n_sal, (err, hash) => {
    if(err){
      console.log(err);
      res.send("Unexpected error");
    }
    else{
      res.send(hash);
    }
  });

});

router.get('/hashcom', (req, res) => {

  var text = req.query.text;
  var hashed_val = req.query.hashed;
  if(! text){
    res.send("No value to hash");
    
  }
  console.log(text, hashed_val);


  bcrypt.compare(text, hashed_val, (err, result) => {
    if(err){
      console.log(err);
      res.send("Unexpected error");
    }
    else{
      res.send(result);
    }
  });

});

module.exports = router;
