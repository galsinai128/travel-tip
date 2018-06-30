
var map;
var markers = [];

function initMap(lat = 32.0749831, lng = 34.9120554) {
    console.log('InitMap'); 
    return _connectGoogleApi()
    .then(() => {
        console.log('google available');
        map = new google.maps.Map(
            document.querySelector('#map'), {
                center: { lat, lng },
                zoom: 15
            })
        console.log('Map!', map);
    })
}

function addMarker(loc) {
    var marker = new google.maps.Marker({
        position: loc,
        map: map,
        title: 'Hello World!'
    });
    map.setCenter(loc);
    markers.push(marker);
    return marker;
}

/*************delete markers - google implementation********************** */

function deleteMarkers() {
    clearMarkers();
    markers = [];
}

function clearMarkers() {
    setMapOnAll(null);
}

function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}

/************************************************************************** */



function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    // const API_KEY = 'XXX';
    const API_KEY = 'AIzaSyACUNum2hdJt0mMdo4Jn3d7c_4hjUmXv74';
    var elGoogleApi = document.createElement('script');
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
    elGoogleApi.async = true;
    document.body.append(elGoogleApi);
    
    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve;
        elGoogleApi.onerror = () => reject('Google script failed to load')
        elGoogleApi.onerror = reject.bind(null,'Google script failed to load')
    })
}

function setNewMarker(coords){
    deleteMarkers();
    addMarker(coords);
}

export default {
    initMap,
    addMarker,
    setNewMarker
}

