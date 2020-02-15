const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const role = new Schema({
    name: { type: String },
    access: { type: Array },
});

module.exports = mongoose.model('Roles', role, 'Roles');