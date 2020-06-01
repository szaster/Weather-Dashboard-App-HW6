const apiKey = "67a37ebd6ba52d3daa78ec43caca41e0";
// const city = "Houston";
const weatherResults = $("#weatherResults");
// const url = "https://api.openweathermap.org/data/2.5/forecast";

function url(city) {
    // return `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    return `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
}

function handleFetchError(response) {
    if (!response.ok) {
        response.json().then(setNotFound);
        throw new Error(response.statusText);
    }
    return response;
}

//Cleares the search field
function clearSearch() {
    $("#search").val("");
  }
  
  function addClearSearchEventListeners() {
    $("#searchClear").on("click", clearSearch);
    $("#clearSearchIcon").on("click", clearSearch);
  }

function performSearch() {
    const textToSearch = $("#search").val();
    getWeatherDataAndDisplay(textToSearch);
}

function onPressEnter(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      performSearch();
    }
  }

  $(document).ready(function () {
    displayCurrentDate();
    addClearSearchEventListeners();
    // displayHourlyForcast();
  
    $("#searchSubmit").on("click", function(){
      const cityName = $("#search").val();
      getWeatherDataAndDisplay(cityName);
    });
  
    $("#search").on("keypress", onPressEnter);
  });


function toFarhenheit (temp) {
  return Math.round(temp*1.8 - 459.67);
}

function hourlyForecastCard(forecast) {
  const time = moment.unix(forecast.dt);
  const cityTemp = toFarhenheit(forecast.main.temp);
  const cityHumidity = forecast.main.humidity;
  const cityWind = forecast.wind.speed;
  // const cityClouds = forecast.;
  // const cityWeather = forecast.weather[[1]];
  // const cityDescription = forecast.weather.description;
 
  // $("#weatherResults")

  return `<div class="col s12 m3">
                <div class="card">
                    <div class="card-content">
                    <span class="card-title">${time.format("ddd, hA")}</span>
                    <p> Temperature: ${cityTemp} F </p>
                    <p> Humidity: ${cityHumidity} % </p>
                    <p> Wind: ${cityWind} m/s </p>
                  
                    </div>
                </div>
  </div>`;
}


function displayHourlyForcast(forecast) {
  const cardHtml = hourlyForecastCard(forecast);
  $("#weatherResults").append($.parseHTML(cardHtml));
}

function displayWeatherData(weather) {
    console.log("Got new weather", weather);
    weather.list.forEach(displayHourlyForcast);
}

function setNotFound(response) {
    console.log("Problem", response);
}

function getWeatherDataAndDisplay(city) {
    const apiUrl = url(city);
    return fetch(apiUrl)
      .then(handleFetchError)
      .then(r => r.json().then(displayWeatherData))
      .catch(e => console.log(e));
}

function xSquare (x) {
  return x*x;
}

const xSquare2 = x => x*x; 


function displayCurrentDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  document.getElementById("date").innerHTML = `${month}/${day}/${year}`;
}


// getWeather("Houston");