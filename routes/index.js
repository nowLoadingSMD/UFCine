var express = require('express');
var router = express.Router();

const User = require("../models/user")
const Video = require("../models/Video")
const ProductionInfo = require("../models/ProductionInfo")

/* GET home page. */
router.get('/pages/home.html', async function(req, res, next) {

  let emCartazItem = {
    "name": "PQPQP",
    "description": "HUE",
    "exibitionLocation": "Caralho's house"
  };

  let emCartaz = [];

  for (let i = 0; i < 5; i++){
    emCartaz.push(emCartazItem);
  }

  let releases = []

  let d = new Date()

  d.setDate(d.getDate() - 30)

  console.log(d)

  await Video
    .find({ "created_on": d.getDate })
    .limit(6)
    .exec ( async (err, result) => {

      let resultReleases = result

      await Video
        .find({ "quantityOfViewLastWeek": 0 })
        .limit(6)
        .exec( (err, result) => {

          res.render('pages/home', {
            emCartazList: emCartaz,
            releasesList: resultReleases,
            recommendedList: result
          });
        })
    })

});

router.get("/pages/about.html", function(req,res, next) {
  res.render('pages/about');
})

router.get("/pages/authors.html", function(req,res, next) {
  res.render('pages/authors');
})

router.get("/pages/browse.html", function(req,res, next) {
  res.render('pages/browse');
})

router.get("/pages/editProfile.html", function(req,res, next) {
  res.render('pages/editProfile');
})

router.get("/pages/favorites.html", function(req,res, next) {
  res.render('pages/favorites');
})

router.get("/pages/genre.html", function(req,res, next) {
  res.render('pages/genre');
})

router.get("/pages/player.html", function(req,res, next) {

  var id = req.query.id

  Video.findById(id, (err, video) => {
    ProductionInfo
      .find({"videoID": video._id})
      .exec( (err, productionInfo) => {
        console.log(productionInfo)
        res.render('pages/player', {
                                    video: video,
                                    productionInfo: productionInfo[0]
                                    });
      })
  })
  
})

router.get("/pages/portfolio.html", function(req,res, next) {
  res.render('pages/portfolio');
})

router.get("/pages/profile.html", function(req,res, next) {
  const userID = req.query.id
  console.log(userID)
  User.findById(userID, (err, user) => {
    user.password = null
    Video
      .find({producerID: userID})
      .exec( (err, videos) => {
        res.render('pages/profile', {user: user, videosPosted: videos});
      })
  })  
  
})

router.get("/pages/recommended.html", function(req,res, next) {
  
  let d = new Date()
  Video
    .find({"created_on": d.getDate })
    .exec( (err, result) => {
      res.render('pages/recommended', {recommendedList: result});
    })

})

router.get("/pages/releases.html", function(req,res, next) {

  let d = new Date()
  Video
    .find({"created_on": d.getDate })
    .exec( (err, result) => {
      res.render('pages/releases', {releasesList: result});
    })

})

router.get("/pages/tag.html", function(req,res, next) {
  res.render('pages/tag');
})

router.get("/pages/uploadedFilms.html", function(req,res, next) {
  res.render('pages/uploadedFilms');
})

router.get("/pages/watchList.html", function(req,res, next) {
  res.render('pages/watchList');
})

module.exports = (app) => app.use("/", router) 
