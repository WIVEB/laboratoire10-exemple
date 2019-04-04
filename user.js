let mongoose = require('mongoose')
    ,Schema = mongoose.Schema

let userSchema = new Schema({
    _id: String,
    name: String
});

module.exports = mongoose.model('User', userSchema);