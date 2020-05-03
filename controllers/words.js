const Word = require('../models/words');
const asyncHandler = require('../middleware/async');

// @desc      Get word meaning
// @route     PUT /api/meaning/oxford/:word
// @access    Public
exports.findword7 = asyncHandler(async (req, res, next) => {

    const query = {
        state: 'OK',
        rnd: {
            $gte: Math.random()
        }
    };
    let word = await Word.find().limit(1).skip(Math.floor(Math.random() * 22358));;
    word = word[0];
    res
        .status(200)
        .json({
            success: true,
            word
        });
})