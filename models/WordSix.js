const mongoose = require('mongoose');


const WordSixSchema = new mongoose.Schema({
    words: {
        type: String,
    }
});

module.exports = mongoose.model('wordsixs', WordSixSchema);
