const { users } = require('../../model');
exports.login = (req, res, next) => {
    const response = {
        email: req.email,
        password: req.password,
    }
    users.find(response, (err, docs) => {
        return docs;
    });
}