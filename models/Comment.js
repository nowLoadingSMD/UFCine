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

Comment.getCommentsByVideoID = () => {

}

Comment.getCommentsByUserID = () => {
    
}

module.exports = Comment