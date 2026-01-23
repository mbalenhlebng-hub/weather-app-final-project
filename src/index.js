function displayTemperature(response) {
  let temperatureElement = document.querySelector("#current-temp-value");
  let temperature = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#current-city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  console.log(response.data);

  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class= "weather-app-icon"/>`;
  cityElement.innerHTML = response.data.city;

  timeElement.innerHTML = formatDate(date);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
  temperatureElement.innerHTML = temperature;

  getForecast(response.data.city);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[date.getDay()];
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${formattedDay} ${hours}:${minutes}, `;
}

function searchCity(city) {
  let apiKey = "89dbbt7b233b3a81f4o5944bfda2380e";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#city-input");

  searchCity(searchInputElement.value);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "89dbbt7b233b3a81f4o5944bfda2380e";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data);

  
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index > 0 && index < 6) {
    forecastHtml =
      forecastHtml +
      `
    <div class="weather-forecast-day">
      <div class="weather-forecast-date">${formatDay(day.time)}</div>
      <div class="weather-forecast-icon">
          <img src="${day.condition.icon_url}" class="weather-forecast-icon"/>
      </div>
      <div class="weather-forecast-temp">
        <div class="weather-forecast-temp-first">
          <strong>${Math.round(day.temperature.maximum)}&deg;</strong>
        </div>
        <div class="weather-forecast-temp-sec">${Math.round(day.temperature.minimum)}&deg;</div>
      </div>
    </div>`; }
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearchSubmit);

let currentDateElement = document.querySelector("#description");
let currentDate = new Date();

currentDateElement.innerHTML = formatDate(currentDate);

searchCity("Pretoria");
