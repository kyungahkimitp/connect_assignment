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

app.post('/formdata', function (req, res) {
    console.log(req.body.data);
    //console.log(req.query.data);

    /*
    var dataDataToSave = new Object();
    dataToSave.text = req.body.data;
    dataToSave.color = req.body.color;
    */

    var dataToSave = {
        text: req.body.data,
        color: req.body.color
    };

    //console.log(dataToSave);

    submittedData.push(dataToSave);

    console.log(submittedData);

    var output = "<html><body>";
    output += "<h1>Seat D</h1>";

    for (var i = 0; i < submittedData.length; i++){
        output+="<div style='color: " + submittedData[i].color + "'>" + submittedData[i].text + "</div>";
    }
    output += "</body></html>";
    res.send(output);
    //res.send("Your seat is:" +req.body.data + " " + req.body.color);
});

app.listen(80, function () {
  console.log('Example app listening on port 80!')
});
