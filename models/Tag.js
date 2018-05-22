const mongoose = require("mongoose")

const TagSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

const Tag = mongoose.model("Tag", TagSchema)

Tag.getTags = () => {

}

Tag.getNameByID = () => {

}


module.exports = Tag