const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userName: {
        type: String,
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    age: {
        type: Number
    }
});

module.exports.User = mongoose.model('User', userSchema);