const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const log = new Schema({
    createAt: {type: Date},
    point: {type: Number},
    device: {type: String},
});

module.exports = mongoose.model('Logs', log, 'Logs');
