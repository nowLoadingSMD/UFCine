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
    tags: [
        {
            type: Schema.Types.ObjectId, ref: 'Tag'
        }
    ],
    genres: [
        {
           type: Schema.Types.ObjectId, ref: 'Genre' 
        }
    ],
    directors: [
        {
            type: Schema.Types.ObjectId, rel: 'User'
        }
    ],
    script: [
        {
            type: Schema.Types.ObjectId, rel: 'User'
        }
    ],
    cast: [
        {
            type: Schema.Types.ObjectId, rel: 'User'
        }
    ]
})

const ProductionInfo = mongoose.model("ProductionInfo", ProductionInfoSchema)

module.exports = ProductionInfo