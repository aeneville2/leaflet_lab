/*Sheet by Aspen Neville, 2022*/

var map = L.map('map').setView([51.505,-0.09],13); /*Creates map object given HTML element and sets view of map with a given center and zoom*/

L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'
}).addTo(map); /*load and display tile layers on the map with attribution describing copyright and layer data, adds layer to map*/

var marker = L.marker([51.5,-0.09]).addTo(map); /*create clickable icon on map and add to map*/
var circle = L.circle([51.508,-0.11],{
	color: 'red',
	fillColor: '#f03',
	fillOpacity: 0.5,
	radius: 500
}).addTo(map); /*create circle object given a geographical point with various style options and adds to map)*/
var polygon = L.polygon([[51.509,-0.08],[51.503,-0.06],[51.51,-0.047]]).addTo(map);/*add polygon object to map with outer ring coordinates and add to map*/

marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();/*bind popup to marker click*/
circle.bindPopup("I am a circle."); /*bind popup to layer and sets up necessary event listeners*/
polygon.bindPopup("I am a polygon.");

var popup = L.popup().setLatLng([51.513,-0.09]).setContent("I am a standalone popup.").openOn(map); /*initiates popup object and sets geographic point where it will open and sets HTML content and adds to map/closes previous one*/

var popup = L.popup(); /*initiates popup object*/

function onMapClick(e) {
	popup.setLatLng(e.latlng).setContent("You clicked the map at " + e.latlng.toString()).openOn(map); /*popup with open based on click location with content that converts location to string and opens popup*/
}

map.on('click',onMapClick); /*add listener function of particular event type to object*/

function onEachFeature(feature,layer){
	if(feature.properties && feature.properties.popupContent){
		layer.bindPopup(feature.properties.popupContent);
	}
} /*function called once for each feature once it has been created/styled, if feature has properties and popupContent then bind popuup to layer with necessary listeners*/

var geojsonFeature = {
	"type": "Feature",
	"properties": {
		"name": "Coors Field",
		"amenity": "Baseball Stadium",
		"popupContent": "This is where the Rockies play!"
	},
	"geometry": {
		"type": "Point",
		"coordinates": [-104.99404,39.75621]
	}
};

L.geoJSON(geojsonFeature, {onEachFeature:onEachFeature}).addTo(map);

var myLines = [{
	"type": "LineString",
	"coordinates": [[-100,40],[-105,45],[-110,55]]
},{
	"type": "LineString",
	"coordinates": [[-105,40],[-110,45],[-115,55]]
}];

var myLayer = L.geoJSON().addTo(map);
myLayer.addData(geojsonFeature);

var myStyle = {
	"color":"#ff7800",
	"weight": 5,
	"opacity":0.65
};

L.geoJSON(myLines, { style: myStyle }).addTo(map);

var states = [{
	"type": "Feature",
	"properties": {"party": "Republican"},
	"geometry": {
		"type": "Polygon",
		"coordinates": [[[-104.05,48.99],[-97.22,48.98],[-96.58,45.94],[-104.03,45.94],[-104.05,48.99]]]
	}
},{
	"type": "Feature",
	"properties": {"party": "Democrat"},
	"geometry":{
		"type": "Polygon",
		"coordinates": [[[-109.05,41.00],[-102.06,40.99],[-102.03,36.99],[-109.04,36.99],[-109.05,41.00]]]
	}
}];

L.geoJSON(states,{
	style: function(feature){
		switch(feature.properties.party){
			case 'Republican': return{color:"#ff0000"};
			case 'Democrat': return {color: "#0000ff"};
		}
	}
}).addTo(map);

var geojsonMarkerOptions = {
	radius: 8,
	fillColor: "#ff7800",
	color: "#000",
	weight: 1,
	opacity: 1,
	fillOpacity: 0.8
};

var someGeojsonFeature = {
	"type": "Feature",
	"properties": {
		"name": "Coors Field",
		"amenity": "Baseball Stadium",
		"popupContent": "This is where the Rockies play!"
	},
	"geometry": {
		"type": "Point",
		"coordinates": [-104.99404,39.75621]
	}
};

L.geoJSON(someGeojsonFeature, {
	pointToLayer: function(feature,latlng){
		return L.circleMarker(latlng,geojsonMarkerOptions);
	}
}).addTo(map);

var someFeatures = [{
	"type": "Feature",
	"properties": {
		"name": "CoorsField",
		"show_on_map": true
	},
	"geometry": {
		"type": "Point",
		"coordinates": [-104.99404,39.75621]
	}
},{
	"type": "Feature",
	"properties": {
		"name": "Busch Field",
		"show_on_map": false
	},
	"geometry": {
		"type": "Point",
		"coordinates": [-104.98404,39.74621]
	}
}];

L.geoJSON(someFeatures, {
	filter: function(feature, layer){
		return feature.properties.show_on_map;
	}
}).addTo(map);