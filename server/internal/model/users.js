const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema({
    email: { type: String },
    password: { type: String },
    role: { type: String },
});

module.exports = mongoose.model('Users', user, 'Users');