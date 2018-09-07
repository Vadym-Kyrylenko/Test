const express = require('express');

const controllers = require('../controllers/controllers.js');

const router = express.Router();

router.post('/', controllers.task1);
router.get('/task2', controllers.task2);
router.get('/task3', controllers.task3);

module.exports = router;
