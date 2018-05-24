const express = require("express")
const router = express.Router()

const ProductionInfo = require("../models/ProductionInfo")

router.get("/", (req, res) => {

    const id = req.query.videoID

    ProductionInfo.
        findOne( {videoID: id }).
        populate('tags', 'name').
        exec( (err, productionInfo) => {
            if (err)
                throw err
            res.json(productionInfo)
        })
})

router.post("/createProductionInfo", (req, res) => {

    const productionInfo = req.body

    ProductionInfo.create(productionInfo, (err, productionInfo) => {

        if (err) 
            throw err

        res.json( { err: null })
    })
})

module.exports = (app) => app.use("/api/productionInfo", router)