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

router.get("/pages/recommended.html", function(req,res, next) {
  res.render('pages/recommended');
})

router.get("/pages/releases.html", function(req,res, next) {
  res.render('pages/releases');
})

module.exports = (app) => app.use("/", router) 
