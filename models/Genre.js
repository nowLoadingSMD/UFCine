const mongoose = require("mongoose")

const GenreSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    }
})

const Genre = mongoose.model("Genre", GenreSchema)

Genre.getGenres = (limit, callback) => {
    Genre.find(callback).limit(limit)
}

module.exports = Genre