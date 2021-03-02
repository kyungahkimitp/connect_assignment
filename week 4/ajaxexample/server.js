var datastore = require('nedb');
var db = new datastore({filename: 'database.json', autoload: true});

var express = require('express');
const { urlencoded } = require('express');
var app = express();

app.use(express.static("public"));

// var submittedData = [];

app.get('/formdata', function (req, res) {
    console.log(req.query.date);

    var dataToSave = {
        date: req.query.date,
        // color: req.query.color,
    };

    //console.log(dataToSave);
    // submittedData.push(dataToSave);

    db.insert(dataToSave, function (err, newDoc) {  
      db.find({}, function(err, docs) {
        res.send(docs);
       });
    });
});

app.listen(81, function () {
  console.log('Example app listening on port 81!')
});
