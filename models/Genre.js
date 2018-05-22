const mongoose = require("mongoose")

const GenreSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})

const Genre = mongoose.model("Genre", GenreSchema)

Genre.getGenres = () => {

}

Genre.getDescriptionByID = () => {

}

Genre.getNameByID = () => {
    
}

module.exports = Genre