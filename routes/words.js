
const express = require('express');
const {
    findword7
} = require('../controllers/words');

const router = express.Router();


router.get('/findword7', findword7);

module.exports = router;