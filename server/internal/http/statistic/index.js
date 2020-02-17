const express = require('express');
const Controller = require('../../controller/statistic');
const router = express.Router();


router.get('/all', Controller.getLogs);
router.post('/set', Controller.setValue);

module.exports = router;
