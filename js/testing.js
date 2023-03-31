//function to instantiate the Leaflet map
function createMap(){
	//create the map
	var map=L.map('map', {center: [46.2349751,-104.6896562],zoom:3});
	
	//add OSm base tilelayer
	L.tileLayer('https://tile.thunderforest.com/landscape/{z}/{x}/{y}.png?apikey=ba21c9a366fa43c7b8f5af4065ed9c9f', {
		attribution: 'Maps &copy; <a href="https://www.thunderforest.com">Thunderforest</a>, Data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'
	}).addTo(map);
	
	//call getData function
    createRange(map);
	getData(map);
    
};

//build an attributes array from the data
function processData(data){
	//empty array to hold attributes
	var attributes = [];

	//properties of the first feature in the dataset
	var properties = data.features[0].properties;

	//push each attribute name into attributes array
	for (var attribute in properties){
		//only take attributes with population values
		if (attribute.startsWith("20")||attribute.startsWith("Ave")) {
			attributes.push(attribute);
		}
	};

	//check result and return result
	//console.log(attributes);
	return attributes;
};

//calculate the radius of each proportional symbol
function calcPropRadius(attValue){
	//scale factor to adjust symbol size evenly
	var scaleFactor = 200;
	//scale down attribute value for more reasonable radius size
	var valSmall = attValue/1000000;
	//area based on attribute value and scale factor
	var area = valSmall * scaleFactor;
	//radius calculated based on area
	var radius = Math.sqrt(area/Math.PI);
	return radius;
};

function createPopup(properties, layer, value, radius){
	//create popup content
	var popupContent = "<p><b>Park:</b> " + properties.given_name + "</p><p><b>Annual Park Visitations for 2011:</b> " + (value/1000000).toFixed(2) + " million</p>" + "<p><b>Average Number of Annual Visitors: </b>" + (properties.Average/1000000).toFixed(2) + " million</p>";

	//replace the layer popup
	layer.bindPopup(popupContent, {
		offset: new L.Point(0,-radius)
	});
};

//function to convert markers to circle markers
function pointToLayer(feature,latlng,attributes){
	//determine which attribute to visualize with proportional symbols by assigning current attribute based on first index in array
	//console.log(attributes);
    var index = $('.range-slider').on('input',function(){
        var index = $(this).val()
        return index
    })
	var attribute = attributes[index];
	//console.log(attribute);

	//create marker options
	var options = {
		fillColor: "#6bb58f",
		color: "#000",
		weight: 1,
		opacity: 1,
		fillOpacity: 0.5,
		title: feature.properties.given_name
	};

	//determine value for attribute of each feature
	var attValue = feature.properties[attribute];
	//createLegend(map,attValue);
	//console.log(attValue);

	//give each feature's circle marker a radius based on its attribute value
	options.radius = calcPropRadius(attValue);

	//create circle marker layer
	var layer = L.circleMarker(latlng, options);
	//console.log(layer);

	//replace popup content
	createPopup(feature.properties, layer, attValue, options.radius);

	//event listeners to open popup in panel
	layer.on({
		mouseover: function(){
			this.openPopup();
		},
		mouseout: function(){
			this.closePopup();
		},
		// click: function(){
		// 	$("#panel").html(panelContent)
		// }
	});

	//return the circle marker to the L.geoJson pointToLayer option
	return layer;
	//return attribute;
};

//function to convert markers to circle markers
function averageToLayer(feature,latlng){
	//determine which attribute to visualize with proportional symbols by assigning current attribute based on first index in array
	//console.log(attributes);
	//var attribute = attributes["Average"];
	//console.log(attribute);

	//create marker options
	var options = {
		fillColor: "#000",
		color: "#a83236",
		weight: 1.5,
		opacity: 1,
		fillOpacity: 0,
		title: feature.properties.Average
	};

	//determine value for attribute of each feature
	var attValue = feature.properties.Average;
	//createLegend(map,attValue);
	//console.log(attValue);

	//give each feature's circle marker a radius based on its attribute value
	options.radius = calcPropRadius(attValue);

	//create circle marker layer
	var aveLayer = L.circleMarker(latlng, options);

	//return the circle marker to the L.geoJson pointToLayer option
	return aveLayer;
	//return attribute;
};

