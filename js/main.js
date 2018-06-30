console.log('Main!');

import locService from './services/loc.service.js'
import mapService from './services/map.service.js'
import weatherService from './services/weather.service.js'


locService.getLocs()
    .then(locs => {
        console.log('locs', locs)
    })

window.onload = () => {
    mapService.initMap()
        .then(
            () => {
                if (!window.location.href.includes('?')){
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
                else{
                    var coords = {lat : +getParameterByName('lat'), lng : +getParameterByName('lng')}
                    console.log('coords',coords);
                    mapService.addMarker(coords);
                    locService.setLocs(coords);
                    weatherService.getWeatherFromApi(coords)
                        .then(weather => {
                            weatherService.renderWeather(weather.data)
                        })
                }
            }
        ).catch(console.warn);
}



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

document.querySelector('.copy-location-btn').addEventListener('click', (ev) => {
    copyToClipboard(locService.getUrlForCopy());
    var elCopyBtn = ev.target;
    elCopyBtn.innerText = 'Adress copied';
    setTimeout(()=>{elCopyBtn.innerText = 'Copy location'},1000)
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


function copyToClipboard (str)  {
    console.log('str',str);
    let el = document.createElement('textarea');
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  };