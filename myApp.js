const { time } = require("console");
let express = require("express");
let app = express();
const path = require("path");
require("dotenv").config();
const bodyParser = require("body-parser")

app.use("/public", express.static(path.join(__dirname, "public")));

app.use(function (req, res, next) {
  console.log(req.method + " " + req.path + " " + "-" + " " + req.ip);
  next();
});


console.log("Hello World");

//send client home page
app.get("/", function (req, res) {
  // res.send("Hello Express");
  res.sendFile(__dirname + "/views/index.html");
});

//send client greeting when endpoint is "/json"
app.get("/json", (req, res) => {
  let response = "Hello json";
  if (process.env.MESSAGE_STYLE === "uppercase") {
    response = response.toUpperCase();
  }
  res.json({
    message: response,
  });
});

//send client time of the request when endpoint is "/now"
app.get(
  "/now",
  function (req, res, next) {
    req.time = new Date().toString();
    next();
  },
  function (req, res) {
    res.json({
      time: req.time,
    });
  }
);

//read user request data and return to the client
app.get("/:word/echo", (req, res) => {
  res.json({
    echo: req.params.word,
  });
});

//post body parser
app.use(bodyParser.urlencoded({ extended: false }));

//parse json data
app.use(bodyParser.json());


//get and post requests for a path
app.route("/name").get((req, res) => {
  const firstName = req.query.first;
  const lastName = req.query.last;
  res.json({
    name: firstName + " " + lastName,
  });
}).post((req, res) => {
  const firstName = req.body.first;
  const lastName = req.body.last;
  res.send({
    name: firstName + " " + lastName,
  })
});

module.exports = app;
