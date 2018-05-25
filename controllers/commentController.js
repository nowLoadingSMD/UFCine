const express = require("express")
const router = express.Router()

const Comment = require("../models/Comment")

router.post("/", (req, res) => {
    const params = req.body

    if (params.videoID) {

        // Comment.
        //     find( {videoID: params.videoID} ).
        //     exec( (err, comments) => {
        //         if (err)
        //             throw err

        //         res.json(comments)
        //     })

        // console.log("Hello")

        Comment.getByVideoID(params.videoID)
            .then( (result) => {
                res.json(result)
            })
    
    } else if (params.userID) {

        Comment
            .find( { userID: params.userID } ).
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

    Comment.create(comment, (err, comment) => {
        if (err)
            throw err
        
        res.json( {err: null} )
    })
})

module.exports = (app) => app.use("/api/comment", router)