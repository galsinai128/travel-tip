console.log('Main!');

import locService from './services/loc.service.js'
import mapService from './services/map.service.js'
import weatherService from './services/weather.service.js'



locService.getLocs()
    .then(locs => console.log('locs', locs))

window.onload = () => {
    mapService.initMap()
        .then(
            () => {
                locService.getPosition()
                    .then(pos => {
                        var coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
                        mapService.addMarker(coords);
                        locService.setLocs(coords);
                        weatherService.getWeatherFromApi(coords)
                            .then(weather => {
                                weatherService.renderWeather(weather.data)
                            })
                    })
                    .catch(err => {
                        console.log('err!!!', err);
                    })
            }
        ).catch(console.warn);




}

// document.querySelector('.btn1').onclick =  () => {
//     console.log('Thanks!');
// }


document.querySelector('.go-btn').addEventListener('click', (ev) => {
    var inputStr = document.querySelector('input').value;
    locService.getCoordsFromGoogle(inputStr)
        .then(loc => {
            var newCoords = loc.data.results[0].geometry.location;
            mapService.setNewMarker(newCoords);
            locService.setLocs(newCoords);
            weatherService.getWeatherFromApi(newCoords)
                .then(weather => {
                    weatherService.renderWeather(weather.data)
                })
        })
})


document.querySelector('.my-location-btn').addEventListener('click', (ev) => {
    locService.getPosition()
        .then(pos => {
            var coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
            mapService.setNewMarker(coords);
            locService.setLocs(coords);
            weatherService.getWeatherFromApi(coords)
                .then(weather => {
                    weatherService.renderWeather(weather.data)
                })
        })
        .catch(err => {
            console.log('err!!!', err);
        })
})


function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    console.log('results', results);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
