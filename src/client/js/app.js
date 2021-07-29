/* Global Variables */
let b = 0;
// event Handler
async function travelForm(event) {
  event.preventDefault();
  const country1 = document.getElementById("zip").value;
  const date1 = document.querySelector('input[type="date"]');
  const date2 = document.getElementById("End Date");
  let numOfDays =
    (date2.valueAsNumber - date1.valueAsNumber) / (1000 * 60 * 60 * 24);
  const trueLenght = numOfDays;
  if (numOfDays <= 16) {
    // console.log(numOfDays);
  } else {
    numOfDays = 16;
    alert("weather forcast shows only 16 days ahead");
  }
  // ---------------------Geo Endpoint--------------------------------------------
  const geoRes = await fetch("https://.netlify/functions/:splat", {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/JSON",
    },
    mode: "cors",
    body: JSON.stringify({ city: country1 }),
  });

  const data = await geoRes.json();
  let lat = data.geonames[0].lat;
  let lng = data.geonames[0].lng;
  let country = data.geonames[0].countryName;
  // console.log(country);
  // console.log(data);

  // -------------------PixaBay Endpoint---------------------------------------------------

  const pixaRes = await fetch("http://localhost:7300/pixa", {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/JSON",
    },
    mode: "cors",
    body: JSON.stringify({ city: country1 }),
  });
  const data2 = await pixaRes.json();
  // console.log(data2);

  // ------------------Weatherbit Endpoint--------------------------------------------------

  const weatherRes = await fetch("http://localhost:7300/weather", {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/JSON",
    },
    mode: "cors",
    body: JSON.stringify({ lati: lat, long: lng, days: numOfDays }),
  });
  const data3 = await weatherRes.json();
  // console.log(data3);

  // --------creating dynamic view cards-----------------
  b++;
  const addDiv = document.createElement("main");
  addDiv.id = `cont${b}`;
  const card = document.getElementById("card");
  card.insertAdjacentElement("beforeend", addDiv);

  const addClass = document.querySelectorAll("main");
  addClass.forEach(function (item) {
    item.classList.add("style");
  });

  const cards = document.getElementById(`cont${b}`);
  let p = document.createElement("div");
  cards.appendChild(p);
  p.innerHTML = `Country:- ${country} -----
  Trip Length:- ${trueLenght} Days
  <img src="${data2.hits[0].largeImageURL}" alt="pic" id="pic">`;

  //----------- creating div elements----------------
  for (let i = 0; i < numOfDays; i++) {
    const addItem = document.createElement("div");
    addItem.id = `section${b}${i}`;
    cards.insertAdjacentElement("beforeend", addItem);
  }
  // ------  populating div elements with results--------------
  for (let i = 0; i < numOfDays; i++) {
    const result = document.getElementById(`section${b}${i}`);
    result.innerHTML = ` Day ${i + 1} --- H= ${
      data3.data[i].high_temp
    }&#8451; | L= ${
      data3.data[i].low_temp
    }&#8451; <img src="https://www.weatherbit.io/static/img/icons/${
      data3.data[i].weather.icon
    }.png" alt="logo">`;
  }
  cards.scrollIntoView();
  Client.ui(data, data2, data3);
}
export { travelForm };
