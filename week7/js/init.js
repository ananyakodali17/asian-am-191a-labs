// declare variables
let mapOptions = {'center': [44.0709,-118.444],'zoom':3}

// declare the map
const map = L.map('the_map').setView(mapOptions.center, mapOptions.zoom);

let Stadia_AlidadeSmooth = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png', {
	maxZoom: 20,
	attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
});

Stadia_AlidadeSmooth.addTo(map)

let yesYes = L.featureGroup();
let notAgain = L.featureGroup();

// define layers
let layers = {
    "Would go again": yesYes,
    "Do not recommend": notAgain
}
// add layer control box
L.control.layers(null,layers).addTo(map)


//L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
   // attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//}).addTo(map);

function addMarker(data){
    // console.log(data)
    // these are the names of our lat/long fields in the google sheets:
    if(data['Again'] == "Yes"){
        yesYes.addLayer(L.circleMarker([data.lat,data.lng],
            {"radius": 14,
            "color": "#C66FB3",
            "weight":10,
            "opacity":500}).addTo(map).
        bindPopup(`<h2>Recommended</h2> <h3>${data.Vacation}</h3> <h4>${data.Why}</h4>`))        
        createButtons(data.lat,data.lng,data['Vacation'])
    }
    else{
        notAgain.addLayer(L.circleMarker([data.lat,data.lng],
            {"radius": 14,
            "color": "#2D3047",
            "weight":10,
            "opacity":500}).addTo(map).
        bindPopup(`<h2>Not Recommended</h2> <h3>${data.Vacation}</h3> <h4>${data.Why}</h4>`))        
        createButtons(data.lat,data.lng,data['Vacation'])
    }
    return
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
    yesYes.addTo(map) // add our layers after markers have been made
    notAgain.addTo(map) // add our layers after markers have been made  
}

loadData(dataUrl)