const bcrypt = require('bcrypt');

const hash = function(plain_text) {
  
let hashed_val = bcrypt.hash(plain_text, 10);
   
return hashed_val; 
};

module.exports = hash;