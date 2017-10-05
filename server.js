
var express = require("express");
var mongojs = require("mongojs");
var bodyParser = require("body-parser");
// Require request and cheerio. This makes the scraping possible
var request = require("request");
var cheerio = require("cheerio");
var logger = require("morgan");
var mongoose = require("mongoose");
var Article = require("./models/articles.js");

var app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: false
}));




mongoose.connect("mongodb://localhost/classWork");
var db = mongoose.connection;

db.on("error", function(error) {
  console.log("Database Error:", error);
});
db.once("open", function() {
  console.log("Mongoose connection successful.");
});


// Main route (simple Hello World Message)
app.get("/", function(req, res) {
  res.sendFile('public/index.html');
});


app.get("/scrape", function(req, res) {
  request("https://www.nytimes.com/", function(error, response, html) {
    var result = [];
    var $ = cheerio.load(html);
    $("article h2").each(function(i, element) {
      result.push({
        title : $(this).children("a").text(),
        link : $(this).children("a").attr("href")
      });
     
   

    });
    res.json(result);
    
});
});

app.post("/saveData",function(req,res){
  console.log(req.body);
  var data = new {title : req.body.articleName,
                   link   : req.body.linkName}

  data.save(function(err,doc){
    if (err){
      console.log(err);}
    else {
      console.log(doc);
    }
  });

  console.log(req.body);
  res.end;
});

app.get("/saved",function(req,res){
  res.sendFile('public/savedArticle.html');
});

app.listen(3000, function() {
  console.log("App running on port 3000!");
});
