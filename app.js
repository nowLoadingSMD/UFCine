var express = require("express")
var path = require('path');
var bodyParser = require("body-parser")

var app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Require Routes
require("./routes/index.js")(app)

//Require Controllers
require("./controllers/authController")(app)
require("./controllers/videoController")(app)
require("./controllers/tagController")(app)
require("./controllers/genreController")(app)
require("./controllers/productionInfoController")(app)

app.listen(3000)

console.log("Server Running on port 3000....")