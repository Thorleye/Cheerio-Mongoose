var express = require("express");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");
//var cheerio = require("cheerio");
//var request = require("request");
//var parser = require("body-parser");

var app = express();
var PORT = process.env.PORT || 3000;

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

app.get("/", function(req, res){
    res.render("index")
})

app.listen(PORT, function(){
    console.log("Server listening on: http://localhost: " + PORT)
})