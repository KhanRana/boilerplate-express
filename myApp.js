const { time } = require("console");
let express = require("express");
let app = express();
const path = require("path");
require("dotenv").config();

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

//get and post requests for a path
app.route("/library").get((req, res) => {
  const firstname = req.query.firstname;
  const lastname = req.query.lastname;
  res.json({
    name: firstname + " " + lastname,
  });
});

module.exports = app;
