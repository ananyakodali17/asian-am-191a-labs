// declare variables
let mapOptions = {'center': [44.0709,-110.444],'zoom':5}

// use the variables
const map = L.map('the_map').setView(mapOptions.center, mapOptions.zoom);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


function addMarker(data){
    // console.log(data)
    // these are the names of our lat/long fields in the google sheets:
    L.circleMarker([data.lat,data.lng],
            {"radius": 14,
            "color": "#fadadd",
            "weight":10,
            "opacity":500}).addTo(map).
        bindPopup(`<h2>${data.Location}</h2> <h3>${data.why}</h3>`)
    // adding our create button function
    createButtons(data.lat,data.lng,data.Location)
    return data.Location
}

function createButtons(lat,lng,title){
const newButton = document.createElement("button"); // adds a new button
newButton.id = "button"+title; // gives the button a unique id
newButton.innerHTML = title; // gives the button a title
newButton.setAttribute("lat",lat); // sets the latitude 
newButton.setAttribute("lng",lng); // sets the longitude 
newButton.addEventListener('click', function(){
    map.flyTo([lat,lng]); //this is the flyTo from Leaflet
})
const spaceForButtons = document.getElementById('placeForButtons')
spaceForButtons.appendChild(newButton);//this adds the button to our page.
}

const dataUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSfR2MoHEBDzM1v2AmGRbDomlpErNh9F7diQhJ4yKmut4cZioMfEVQGGAL8ItyZkWAMX4GoNRaGsxro/pub?output=csv"

function loadData(url){
    Papa.parse(url, {
        header: true,
        download: true,
        complete: results => processData(results)
    })
}

function processData(results){
    console.log(results)
    results.data.forEach(data => {
        console.log(data)
        addMarker(data)
    })
}

loadData(dataUrl)
