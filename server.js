var express = require("express");
var exphbs = require("express-handlebars");

var mongoose = require("mongoose");

var cheerio = require("cheerio");
var request = require("request");


var app = express();
var PORT = process.env.PORT || 3000;

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/ringerDB";
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI , {useNewUrlParser: true});


//routes
app.get("/", function(req, res){
    res.render("index")
});

app.get("/scrape", function(req, res){
    request("https://theringer.com/nba", (error, response, html) => {
        if (!error && response.statusCode == 200) {
            var $ = cheerio.load(html);
            var result = {};
           $(".c-entry-box--compact__body").each((i, element) => {
               //console.log(element)
               var title = $(element).children("h2").text();
               console.log("title: " + title)
               var preview = $(element).children("p").text();
               console.log("preview: " + preview)
               var url = $(element).children("h2").children("a").attr("href");
               console.log("url: " + url)
           })
           
        }
    })
});
      

app.listen(PORT, function(){
    console.log("Server listening on: http://localhost: " + PORT)
});