const express = require('express');
const router = express.Router();
const developer = require('./developer');

router.use('/developers', developer);

module.exports = router;