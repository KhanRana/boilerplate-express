let express = require('express');
let app = express();
const path = require('path');
require("dotenv").config();

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next)
{
    console.log(req.method + ' ' + req.path + ' ' + '-' + ' ' + req.ip);
    next();
})

console.log("Hello World")

app.get('/', function (req, res) {
    // res.send("Hello Express");
    res.sendFile(__dirname + '/views/index.html');
});

app.get("/json", (req, res) => {
    let response = "Hello json";
    if (process.env.MESSAGE_STYLE === "uppercase") {
        response = response.toUpperCase();
    }
    res.json({
        "message": response,
    });
});














``
















module.exports = app;
