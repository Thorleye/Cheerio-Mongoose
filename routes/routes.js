var express = require('express')
var router = express.Router()
var db = require("../models")
//routes
router.get("/", function(req, res){
    db.Article.find({}, function(err, data){
        res.render("index", {articles : data})    
    })
});

router.get("/scrape", function(req, res){
    request("https://theringer.com/nba", function(error, response, html){
        if (!error && response.statusCode == 200) {
            var $ = cheerio.load(html);
           $(".c-entry-box--compact__body").each(function(i, element){
/*               console.log('---------------------------------------------')
               console.log($(element).parent("div").children("a").children("div").children("img")); */
                var result = {};

                result.title = $(this).children("h2").text();
                result.preview = $(this).children("p").text();
                result.url = $(this).children("h2").children("a").attr("href");
                result.img = $(this).parent("div").children("a").children("div").children("img").attr("src");
                 
                db.Article.create(result)
                .then(function(dbArticle){
                })
                .catch(function(err) {
                    return res.json(err);
                  });
           })
           
        }
    res.send("Scrape Complete");
    })
});

//grab everthing
app.get("/articles", function(req, res) {
    db.Article.find({})
        .then(function(dbArticle) {
        res.json(dbArticle);
        })
        .catch(function(err) {
        res.json(err);
        });
});


//get one article by id //
app.get("/articles/:id", function(req, res){
    db.Article.find({_id: req.params.id})
    .then(function(dbArticle){
        res.json(dbArticle);
    })
    .catch(function(err) {
        res.json(err);
    });
})

//route  for saving article //
app.put("/articles/:id", function(req, res){
    db.Article.findOneAndUpdate({_id: req.params.id},{"saved":true})
    .then(function(){
        res.render("saved", {articles: data})
    })
    .catch(function(err) {
        res.json(err);
    });
})

// get all saved articles //
app.get("/saved", function(req, res){
    db.Article.find({saved: true}, function(err, data){
        res.render("saved", {articles : data});
    })
});

//get one saved article//
app.get("/saved/:id", function(req, res){
    db.Article.find({_id: req.params.id, "saved":true})
    .then(function(dbArticle){
        res.json(dbArticle)
    })
    .catch(function(err) {
        res.json(err);
    });
})

//delete path//
app.delete("/articles/:id", function(req, res){
    db.Article.remove({_id: req.params.id}, function (err, data){
        res.render("saved", {articles:data});
    });
})

module.exports = router
