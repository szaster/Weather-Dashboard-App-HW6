const apiKey = "67a37ebd6ba52d3daa78ec43caca41e0";
const city = "Houston";
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





// $.ajax({
//   url: url, //API Call
//   dataType: "json",
//   type: "GET",
//   data: {
//     q: city,
//     appid: key,
//     units: "metric",
//     cnt: "10"
//   },
//   success: function(data) {
//     console.log('Received data:', data) // For testing
//     var wf = "";
//     wf += "<h2>" + data.city.name + "</h2>"; // City (displays once)
//     $.each(data.list, function(index, val) {
//       wf += "<p>" // Opening paragraph tag
//       wf += "<b>Day " + index + "</b>: " // Day
//       wf += val.main.temp + "&degC" // Temperature
//       wf += "<span> | " + val.weather[0].description + "</span>"; // Description
//       wf += "<img src='https://openweathermap.org/img/w/" + val.weather[0].icon + ".png'>" // Icon
//       wf += "</p>" // Closing paragraph tag
//     });
//     $("#showWeatherForcast").html(wf);
//   }
// });










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
    getWeather(textToSearch);
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
  
    $("#searchSubmit").on("click", getWeather);
  
    $("#search").on("keypress", onPressEnter);
  });

function displayHourlyForcast(forecast) {
  // update html here.
  console.log(forecast);
}

function setNewWeather(weather) {
    console.log("Got new weather", weather);
    displayHourlyForcast(weather.list[0]);
}

function setNotFound(response) {
    console.log("Problem", response);
}

function getWeather(city) {
    const apiUrl = url(city);
    return fetch(apiUrl)
                .then(handleFetchError)
                .then(r => r.json().then(setNewWeather))
                .catch(e => console.log(e));
}



function displayCurrentDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  document.getElementById("date").innerHTML = `${month}/${day}/${year}`;
}


getWeather("Houston");