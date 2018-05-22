const mongoose = require("mongoose")

const WatchListSchema = mongoose.Schema({
    videoID: {
        type: Object,
        required: true
    },
    userID: {
        type: Object,
        required: true
    }
})

const WatchList = mongoose.model("WatchList", WatchListSchema)

WatchList.getVideosByUserID = () => {

}

module.exports = WatchList