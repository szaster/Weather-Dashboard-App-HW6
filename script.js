const apiKey = "67a37ebd6ba52d3daa78ec43caca41e0";

const weatherResults = $("#weatherResults");

function url(city) {
    return `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
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
    getWeather(textToSearch);
  }



function onPressEnter(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      performSearch();
    }
  }



  $(document).ready(function () {
    // displayCurrentDate();
    addClearSearchEventListeners();
    
    getWeather(city);
  
    $("#searchSubmit").on("click", performSearch);
  
    $("#search").on("keypress", onPressEnter);
  });






function setNewWeather(weather) {
    console.log("Got new weather", weather);
    console.log("Feels like", weather.main.feels_like);
}

function setNotFound(response) {
    console.log("Problem", response);
}

function getWeather(city) {
    const weather = url(city);
    return fetch(weather)
                .then(handleFetchError)
                .then(r => r.json().then(setNewWeather))
                .catch(e => console.log(e));
}

getWeather("Houston");