const express = require("express")
const jwt = require("jsonwebtoken")
const path = require("path")
const fs = require("fs")

const authConfig = require("../config/auth")

const router = express.Router()

const Video = require("../models/Video")


router.get("/videoPlayer", (req, res) => {

    const id = req.query.id

    Video.findById(id, (err, video) => {
        res.render('index', { 
            title: video.name,
            path: video.path 
        });
    })


})

router.get("/videoStream", (req, res) => {

    const path = 'assets/sample.mp4'
    const stat = fs.statSync(path)
    const fileSize = stat.size
    const range = req.headers.range
    if (range) {
      const parts = range.replace(/bytes=/, "").split("-")
      const start = parseInt(parts[0], 10)
      const end = parts[1]
        ? parseInt(parts[1], 10)
        : fileSize-1
      const chunksize = (end-start)+1
      const file = fs.createReadStream(path, {start, end})
      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'video/mp4',
      }
      res.writeHead(206, head);
      file.pipe(res);
    } else {
      const head = {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
      }
      res.writeHead(200, head)
      fs.createReadStream(path).pipe(res)
    }

})

router.post("/uploadVideo", async (req, res) => {

    const video = req.body
    video.path = "../assets/sample.mp4"

    console.log(video)

    Video.addVideo(video, (err, video) => {

        if (err) {
            throw err
        }

    })
    
    res.json({ res: "Ok"})

})

router.post("/", async (req, res) => {

    const limit = req.body.limit
    // console.log(limit)
    Video.getVideos((err, videos) => {

        if (err) {
            throw err
        }

        res.json(videos)
    }, limit)

})


module.exports = (app) => app.use("/api/video", router) 