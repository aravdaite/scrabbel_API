const Dictionary = require('oxford-dictionary');
const asyncHandler = require('../middleware/async');

//instantiate dictionary as singleton
const config = {
    app_id: "b52d3e18",
    app_key: "040d5c739fcb24d336b32814603df8eb",
    source_lang: "en-us"
};

const dict = new Dictionary(config);


// @desc      Get word meaning
// @route     PUT /api/meaning/oxford/:word
// @access    Public
exports.oxfordMeaning = asyncHandler(async (req, res, next) => {

    let word = req.params.word;
    let response = {};
    let top;

    const props = {
        word: word,
        //filter: "lexicalCategory=noun, verb, adjective, adverb, pronoun"
        // target_language: "es"
    };

    var lookup = dict.find(props);

    await lookup.then((res) => {
        res.results.map((result, index) => {
            const obj = {}
            result.lexicalEntries.map((entry, index2) => {
                const def = [];
                entry.entries.map(index3 => {
                    index3.senses.map(index => {
                        if (index.definitions != null) {
                            def.push(index.definitions[0]);
                        }
                        else {
                            def.push(index.crossReferenceMarkers[0]);
                        }
                    })
                })
                Object.assign(obj, { [entry.lexicalCategory.text]: def })
            })
            Object.assign(response, { [index]: obj })
        })
    })
        .catch((err) => console.log(err))

    res
        .status(200)
        .json({
            success: true,
            response
        });
})

