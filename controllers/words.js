const WordSeven = require('../models/WordSeven');
const WordSix = require('../models/WordSix');
const WordFive = require('../models/WordFive');
//const Word = require('../models/words');
const asyncHandler = require('../middleware/async');


// @desc      Get word meaning
// @route     PUT /api/meaning/oxford/:word
// @access    Public
exports.findword = asyncHandler(async (req, res, next) => {
    let number = req.params.number;
    let num; //number of words in the collection
    let dataBase;
    console.log(number)
    if (number == 7) {
        dataBase = WordSeven;
        num = 24000;
    } else if (number == 6) {
        dataBase = WordSix;
        num = 500;
    }
    else if (number == 5) {
        dataBase = WordFive;
        num = 500;
    }
    console.log(dataBase)

    let word = await dataBase.find().limit(1).skip(Math.floor(Math.random() * num));
    console.log(word)
    word = word[0];
    res
        .status(200)
        .json({
            success: true,
            word
        });
})