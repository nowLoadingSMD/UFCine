var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  let emCartazItem = {
    "name": "PQPQP",
    "description": "HUE",
    "exibitionLocation": "Caralho's house"
  };

  let emCartaz = [];

  for (let i = 0; i < 5; i++){
    emCartaz.push(emCartazItem);
  }
  
  res.render('index', {emCartazList: emCartaz});
});

router.get('/index.html', function(req, res, next) {

  let emCartazItem = {
    "name": "PQPQP",
    "description": "HUE",
    "exibitionLocation": "Caralho's house"
  };

  let emCartaz = [];

  for (let i = 0; i < 5; i++){
    emCartaz.push(emCartazItem);
  }
  
  res.render('index', {emCartazList: emCartaz});
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
  res.render('pages/player');
})

router.get("/pages/portfolio.html", function(req,res, next) {
  res.render('pages/portfolio');
})

router.get("/pages/profile.html", function(req,res, next) {
  res.render('pages/profile');
})

router.get("/pages/recommended.html", function(req,res, next) {
  res.render('pages/recommended');
})

router.get("/pages/releases.html", function(req,res, next) {
  res.render('pages/releases');
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
