// declare the map
let mapVariables = {
    "mapCenter" : [44.0709,-118.444],
    "zoom" : 3.25
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

fetch("map(1).geojson")
    .then(response => {
    return response.json()
    })
    .then(data =>{
    // Basic Leaflet method to add GeoJSON data
     L.geoJSON(data, {
            pointToLayer: (feature, latlng) => { 
                return L.circleMarker(latlng, {color: feature.properties.color})
            }
        }).bindPopup(layer => {
            return layer.feature.properties.place;
        }).addTo(map);
})

