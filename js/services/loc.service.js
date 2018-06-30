var locs = [{lat: 11.22, lng: 22.11}];
const MAP_API_KEY = 'AIzaSyACUNum2hdJt0mMdo4Jn3d7c_4hjUmXv74';
var urlForCopy = '';

function getLocs1() {
    return Promise.resolve(locs);
}

function getLocs() {
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve(locs);
        }, 2000)
    });

}

function setLocs(coords){
    locs = [coords];
    console.log('locs',locs);
    urlForCopy = `${window.location.href}?lat=${coords.lat}&lng=${coords.lng}`; 
    console.log(urlForCopy);
}

function getCoordsFromGoogle(locStr) {
    return axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${locStr}&key=${MAP_API_KEY}`);
}

function getCoordsFromGoogleReverse(pos){
    return axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${pos.lat},${pos.lng}&key=${MAP_API_KEY}`);
}


function getPosition() {
    console.log('Getting Pos');
    
    return new Promise((resolve, reject)=>{
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function getUrlForCopy(){
    return urlForCopy;
}

export default {
    getLocs :getLocs,
    getPosition: getPosition,
    getCoordsFromGoogle: getCoordsFromGoogle,
    setLocs: setLocs,
    getUrlForCopy: getUrlForCopy
}