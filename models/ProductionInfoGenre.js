const mongoose = require("mongoose")

const ProductionInfoGenreSchema = mongoose.Schema({
    genreID: {
        type: Object,
        required: true
    },
    ProductionInfoID: {
        type: Object,
        required: true
    }
})

const ProductionInfoGenre = mongoose.model("ProductionInfoGenre", ProductionInfoGenreSchema)

ProductionInfoGenre.getProductionInfoByGenreID = () => {

}

ProductionInfoGenre.getGenreByProductionInfoID = () => {
    
}

module.exports = ProductionInfoGenre