const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static("dist"));

const appData = [];
const port = 7300;
const server = app.listen(port);

app.get("/", function (req, res) {
  res.sendFile("dist/index.html");
});
app.get("/test", function (req, res) {
  res.json({ message: "pass" });
});
const username = "ahmed013";

// ----------------GeonamesAPI---------------------------
app.post("/geo", async function (req, res) {
  const city = req.body.city;

  fetch(`http://api.geonames.org/searchJSON?q=${city}&username=${username}`)
    .then(resp => resp.json())
    .then(data => {
      res.send(data);
    });
});

// ----------------------Weatherbit ApI--------------------------------
const key1 = process.env.key1;
app.post("/weather", async function (req, res) {
  const lat = req.body.lati;
  const lng = req.body.long;
  const day = req.body.days;
  console.log(lat, lng);

  fetch(
    `https://api.weatherbit.io/v2.0/forecast/daily?&lat=${lat}&lon=${lng}&days=${day}&key=${key1}&units=M`
  )
    // Checks for failed data transfer from API, returns null
    .then(resp => resp.json())
    .then(data => res.send(data));
});

// ----------------------PixaBay API---------------------------------
const key2 = process.env.key2;
app.post("/pixa", async function (req, res) {
  const country = req.body.city;
  await fetch(
    `https://pixabay.com/api/?key=${key2}&q=${country}&image_type=photo`
  )
    .then(resp => resp.json())
    .then(data => res.send(data));
});
app.post("/allData", allData);
function allData(req, res) {
  appData.push(req.body);
  console.log(appData);
  res.send({ message: "Data Received" });
}
module.exports = { app };
