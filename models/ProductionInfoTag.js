const mongoose = require("mongoose")

const ProductionInfoTagSchema = mongoose.Schema({
    tagID: {
        type: Object,
        required: true
    },
    ProductionInfoID: {
        type: Object,
        required: true
    }
})

const ProductionInfoTag = mongoose.model("ProductionInfoTag", ProductionInfoTagSchema)

ProductionInfoTag.getProductionInfoByTagID = () => {

}

ProductionInfoTag.getTagByProductionInfoID = () => {
    
}

module.exports = ProductionInfoTag