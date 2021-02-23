var datastore = require('nedb');
var db = new datastore({filename: 'database.json', autoload: true});

var express = require('express');
var bodyParser = require('body-parser');
const { urlencoded } = require('express');
var app = express();

var urlencodedBodyParser = bodyParser.urlencoded({extended: true});
app.use(urlencodedBodyParser);

app.use(express.static("public"));

var submittedData = [];

app.get('/', function (req, res) {
  res.send('Welcome!')
});

app.get('/displayrecord', function (req, res) {
  db.find({_id: req.query._id}, function(err, docs){
    var dataWrapper = {data: docs[0]};
    res.render("individual.ejs", dataWrapper);
  });
});

app.post('/formdata', function (req, res) {
    console.log(req.body.data);

    var dataToSave = {
        text: req.body.data,
        color: req.body.color,
        longtext: req.body.longtext
    };

    //console.log(dataToSave);
    // submittedData.push(dataToSave);

    db.insert(dataToSave, function (err, newDoc) {  
      db.find({}, function(err, docs) {
        var dataWrapper = {data: docs};
        res.render("outputtemplate.ejs", dataWrapper);
       });
    });

    // var dataWrapper = {data: submittedData};

    // var output = "<html><body>";
    // output += "<h1>Seat D</h1>";
    // for (var i = 0; i < submittedData.length; i++){
    //     output+="<div style='color: " + submittedData[i].color + "'>" + submittedData[i].text + "</div>";
    // }
    // output += "</body></html>";
    // res.send(output);
    // res.send("Your seat is:" +req.body.data + " " + req.body.color);

});

app.listen(80, function () {
  console.log('Example app listening on port 80!')
});
