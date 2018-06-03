const express = require("express")
const router = express.Router()

const User = require("../models/user")

router.post("/addToFavorite", (req, res) => {
    User.update(
        { _id: req.body.userID},
        { $addToSet: { favorites: req.body.videoID} },
        (err, sucess) => {
            if (err) res.send({err: "Problema ao adicionar aos favoritos"})
        }
    )

    res.send({err: null})
})

router.post("/addToWatchlist", (req, res) => {
    User.update(
        { _id: req.body.userID},
        { $addToSet: { watchList: req.body.videoID} },
        (err, sucess) => {
            if (err) res.send({err: "Problema ao adicionar aos favoritos"})
        }
    )

    res.send({err: null})
})

module.exports = (app) => app.use("/api/user", router) 