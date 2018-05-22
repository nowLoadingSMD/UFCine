const mongoose = require("mongoose")

const ProductionInfoSchema = mongoose.Schema({
    videoID: {
        type: Object,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    classification: {
        type: String,
        required: true
    }
})

const ProductionInfo = mongoose.model("ProductionInfo", ProductionInfoSchema)

module.exports = ProductionInfo