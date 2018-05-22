const express = require("express")

const router = express.Router()

const Tag = require("../models/Tag")

router.get("/", async (req, res) => {

    const id = req.query.id
    const limit = req.query.limit

    if (id) {
        Tag.findById(id, (err, tag) => {
            
            if (err) 
                throw err

            res.json(tag)
        })
    } else {
        Tag.getTags(limit, (err, tags) => {

            if (err)
                throw err
    
            res.json(tags)
        }) 
    }
})

router.post("/createTag", async (req, res) => {
    
    const tag = req.body

    Tag.create(tag, (err, tag) => {

        if (err) 
            throw err

        res.json({ res: "OK" })
    })

})

module.exports = (app) => app.use("/api/tags", router)
