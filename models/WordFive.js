const mongoose = require('mongoose');


const WordFiveSchema = new mongoose.Schema({
    words: {
        type: String,
    }
});

module.exports = mongoose.model('wordfives', WordFiveSchema);