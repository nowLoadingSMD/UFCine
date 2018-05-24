const express = require("express")

const Genre = require("../models/Genre")

const router = express.Router()

router.get("/", async (req, res) => {
    
    const id = req.query.id
    const limit = req.query.limit

    if (id) {
        Genre.findById(id, (err, genre) =>{

            if (err) 
                throw err

            res.json(genre)

        }) 
    } else {
        Genre.getGenres(limit, (err, genres) =>{

            if (err) 
                throw err
            
            res.json(genres)
        })
    }
})

router.post("/createGenre", (req, res) => {

    const genre = req.body

    Genre.create(genre, (err, genre) => {

        if (err) 
            throw err

        res.json({ err: null })
    })
    
})

module.exports = (app) => app.use("/api/genre", router)

