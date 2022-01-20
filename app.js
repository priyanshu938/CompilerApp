const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
const alert= require("alert")
var axios = require("axios");

app.post("/", function (req, res) {
  var code = `` + req.body.code + ``;
  var lang = req.body.language;
  var inputs = `` + req.body.inputs + ``;
  var language = "";
  if (lang === "C") language = "c";
  else if (lang === "C++") language = "cpp";
  else if (lang === "Java") language = "java";
  else language = "py";
  language = `` + language + ``;

  var data = {
    code: code,
    language: language,
    input: inputs,
  };

  var config = {
    method: "post",
    url: "https://codexweb.netlify.app/.netlify/functions/enforceCode",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
        alert(response.data.output)
    })
    .catch(function (error) {
      console.log(error);
    });
    res.redirect("/")
});
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.listen(3000, function () {
  console.log("Server is ported at 3000.");
});
