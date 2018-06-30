const WEATHER_API_KEY = '58133143c32b3b8e0cc20f0bd16e69b4';

function getWeatherFromApi(pos) {
    console.log('pos',pos)
    return axios.get(
        `http://api.openweathermap.org/data/2.5/weather?lat=${pos.lat}&lon=${pos.lng}&APPID=${WEATHER_API_KEY}`);
}

function renderWeather(weather){
    var elWeather = document.querySelector('.curr-temp');
    elWeather.innerText = weather.main.temp + ' ℃';
    var elWeather = document.querySelector('.curr-temp-range');
    elWeather.innerText = 'tempeture from ' + weather.main.temp_min + ' to ' + weather.main.temp_max;
    elWeather = document.querySelector('.loc-name-weather');
    elWeather.innerText = weather.name;
    elWeather = document.querySelector('.weather-description');
    elWeather.innerText = weather.weather[0].description;
    var iconCode = weather.weather[0].icon;
    var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
    elWeather = document.querySelector('.weather-icon');
    elWeather.src = iconUrl;
}

export default {
    getWeatherFromApi,
    renderWeather
}