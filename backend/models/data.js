const mongoose = require('mongoose')

var dataSchema = mongoose.Schema({
    'username' : {
        type : String,
        required : true
    },
    'log' : String,
    'time' : {
        type : Date,
        required : true,
        default : Date.now()
    }
});

module.exports = mongoose.model('data', dataSchema);