let now = new Date();
let date = now.getDate();
let year = now.getFullYear();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let months = [
  "January",
  "Febraury",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let month = months[now.getMonth()];

let hour = now.getHours();
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}

document.getElementById(
  "date"
).innerHTML = `${day}, ${month} ${date}, ${year} ${hour}:${minute}`;

function handleFahrenheit(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#temp-converter");
  currentTemp.innerHTML = 13;
}
function handleCelcius(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#temp-converter");
  currentTemp.innerHTML = 77;
}

let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click", handleFahrenheit);
let celcius = document.querySelector("#celcius-link");
celcius.addEventListener("click", handleCelcius);

function displayCityTemp(response) {
  document.querySelector("#city-heading").innerHTML = response.data.name;
  document.querySelector("#temp-converter").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity}`;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function searchCity(city) {
  let apiKey = "de2c40e370d58e257faf07ba4ea95840";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayCityTemp);
}

function cityInput(event) {
  event.preventDefault();
  let city = document.querySelector("#city").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "de2c40e370d58e257faf07ba4ea95840";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayCityTemp);
}
function displayCurrentWeather(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let form = document.querySelector("#search-city");
form.addEventListener("submit", cityInput);

let currentLocationButton = document.querySelector("#current-temperature");
currentLocationButton.addEventListener("click", displayCurrentWeather);

searchCity("Tokyo");
