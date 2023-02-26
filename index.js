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

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
        <div class="col-2">
          <span>${day}</span>
          <img
            src="http://openweathermap.org/img/wn/50d@2x.png"
            alt=""
            width="38"
          />
          <p>18° 12°</p>
        </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function displayCityTemp(response) {
  document.querySelector("#city-heading").innerHTML = response.data.name;
  document.querySelector("#temp-converter").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity}%`;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  document.querySelector("#wind").innerHTML = `Wind: ${Math.round(
    response.data.wind.speed
  )} km/h`;
  celciusTemperature = response.data.main.temp;
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

searchCity("Atlanta");

function handleFahrenheit(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temp-converter");
  celcius.classList.remove("active");
  fahrenheit.classList.add("active");
  let fahrenheitTemp = (celciusTemperature * 9) / 5 + 32;
  tempElement.innerHTML = Math.round(fahrenheitTemp);
}

function handleCelcius(event) {
  event.preventDefault();
  celcius.classList.add("active");
  fahrenheit.classList.remove("active");
  let tempElement = document.querySelector("#temp-converter");
  tempElement.innerHTML = Math.round(celciusTemperature);
}

let celciusTemperature = null;

let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click", handleFahrenheit);

let celcius = document.querySelector("#celcius-link");
celcius.addEventListener("click", handleCelcius);

displayForecast();
