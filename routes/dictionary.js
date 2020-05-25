const express = require('express');
const {
    getMeaning,
    validate
} = require('../controllers/dictionary');

const router = express.Router();

router.get('/oxford/:word', getMeaning);
router.get('/validate/:word', validate);

module.exports = router;