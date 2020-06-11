const mongoose = require('mongoose');


const WordSevenSchema = new mongoose.Schema({
    words: {
        type: String,
    }
});

module.exports = mongoose.model('wordsevens', WordSevenSchema);
