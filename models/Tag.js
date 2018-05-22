const mongoose = require("mongoose")

const TagSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

const Tag = mongoose.model("Tag", TagSchema)

Tag.addTag = (tag, callback) => {
    Tag.create(tag, callback)
}

Tag.getTags = (limit, callback) => {
    Tag.find(callback).limit(limit)
}

Tag.getNameByID = (id, callback) => {
    Tag.findById(id, callback)
}


module.exports = Tag