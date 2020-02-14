const { Logs } = require('../../model');
exports.getLogs = (req, res, next) => {
    Logs.find({}, (err, docs) => {
        if (err) return err;
        return docs;
    });
};

