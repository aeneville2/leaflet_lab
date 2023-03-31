/* $("#5Mfilter").on('click',function(){
		if ($(this).is(':checked')){
			//help from David Hedlund reply to stackoverflow question 2272507
			//$('#filter').attr({checked: true})
			create5FilterSymbols(data,map,attributes)
		} else {
			//$('#filter').attr({checked: false})
			removeFilterSymbols(data,map,attributes)
		}	
	});
	$("#10Mfilter").on('click',function(){
		if ($(this).is(':checked')){
			//help from David Hedlund reply to stackoverflow question 2272507
			//$('#filter').attr({checked: true})
			create10FilterSymbols(data,map,attributes)
		} else {
			//$('#filter').attr({checked: false})
			removeFilterSymbols(data,map,attributes)
		}	
	});
	$("#1Mfilter").on('click',function(){
		if ($(this).is(':checked')){
			//help from David Hedlund reply to stackoverflow question 2272507
			//$('#filter').attr({checked: true})
			create1FilterSymbols(data,map,attributes)
		} else {
			//$('#filter').attr({checked: false})
			removeFilterSymbols(map)
		}	
	}); */

	/* function create5FilterSymbols(data, map, attributes){
	map.eachLayer(function(layer){
		if (layer.feature){
			map.removeLayer(layer)
		}
	})

	//create a Leaflet GeoJSON layer and add to map
	//help from cmrRose response in gis stackexchange question 283070
	L.geoJson(data, {
		pointToLayer: function(feature, latlng){
			return pointToLayer(feature,latlng,attributes);
		},
		filter: function(feature){
			if (feature.properties["2011"] > 1000000)return true
			console.log(feature.properties["2011"])
		},
	}).addTo(map);
};

function create10FilterSymbols(data, map, attributes){
	map.eachLayer(function(layer){
		if (layer.feature){
			map.removeLayer(layer)
		}
	})

	//create a Leaflet GeoJSON layer and add to map
	//help from cmrRose response in gis stackexchange question 283070
	L.geoJson(data, {
		pointToLayer: function(feature, latlng){
			return pointToLayer(feature,latlng,attributes);
		},
		filter: function(feature){
			switch(true){
				case (feature.properties["2011"]>5000000): return feature
			}	
		},
	}).addTo(map);
};

function create1FilterSymbols(data, map, attributes){
	map.eachLayer(function(layer){
		if (layer.feature){
			map.removeLayer(layer)
		}
	})

	//create a Leaflet GeoJSON layer and add to map
	//help from cmrRose response in gis stackexchange question 283070
	L.geoJson(data, {
		pointToLayer: function(feature, latlng){
			return pointToLayer(feature,latlng,attributes);
		},
		filter: function(feature){
			//var val = $('.range-slider').val()
			//console.log($('.range-slider').val())
			if (feature.properties[attributes] > 500000)return true
			//console.log(feature.properties["2011"])
		},
	}).addTo(map);
}; */

//$(container).append('<input type="checkbox" id="5Mfilter">Show Parks with More than 5 Million Visitors</input>');
			//$(container).append('<input type="checkbox" id="10Mfilter">Show Parks with More than 10 Million visitors</input>');
			//$(container).append('<input type="checkbox" id="1Mfilter">Show Parks with more than 1 Million visitors</input>')

			/*$('#filter').attr({
				checked: false
			});*/

// function update1MFilter(map, attribute){
	
// 	if ($("#1Mfilter").is(':checked')){
// 		//help from David Hedlund reply to stackoverflow question 2272507
// 		//$('#filter').attr({checked: true})
// 		//create1FilterSymbols(data,map,attribute[index])
// 		map.eachLayer(function(layer){
// 			if (layer.feature && layer.feature.properties[attribute]){
// 				layer.options.filter(function(feature, attribute){
// 					if (feature.properties[attribute]>500000) {return true}
// 				})
// 			}
// 		})
// 	// } else {
// 	// 	//$('#filter').attr({checked: false})
// 	// 	removeFilterSymbols(data,map,attribute)
// 	// }	
// }};