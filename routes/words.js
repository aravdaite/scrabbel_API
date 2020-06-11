
const express = require('express');
const {
    findword
} = require('../controllers/words');

const router = express.Router();


router.get('/findword/:number', findword);

module.exports = router;