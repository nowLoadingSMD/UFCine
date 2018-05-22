const mongoose = require("mongoose")

const FavoriteSchema = mongoose.Schema({
    videoID: {
        type: Object,
        required: true
    },
    userID: {
        type: Object,
        required: true
    }
})

const Favorite = mongoose.model("Favorite", FavoriteSchema)

Favorite.getVideosByUserID = () => {
    
}

module.exports = Favorite