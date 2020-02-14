const mongoose = require('mongoose');
const Logs = mongoose.model('Logs', {
    createAt: Date,
    point: Number,
    device: String,
});
  
const users = mongoose.model('Users', {
    email: String,
    password: String,
    role: String,
});
  
const roles = mongoose.model('Roles', {
    name: String,
    access: Array,
});

module.exports = {
    Logs,
    users,
    roles,
}