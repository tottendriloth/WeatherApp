//weather app follow along (week 7)

let iconElement = document.querySelector(".weather-icon");
let tempElement = document.querySelector(".temperature-value p");
let descElement = document.querySelector(".temperature-description p");
let locationElement = document.querySelector(".location p");
let notificationElement = document.querySelector(".notification");


const weather = {};
const KELVIN = 273;

weather.temperature = {
    unit : "celsius"
}

const key = "5dbfea0b6f6de4292683cdf2e02f5982";

if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}else{
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<P> Your Browser Doesn't Support Geolocation </p>";
}

function setPosition(position){
    let lat = position.coords.latitude;
    let long = position.coords.longitude;

    getWeather(lat, long);
}


function showError(error){
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> ${error.message}`;
}

function getWeather(latitude, longitude){
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

    fetch(api)
        .then(function(response){
            let data = response.json();
            return data;
        })
        .then(function(data){
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
        })
        .then(function(){
            displayWeather();
        });
    
}

function displayWeather(){
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value}<span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather,country}`;
}

function cToF(temperature){
    return (temperature * 9/5) + 32;
}

tempElement.addEventListener("click", function(){
    if(weather.temperature.value === undefined) return;

    if(weather.temperature.unit == "celsius"){
        let fahrenheit = cToF(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit);

        tempElement.innerHTML = `${fahrenheit}°<span>F</span>`;
        weather.temperature.unit = "fahrenheit";
    }else{
        tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
        weather.temperature.unit = "celsius";
    }
})