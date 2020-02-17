const Logs = require('../../model');
const _get = require('lodash/get');
const moment = require('moment');
exports.getLogs = (req, res, next) => {
    Logs.find({}, (err, docs) => {
        if (err) return err;
        res.send(docs);
    });
};

exports.setValue = (req, res, next) => {
    const payload = {
        createAt: moment(),
        point: _get(req.body, 'value', 0),
        device: _get(req.body, 'device', 0)
      };
    Logs.insertMany([payload], (err, docs) => {
        if (err) return err;
        res.send(docs);
    });
};
