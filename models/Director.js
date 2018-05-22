const mongoose = require("mongoose")

const DirectorSchema = mongoose.Schema({
    productionInfoID: {
        type: Object,
        required: true
    },
    producerID: {
        type: Object,
        required: true
    }
})

const Director = mongoose.model("Director", DirectorSchema)

Director.getProducerByProductionInfoID = () => {

}

Director.getProductionInfoByProducerID = () => {
    
}

module.exports = Director