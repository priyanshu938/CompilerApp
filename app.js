const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
var axios = require("axios");
app.set("view engine", "ejs");

app.post("/", function (req, res) {
  var code = `` + req.body.code + ``;
  var lang = req.body.language;
  var inputs = req.body.inputs;
  // console.log(code, lang, inputs)
  var langArr = [false, false, false, false];
  var language = "";
  if (lang === "C") {
    language = "c";
    langArr[0] = true;
  } else if (lang === "C++") {
    language = "cpp";
    langArr[1] = true;
  } else if (lang === "Java") {
    language = "java";
    langArr[2] = true;
  } else if (lang === "Python") {
    language = "py";
    langArr[3] = true;
  }
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
      let output = response.data.output;
      // console.log(output);
      res.render("index", {
        code: code,
        language: lang,
        inputs: inputs,
        langArr: langArr,
        output: output,
      });
    })
    .catch(function (error) {
      console.log(error);
    });
});
app.get("/", function (req, res) {
  res.render("index", {
    code: "",
    language: "",
    inputs: "",
    output: "",
    langArr: [false, false, false, false],
  });
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Server is ported at 3000.");
});
