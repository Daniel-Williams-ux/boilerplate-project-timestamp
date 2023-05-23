// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/:date?", function (req, res) {
  let date = req.params.date;
let unixDate = "";
let dateObj;
let utcDate = "";

// Test if input is a Unix timestamp
let isUnixTimestamp = /^\d+$/.test(date);

  //if no date return current date
  if(!date) {
    dateObj = new Date();
    unixDate = dateObj.getTime();
    utcDate = dateObj.toUTCString();
  res.json({ unix: unixDate, utc: utcDate });
  }

  
// if date is Unix timestamp
if (isUnixTimestamp) {
  dateObj = new Date(parseInt(date));
} else {
  dateObj = new Date(date);
  }
  unixDate = dateObj.getTime();
  utcDate = dateObj.toUTCString()

  if (dateObj.toString() === 'Invalid Date') {
    res.json({error: "Invalid Date"})
    return;
  }

  if(dateObj.toString() === "Invalid Date") {
    res.json({"error": "Invalid Date"})
  }

res.json({ unix: unixDate, utc: utcDate });

});




// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
