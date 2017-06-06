

// function for querying tmbd api by person (actor, actress etc)
function searchTMDBbyPerson(searchObject, searchKey) {

	var tmdbApiKey = '82f6be9756f8de0b7738603a7b3fab34';

	// query URL for the TMDB API
	var queryURL = 'https://api.themoviedb.org/3/search/person?api_key=' + tmdbApiKey 
				+ '&language==en-US&query=' + searchObject.query + '&page=1&include_adult=false';

	// AJAX request
	$.ajax({
		method: "GET",
		url: queryURL
	}).done(function(r){
		if (r.results[0] != null) {
			console.log(r.results[0]);
			// saves results in searchObject.searchResults
			searchObject.searchResults = r.results[0];
			// adds head to profile_path
			searchObject.searchResults.profile_path = 
			'https://image.tmdb.org/t/p/w300' + searchObject.searchResults.profile_path;
			// is this the head path to the profile_path image url? https://image.tmdb.org/t/p/w300/
			// writes search results to firebase
			writeSearchData(searchObject, searchKey);
		}
	});
}

function displayPopular () {var settings = {
	  "async": true,
	  "crossDomain": true,
	  "url": "https://api.themoviedb.org/3/movie/popular?page=1&language=en-US&api_key=82f6be9756f8de0b7738603a7b3fab34",
	  "method": "GET",
	  "headers": {},
	  "data": "{}"
	}

	$.ajax(settings).done(function (response) {
	  for (i = 0; i < response.results.length; i++) {
	  	var li = $("<li>");
	  	var img = $("<img>");
	  	var div = $("<div>");
	  	var h3 = $("<h3>");
	  	var c = Math.floor(Math.random() * 3);
	  	var captions = ["center-align", "left-align", "right-align"];
	  	$("#backgrounds").append(li);
	  	li.append(img);
	  	li.attr("style", "opacity: 0; transform: translateX(0px) translateY(0px);")
	  	img.attr("src", "https://image.tmdb.org/t/p/w1280" + response.results[i].backdrop_path);
	  	li.append(div);
	  	
	  	div.addClass("caption " + captions[c]);
	  	div.append(h3)
	  	h3.text(response.results[i].title);
	  }
	  $('.slider').slider({indicators: false});
	});
}

// function for querying the omdb API using ajax
function searchOMDBbyMovie(searchObject, searchKey) {

	var omdbApiKey = 'd20f646e';

	// query URL for OMDB API
	var queryURL = 'http://www.omdbapi.com/?apikey=' + omdbApiKey 
				+ '&t=' + searchObject.query;

	// AJAX request
	$.ajax({
		method: "GET",
		url: queryURL
	}).done(function(r){
		if (r != null) {
			console.log(r);
			// saves results in searchObject.searchResults
			searchObject.searchResults = r;
			// writes search results to firebase
			writeSearchData(searchObject, searchKey);
		}
	});
}