const express = require('express');
const Controller = require('../../controller/statistic');
const router = express.Router();


router.get('/dashboard', Controller.getLogs);

module.exports = router;