function createRange(map){
	var rangeControl = L.Control.extend({
		options: {position: 'bottomleft'},
		onAdd: function(){
			var container = L.DomUtil.create('div','range-slider-container')
			$(container).append('<input class="range-slider" type="range"></input>')
			//set slider attributes
			$('.range-slider').attr({
				max: 9,
				min: 0,
				value: 0,
				step: 1
			});

            $(container).on('mousedown',function(e){
                L.DomEvent.stopPropagation(e)
            });

            $('container').append('<button class="skip" id="reverse">Previous Year</button>');
            $('container').append('<button class="skip" id="forward">Next Year</button>');

            /* //click listener for buttons
            $('.skip').click(function(){
                //get the old index value
                var index = $('.range-slider').val();

                //increment or decrement depending on button clicked
                if ($(this).attr('id') == 'forward'){
                    index++;
                    //if past last attribute, wrap around to first attribute
                    index = index > 9 ? 0 : index;
                } else if ($(this).attr('id') == 'reverse'){
                    index--;
                    //if past the first attribute, wrap around to last attribute
                    index = index < 0 ? 9 : index;
                };

                //update slider
                $('.range-slider').val(index);
                //console.log($('#filter:checked').val())
                //$('#filter').is(':checked') === false;

                //pass new attribute to update symbols
                updatePropSymbols(map, attributes[index]);
                updateLegend(map,attributes[index]);
                //update1MFilter(map,attributes[index]);
            });

            //input listener for slider
            $('.range-slider').on('input', function(){
                //get the new index value
                var index = $(this).val();
                //$('#filter').is(':checked') === false;

                //pass new attribute to update symbols
                updatePropSymbols(attributes[index],layer);
                updateLegend(map,attributes[index]);
                //$('#filter').is(':checked') ? false : false;
            });
        

            //input listener for slider
            $('.range-slider').on('input', function(){
                //get the new index value
                var index = $(this).val();

                //pass new attribute to update symbols
                updatePropSymbols(map,attributes[index]);
                updateLegend(map,attributes[index]);
                //$('#filter').is(':checked') ? false : false;
            }); */
            return(container);
		}
	})
	map.addControl(new rangeControl());
};

function updatePropSymbols(map,attribute){
    map.eachLayer(function(layer){
        if(layer == propSymbols){
            //access feature properties
            var props = layer.feature.properties;

            //update each feature's radius based on new attribute values
            var value = props[attribute];
            var radius = calcPropRadius(value);
            layer.setRadius(radius);

            //replace popup content
            createPopup(props,layer,value,radius);
        }
    })
		
};

function createLegend(map, attributes){
	var LegendControl = L.Control.extend({
		options: {
			position: 'bottomright'
		},

		onAdd: function() {
			//create the control container with a particular class name
			var container = L.DomUtil.create('div','legend-control-container');
			
			//add temporal legend div to container
			$(container).append('<div id="temporal-legend">');
			$("#temporal-legend").html(attributes);

			//start attribute legend svg string
			var svg = '<svg id="attribute-legend" width="160px" height="60px">';

			//object to base loop on
			var circles = {
				max: 20,
				mean: 40,
				min: 60
			};
	
			//loop to add each circle and text to svg string
			for (var circle in circles){
				//circle string
				svg += '<circle class="legend-circle" id="' + circle + '" fill="#6BB58F" fill-opacity="0.8" stroke="#000000" cx="30"/>';
	
				//text string
				svg += '<text id="' + circle + '-text" x="65" y="' + circles[circle] + '"></text>';
			};


			//close svg string
			svg += "</svg>";

			//add attribute legend svg to container
			$(container).append(svg);
			
			return container;
		}
	});
	map.addControl(new LegendControl());
	updateLegend(map,attributes[0]);
};

function updateLegend(map, attribute){
	//create content for legend
	var content = "Annual Park Visitors in " + attribute;

	//replace legend content
	$('#temporal-legend').html(content);

	//get the max, mean, and min values as an object
	var circleValues = getCircleValues(map,attribute);

	for (var key in circleValues){
		//get the radius
		var radius = calcPropRadius(circleValues[key]);

		//assign the cy and r attributes
		$('#'+key).attr({
			cy: 59 - radius,
			r: radius
		});

		//add legend text
		$('#'+key+'-text').text((circleValues[key]/1000000).toFixed(2) + " million");
	};
};

function getCircleValues(map,attribute){
	//start with min at highest possible and max at lowest possible number
	var min = Infinity, max = -Infinity;

	map.eachLayer(function(layer){
		//get the attribute value
		if(layer.feature){
			var attributeValue = layer.feature.properties[attribute];

			//test for min
			if (attributeValue < min){
				min = attributeValue;
			};

			//test for max
			if (attributeValue > max){
				max = attributeValue;
			};
		};
	});

	//set mean
	var mean = (max + min) / 2;

	//return values as an object
	return {
		max: max,
		mean: mean,
		min: min
	};
};

//function to retrieve the data and place it on the map
function getData(map){
	//load the data
	$.ajax("data/NPAnnualVisits.geojson", {
		dataType: "json",
		success: function(response){
            var attributes = processData(response)

            var propSymbols = L.geoJson(response,{
                pointToLayer: function(feature,latlng){
                    return pointToLayer(feature,latlng,attributes)
                }
            })
        
            var aveSymbols = L.geoJson(response, {
                pointToLayer: function(feature,latlng){
                    return averageToLayer(feature,latlng)
                }
            })
        
            //var symbols = L.layerGroup([propSymbols,aveSymbols])
        
            var baseMaps = {
                "Proportional Symbols": propSymbols
            }
        
            var overlayMaps = {
                "Averages": aveSymbols,
                "Proportional Symbols": propSymbols
            }
        
            var overlay = L.control.layers(baseMaps,overlayMaps)
            
            overlay.addTo(map);

            createLegend(map,attributes);
            //createRange(map);

           /*  $('.range-slider').on('input', function(){
                //get the new index value
                var index = $(this).val();


                //pass new attribute to update symbols
                updatePropSymbols(map,attributes[index]);
                updateLegend(map,attributes[index]);
                //$('#filter').is(':checked') ? false : false;
            }); */
            
        }
		
    });
};

$(document).ready(createMap);