const mongoose = require("mongoose")
const Schema = mongoose.Schema

const CommentSchema = mongoose.Schema({
    videoID: {
        type: Schema.Types.ObjectId, ref: 'Video',
        required: true
    },
    userID: {
        type: Schema.Types.ObjectId, ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true
    }
})

const Comment = mongoose.model("Comment", CommentSchema)


module.exports = Comment