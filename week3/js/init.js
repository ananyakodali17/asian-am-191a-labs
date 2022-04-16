// declare the map
let mapVariables = {
    "mapCenter" : [34.0709,-118.444],
    "zoom" : 5
};

const map = L.map('the_map').setView(mapVariables.mapCenter, mapVariables.zoom);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// create a function to add markers
function addMarker(lat,lng,title,message){
    console.log(message)
    L.marker([lat,lng]).addTo(map).bindPopup(`<h2>${title}</h2> <h3>${message}</h3>`)
    return message
}

fetch("map.geojson")
    .then(function(data){
        return data.json()
    })
.then(function (data){ 
    // Basic Leaflet method to add GeoJSON data
    L.geoJSON(data).addTo(map)
});
