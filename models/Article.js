var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var  ArticleSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    preview: {
        type:String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    saved: {
        type: Boolean,
        default: false
    }
});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;

