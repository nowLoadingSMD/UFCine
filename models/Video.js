const mongoose = require("../database")

const VideoSchema = mongoose.Schema({
    name: {
      type: String,
      required: true  
    },
    path: {
        type: String,
        required: true,
        lowercase: true
    },
    publisher: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Video = mongoose.model("Video", VideoSchema)

Video.addVideo = (video, callback) => {
    Video.create(video, callback)
}

Video.getVideos = (callback, limit) => {
    Video.find(callback).limit(limit)
}


module.exports = Video