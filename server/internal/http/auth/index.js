const express = require('express');
const Controller = require('../../controller/auth');
const router = express.Router();


router.post('/login', Controller.login);

module.exports = router;
