const mongoose = require("mongoose")

const ScriptSchema = mongoose.Schema({
    productionInfoID: {
        type: Object,
        required: true
    },
    producerID: {
        type: Object,
        required: true
    }
})

const Script = mongoose.model("Script", ScriptSchema)

Script.getProducerByProductionInfoID = () => {

}

Script.getProductionInfoByProducerID = () => {
    
}

module.exports = Script