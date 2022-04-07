// JavaScript const variable declaration
const map = L.map('the_map').setView([40, -90], 4); 



// Leaflet tile layer, i.e. the base map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map); 



//JavaScript let variable declaration to create a marker

function add_marker(lat,long,popup){
   L.circleMarker([lat,long]).addTo(map)
   .bindPopup(`<h4>${popup}</h4>`)
   .openPopup() 
}

add_marker(41.7167522,-86.9012092,"FLUID Coffee Roasters has a<br>delicious maple latte!")
add_marker(41.6768,-83.6209,"SIP coffee has amazing<br>hot chocolate!")
add_marker(34.0598,-118.4445,"Alfred's is the first coffee<br>shop I went to in Westwood!")
add_marker(40.7128,-74.0060, "Coppola Cafe is in a vibrant<br>part of NYC!")

