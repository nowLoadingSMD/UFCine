const express = require("express")
const fileUpload = require("express-fileupload")
const jwt = require("jsonwebtoken")
const path = require("path")
const formidable = require("formidable")
const fs = require("fs")

const authConfig = require("../config/auth")

const GenreEnum = require("../config/genreEnum")

const router = express.Router()

const Tag = require("../models/Tag")
const Video = require("../models/Video")
const ProductionInfo = require("../models/ProductionInfo")

router.get("/videoPlayer", (req, res) => {

    const id = req.query.id

    Video.findById(id, (err, video) => {
        res.render('index', { 
            title: video.name,
            path: video.path 
        });
    })

})

router.get("/randomVideo", (req, res, next) => {

    Video.find({}, (err, videos) => {
  
      const index =  Math.floor((Math.random() * videos.length - 1) + 1);

      res.json({
            name: videos[index].name,
            videoImg: videos[index].thumbnailHorizontalPath,
            videoID: videos[index]._id
        })
    
    //   res.redirect(`/pages/player.html?id=${videos[index]._id}`)
    })
  
})

router.get("/videoStream", (req, res) => {

    const id = req.query.id;

    Video.findById(id, (err, video) => {
        try {
            console.log(video.path)
            const path = video.path
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
        } catch(e) {
            console.log(e)
            res.status(500).send({ err: 'Problema ao carregar o vídeo!' });
        }
    })



})

router.post("/upload", (req, res) => {

    if(req.body.name){
        console.log(req.body.name)
    } else {
        console.log("Nada")
        console.log(req)
    }

})

router.post("/uploadVideo", async (req, res) => {

    const userID = req.query.id
    const directorsArr = []
    const scriptArr = []
    const castArr = []
    let tagsArr = []
    let tagsID = []
    let private

    if (req.body.private === "None") {
        private = true
    } else {
        private = false
    }

    console.log(private)

    const propsNames = Object.getOwnPropertyNames(req.body)

    tagsArr = req.body.tags.split(",")
    tagsArr.pop(tagsArr[tagsArr.length - 1])

    tagsArr.forEach(async function(item){
        Tag
            .find({name: item})
            .exec( async (err, tag) => {
                if (tag.length) {
                    tagsID.push(tag[0]._id)
                } else {
                    var tag = new Tag()
                    tag.name = item
                    var id
                    tag.save(async function(err, tag) {
                        id = await tag.id
                    })
                    tagsID.push(await id)
                }
            })
    })

    propsNames.forEach(function(item){

        if ( item.includes("role") ) {

            let index =  item.replace("role", "")
            
            switch ( req.body[item] ) {
                case "director": 
                    index = "studentName" + index
                    directorsArr.push(req.body[index])
                    break;
                case "script":
                    index = "studentName" + index
                    scriptArr.push(req.body[index])
                    break;
                case "actor": 
                    index = "studentName" + index
                    castArr.push(req.body[index])
                    break;
                default:
                    break;
            }
        }

    })

    if (!req.files)
        return res.send({err: "No files uploaded"})
    
    let videoMP4 = req.files.videoMP4
    let thumbnailVertical = req.files.thumbnailVertical
    let thumbnailHorizontal = req.files.thumbnailHorizontal

    let video = {
        name: req.body.name,
        thumbnailVerticalPath: "public/img/videoImg/vertical",
        thumbnailHorizontalPath: "public/img/videoImg/horizontal",
        path: "assets",
        producerID: userID,
        quantityOfApplauses: 0,
        onExposition: false,
        quantityOfView: 0,
        quantityOfViewLastWeek: 0,
        private: private
    }

    Video.addVideo(video, async (err, video) => {

        if (err) {
            throw err
        }

        let id = video._id

        let productionInfo = {
            videoID: video._id,
            description: req.body.description,
            classification: req.body.classification,
            year: req.body.year,
            tags: await tagsID,
            genre: GenreEnum[req.body.genre],
            colaborative: true,
            colaborativeList: req.body.colaborative,
            directors: directorsArr,
            script: scriptArr,
            cast: castArr
        }

        ProductionInfo.create(productionInfo, (err, productionInfo) => {
            if (err) 
                throw err

            thumbnailVertical.mv(`public/img/videoImg/vertical/${id}.jpg`, (error) => {
                if (error) throw error

                Video.findByIdAndUpdate(id, { $set: { thumbnailVerticalPath: `/img/videoImg/vertical/${id}.jpg` }}, { new: true }, function (err, video) {
                    if (err) throw err

                    thumbnailHorizontal.mv(`public/img/videoImg/horizontal/${id}.jpg`, (error) => {
                        if (err) throw error

                        Video.findByIdAndUpdate(id, { $set: { thumbnailHorizontalPath: `/img/videoImg/horizontal/${id}.jpg` }}, { new: true }, function (err, video) {
                            if (err) throw err

                            videoMP4.mv(`assets/${id}.mp4`, (error) => {
                                if (error)
                                    return res.status(500).send({err: error})
            
                                Video.findByIdAndUpdate(id, { $set: { path: `assets/${id}.mp4` }}, { new: true }, function (err, video) {
                                    if (err) return handleError(err)
                                    res.send({err: null});
                                });
                            })
                        })
                    })
                });
            })
        })
    })
})

router.get("/", async (req, res) => {

    const limit = req.query.limit

    Video.getVideos((err, videos) => {

        if (err) {
            throw err
        }

        res.json(videos)
    }, limit)

})

router.get("/getVideoByID", (req, res) => {
    const id = req.query.id

    if (id) {
        Video.findById(id, (err, video) => {
            if (err)
                throw err
                
            res.json(video)
        })
    }
})

router.post("/getVideosByTagID", (req, res) => {

    const tagID = req.body.tagID

    if (tagID) {
        
        ProductionInfo
            .find( {tags: tagID })
            .populate('videoID')
            .select("videoID")
            .exec( (err, result) => {
                if (err)
                    throw err

                res.json(result)
            })
    }

})

router.post("/getVideosByGenrerID", (req, res) => {
    const genreID = req.body.genreID

    if (genreID) {
        ProductionInfo
            .find( {genres: genreID })
            .populate('videoID')
            .select("videoID")
            .exec( (err, result) => {
                if (err)
                    throw err

                res.json(result)
            })
    }

})

router.post("/getVideosByProducerID", (req, res) => {
    const producerID = req.body.producerID

    if (producerID) {
        Video
            .find( {producerID: producerID })
            .populate('videoID')
            .select("videoID")
            .exec( (err, result) => {
                if (err)
                    throw err

                res.json(result)
            })
    }

})

router.post("/setApplauses", (req, res) => {
    const videoID = req.body.videoID

    console.log(req.body.applauses)

        if (videoID) {     
    
        Video.findById(videoID, (err, video) => {
            if (err)
                throw err

            //else
            Video.findByIdAndUpdate(videoID, { $set: { quantityOfApplauses: parseInt(video.quantityOfApplauses) + parseInt(req.body.applauses) }}, { new: true }, function (err, video) {
                        if (err) return handleError(err);
                        res.send({
                                    err: null,
                                    quantityOfApplauses: video.quantityOfApplauses
                                });
                    });
            })
        }
})

router.get("/getApplauses", (req, res) => {
    
    Video.findById(req.query.id, (err, video) => {
        if (err) throw err

        res.json({applauses: video.quantityOfApplauses})
    })

})



module.exports = (app) => app.use("/api/video", router) 
