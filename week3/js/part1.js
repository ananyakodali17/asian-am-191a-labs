// declare the map
const map = L.map('the_map').setView([34.0709,-118.444], 8);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

addMarker(41.7167522,-86.9012092,'FLUID Roasters','Has a delicious maple latte!')
addMarker(41.6768,-83.6209,'SIP coffee','Amazing hot chocolate!')
addMarker(40.7128,-74.0060,'Coppola Cafe','A cute spot in NYC!')
addMarker(34.0598,-118.4445,"Alfred's Westwood",'First coffee shop I tried in Westwood!')

// create a function to add markers
function addMarker(lat,lng,title,message){
    console.log(message)
    L.marker([lat,lng]).addTo(map).bindPopup(`<h2>${title}</h2> <h3>${message}</h3>`)
    createButtons(lat,lng,title);
    return message
}
function createButtons(lat,lng,title){
    const newButton = document.createElement("button"); 
    newButton.id = "button"+title; 
    newButton.innerHTML = title; 
    newButton.setAttribute("lat",lat); 
    newButton.setAttribute("lng",lng); 
    newButton.addEventListener('click', function(){
        map.flyTo([lat,lng]); 
    })
    document.getElementById("contents").appendChild(newButton); 
}
