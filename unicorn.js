// Current Local Time
function localTime() {
  let now = new Date();
  let dayData = now.getDay();
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayData];

  return `${day}, ${hour}:${minutes}`;
}
let crtTime = document.querySelector("#currentTime");
crtTime.innerHTML = localTime();

//loop forecast
function displayForecast() {
  let forecastElement = document.querySelector("#fiveDays");

  let days = ["Tue", "Wed", "Thur", "Fri", "Sat"];

  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
      <div class="col">
              <div>
                <img
                  src="https://openweathermap.org/img/wn/10d@2x.png"
                  alt="Weather"
                  id="thursday"
                />
              </div>
              Thursday
              <br />
              Cloudy, 65℉
            </div>  
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}

displayForecast();

//Below here is for SEARCH BUTTON
function locationTemp(response) {
  let locTemp = Math.round(response.data.main.temp);
  let locCity = response.data.name;
  let locCond = response.data.weather[0].description;
  let locWind = Math.round(response.data.wind.speed);
  let locHumid = response.data.main.humidity;
  let locLocation = document.querySelector("#currentLocation");
  let locTemperature = document.querySelector("#temperature");
  let locCondition = document.querySelector("#currentCondition");
  let locWinds = document.querySelector("#wind");
  let locHumidity = document.querySelector("#humidity");
  let locElement = document.querySelector("#icon");

  fahrenheittemp = Math.round(response.data.main.temp);

  locLocation.innerHTML = `${locCity}`;
  locTemperature.innerHTML = `${locTemp}`;
  locCondition.innerHTML = `${locCond}`;
  locWinds.innerHTML = `${locWind}mph`;
  locHumidity.innerHTML = `${locHumid}%`;
  locElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function showLocTemperature(position) {
  let city = document.querySelector("#inputLocation");
  let cityName = city.value;
  let apiLocKey = "ab981aa80d2e4a4a97fc25e69e3949d5";
  let apiLocUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=ab981aa80d2e4a4a97fc25e69e3949d5&units=imperial`;

  axios.get(apiLocUrl).then(locationTemp);
}

let searchButton = document.querySelector("#searchBtn");
searchButton.addEventListener("click", showLocTemperature);

//Below here is for CURRENT BUTTON
function currentTemp(response) {
  let temp = Math.round(response.data.main.temp);
  let humid = response.data.main.humidity;
  let wind = Math.round(response.data.wind.speed);
  let city = response.data.name;
  let condition = response.data.weather[0].description;
  let currentLocation = document.querySelector("#currentLocation");
  let currentTemperature = document.querySelector("#temperature");
  let currentCondition = document.querySelector("#currentCondition");
  let currentHumidity = document.querySelector("#humidity");
  let currentWind = document.querySelector("#wind");
  let currentElement = document.querySelector("#icon");

  fahrenheittemp = Math.round(response.data.main.temp);

  currentLocation.innerHTML = `${city}`;
  currentTemperature.innerHTML = `${temp}`;
  currentCondition.innerHTML = `${condition}`;
  currentHumidity.innerHTML = `${humid}%`;
  currentWind.innerHTML = `${wind}mph`;
  currentElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function showTemperature(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "ab981aa80d2e4a4a97fc25e69e3949d5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=ab981aa80d2e4a4a97fc25e69e3949d5&units=imperial`;

  axios.get(apiUrl).then(currentTemp);
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showTemperature);
}

let button = document.querySelector("#currentBtn");
button.addEventListener("click", getCurrentPosition);

//Different Temp links
function changeTempF(event) {
  event.preventDefault();
  let tempF = document.querySelector("#temperature");
  tempF.innerHTML = Math.round(fahrenheittemp);
}
let alternateTempF = document.querySelector("#fahrenheit-link");
alternateTempF.addEventListener("click", changeTempF);

function changeTempC(event) {
  event.preventDefault();
  let tempC = document.querySelector("#temperature");
  let celsiustemp = Math.round(((fahrenheittemp - 32) * 5) / 9);

  tempC.innerHTML = celsiustemp;
}
let alternateTempC = document.querySelector("#celsius-link");
alternateTempC.addEventListener("click", changeTempC);

let fahrenheittemp = null;
