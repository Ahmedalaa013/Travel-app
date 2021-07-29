const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const serverless = require("serverless-http");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
const router = express.Router();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const username = "ahmed013";

// ----------------GeonamesAPI---------------------------
router.post("/geo", async function (req, res) {
  const city = req.body.city;

  fetch(`http://api.geonames.org/searchJSON?q=${city}&username=${username}`)
    .then(resp => resp.json())
    .then(data => {
      res.send(data);
    });
});

// ----------------------Weatherbit ApI--------------------------------
const key1 = process.env.key1;
router.post("/weather", async function (req, res) {
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
router.post("/pixa", async function (req, res) {
  const country = req.body.city;
  await fetch(
    `https://pixabay.com/api/?key=${key2}&q=${country}&image_type=photo`
  )
    .then(resp => resp.json())
    .then(data => res.send(data));
});
app.use("/", router);
module.exports.handler = serverless(app);
