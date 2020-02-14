const _get = require('lodash/get');
const users = require('../../model/users');
const roles = require('../../model/roles');

exports.login = async (req, res, next) => {
    const response = {
        email: req.body.email,
        password: req.body.password,
    }
    const profile = await users.find(response) || { };

    const role = _get(profile[0], 'role', '');
    const access = role ? await roles.findById(role) : {};

    const resp = { profile, role: access };

    res.send(resp);
}