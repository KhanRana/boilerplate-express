let express = require('express');
let app = express();
const path = require('path');

app.use('/public', express.static(path.join(__dirname,'public')));

console.log("Hello World")

app.get('/', function(req, res) {
    // res.send("Hello Express");
    res.sendFile(__dirname + '/views/index.html')
});














``
















 module.exports = app;
