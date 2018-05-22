const mongoose = require("mongoose")

const CommentSchema = mongoose.Schema({
    videoID: {
        type: Object,
        required: true
    },
    userID: {
        type: Object,
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