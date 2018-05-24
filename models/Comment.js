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

Comment.getByVideoID = async (id) => {
    let result
    await Comment
            .find( {videoID: id} )
            .exec( async (err, comments) => {
                if (err)
                    throw err
                result = await comments
            //    return comments
            })
    
    console.log(result)
    return result
    // console.log(await result)
}


module.exports = Comment