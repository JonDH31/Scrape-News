// Our Dependencies
var express = require("express");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");


// Using es6 js promise
mongoose.Promise = Promise;

// Initialize Express
var app = express();
var PORT = process.env.PORT || 3000;

// Use morgan and body parser with our app
app.use(logger("dev"));
app.use(bodyParser.urlencoded({extended: true}));

// allow the handlesbars engine to be in our toolset
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
// Now set handlebars engine
app.set('view engine', 'handlebars');

// Make public a static dir to serve our static files
app.use(express.static("public"));

// Mongoose (orm) connects to our mongo db and allows us to have access to the MongoDB commands for easy CRUD 
mongoose.connect("mongodb://localhost:27017/scrape-news");
var db = mongoose.connection;

// if any errors than console errors
db.on("error", function (error) {
  console.log("Mongoose Error: ", error);
});

// display a console message when mongoose has a conn to the db
db.once("open", function () {
  console.log("Mongoose connection successful.");
});

// Require the routes in our article-routes js file
require("./controllers/article-routes.js")(app)
//Listen on PORT 3000 
app.listen(PORT, function () {
  console.log("App running on port 3000");
});