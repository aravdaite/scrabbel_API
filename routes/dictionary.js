const express = require('express');
const {
    oxfordMeaning
} = require('../controllers/dictionary');

const router = express.Router();

router.get('/oxford/:word', oxfordMeaning);

module.exports = router;