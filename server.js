var express = require("express");
var exphbs = require("express-handlebars");

var mongoose = require("mongoose");

var cheerio = require("cheerio");
var request = require("request");
var logger = require("morgan");
var bodyParser = require("body-parser")

var app = express();
var PORT = process.env.PORT || 3000;

var db = require("./models")

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(logger("dev"));
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
    request("https://theringer.com/nba", function(error, response, html){
        if (!error && response.statusCode == 200) {
            var $ = cheerio.load(html);
           $(".c-entry-box--compact__body").each(function(i, element){
               /*var title = $(element).children("h2").text();
               var preview = $(element).children("p").text();
               var url = $(element).children("h2").children("a").attr("href"); 
               console.log(title, preview, url); */
                var result = {};

                result.title = $(this).children("h2").text();
                result.preview = $(this).children("p").text();
                result.url = $(this).children("h2").children("a").attr("href");
                
                db.Article.create(result)
                .then(function(dbArticle){
                    console.log(dbArticle)
                })
                .catch(function(err) {
                    return res.json(err);
                  });
           })
           
        }
    res.send("Scrape Complete");
    })
});

app.get("/articles", function(req, res) {
    db.Article.find({})
        .then(function(dbArticle) {
        res.json(dbArticle);
        })
        .catch(function(err) {
        res.json(err);
        });
});
      

app.listen(PORT, function(){
    console.log("Server listening on: http://localhost: " + PORT)
});