var express = require('express');
var router = express.Router();

const GenreEnum = require("../config/genreEnum")

const User = require("../models/user")
const Video = require("../models/Video")
const ProductionInfo = require("../models/ProductionInfo")

/* GET home page. */
router.get('/pages/home.html', async function(req, res, next) {

  let emCartazItem = {
    "name": "Nome do filme em cartaz",
    "description": "Oi",
    "exibitionLocation": "Algum lugar"
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

          if (err) res.send({err: "Problema ao renderizar página"})

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

router.get("/pages/editPortfolio.html", function(req,res, next) {
  res.render('pages/editPortfolio');
})

router.get("/pages/favorites.html", function(req,res, next) {
  res.render('pages/favorites');
})

router.get("/pages/genre.html", function(req,res, next) {
  const genreName = req.query.genre

  const id = GenreEnum[genreName]

  ProductionInfo.find({"genre": id })
    .populate("videoID")
    .populate("genre")
    .exec( (err, productionInfo) => {

      const videos = productionInfo.map( item => item.videoID)
      console.log(productionInfo)
      res.render('pages/genre', {
        genre: genreName,
        videos: videos
      });

    })
})

router.get("/pages/login.html", function(req, res, next) {
  res.render('pages/login');
})

router.get("/pages/player.html", function(req,res, next) {

  var id = req.query.id

  if (!id) {

    res.send({err: "Identificador de vídeo não fornecido"})
    
  } else {

    Video.findById(id, (err, video) => {

      ProductionInfo
        .find({"videoID": video._id})
        .populate("genre")
        .exec( (err, productionInfo) => {
          console.log(productionInfo)
          res.render('pages/player', {
                                      video: video,
                                      productionInfo: productionInfo[0]
                                      });
        })
    })

  }

})

router.get("/pages/portfolio.html", function(req,res, next) {
  res.render('pages/portfolio');
})

router.get("/pages/profile.html", function(req,res, next) {
  const userID = req.query.id
  
  if (!userID) {
    res.send({err: "Identificador de usuário não fornecido"})
  } else {
    User
    .findById(userID)
    .populate("favorites")
    .exec( (err, user) => {
      user.password = null

      console.log(user)
      
      Video
        .find({producerID: userID})
        .exec( (err, videos) => {
          res.render('pages/profile', {user: user, videosPosted: videos});
        })
    })
  }
})

router.get("/pages/profileGeneral.html", function(req,res, next) {
  const userID = req.query.id
  
  if (!userID) {
    res.send({err: "Identificador de usuário não fornecido"})
  } else {
    User
    .findById(userID)
    .populate("favorites")
    .exec( (err, user) => {
      user.password = null

      console.log(user)
      
      Video
        .find({producerID: userID})
        .exec( (err, videos) => {
          res.render('pages/profileGeneral', {user: user, videosPosted: videos});
        })
    })
  }
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

router.get("/pages/signUp.html", function(req, res, next) {
  res.render('pages/signUp')
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

router.get("/pages/upload.html", function(req,res, next) {
  res.render('pages/upload');
})

module.exports = (app) => app.use("/", router) 
