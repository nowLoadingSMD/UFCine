const express = require("express")
const router = express.Router()

const Comment = require("../models/Comment")

router.get("/", (req, res) => {
    const videoID = req.query.videoID
    const userID = req.query.userID

    if (videoID) {

        Comment.
            find( {videoID: videoID} ).
            exec( (err, comments) => {
                if (err)
                    throw err

                res.json(comments)
            })

        // console.log("Hello")

        // Comment.getByVideoID(videoID)
        //     .then( (result) => {
        //         res.json(result)
        //     })
    
    } else if (userID) {

        Comment
            .find( { userID: userID } ).
            exec( (err, comments) => {
                if (err)
                    throw err
                
                res.json(comments)
            })
    } else {
        res.json( {err: "It's not possible to return comments"})
    }
})

router.post("/createComment", (req, res) => {

    const comment = req.body
    console.log(comment)
    Comment.create(comment, (err, comment) => {
        if (err)
            throw err
        
        res.json( {err: null} )
    })
})

module.exports = (app) => app.use("/api/comment", router)