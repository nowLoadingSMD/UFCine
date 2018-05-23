const mongoose = require("mongoose")

const TagSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

const Tag = mongoose.model("Tag", TagSchema)

Tag.getTags = (limit, callback) => {
    Tag.find(callback).limit(limit)
}

Tag.getNames = (limit) => {

    return (Tag.find( async (err, tags) => {
        names = await tags.length

        return names
    }).limit(limit))

}


module.exports = Tag