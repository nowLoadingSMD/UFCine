const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ProductionInfoSchema = mongoose.Schema({
    videoID: {
        type: Schema.Types.ObjectId, ref: 'Video',
        required: true
    },
    description: {
        type: String,
        required: true
    },
    classification: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    tags: [
        {
            type: Schema.Types.ObjectId, ref: 'Tag'
        }
    ],
    genre: {
           type: Schema.Types.ObjectId, ref: 'Genre' 
    },
    directors: [
        {
            type: String
        }
    ],
    script: [
        {
            type: String
        }
    ],
    cast: [
        {
            type: String
        }
    ]
})

const ProductionInfo = mongoose.model("ProductionInfo", ProductionInfoSchema)

module.exports = ProductionInfo