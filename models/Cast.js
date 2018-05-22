const mongoose = require("mongoose")

const CastSchema = mongoose.Schema({
    productionInfoID: {
        type: Object,
        required: true
    },
    producerID: {
        type: Object,
        required: true
    }
})

const Cast = mongoose.model("Cast", CastSchema)

Cast.getProducerByProductionInfoID = () => {

}

Cast.getProductionInfoByProducerID = () => {
    
}

module.exports = Cast