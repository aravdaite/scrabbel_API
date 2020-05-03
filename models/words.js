const mongoose = require('mongoose');


const WordsSchema = new mongoose.Schema({
    words: {
        type: String,
    }
});


module.exports = mongoose.model('Word', WordsSchema);