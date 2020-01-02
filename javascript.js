var cities = []

$("#continents").on("change", function () {
    $("#countries").empty()
    var selectedRegion = $("#continents").val()

    $.ajax({
        method: "GET",
        url: "https://restcountries.eu/rest/v2/region/"+selectedRegion 
    }).then(function(response) {
                var results = response
                console.log(response)
//dropdown for countries
                var countries = []
                var countryCodes = []
            for (var i = 0;i<results.length;i++) {
                    countries.push(results[i].name)
                    countryCodes.push(results[i].alpha2Code)
                    var country = $("<option>").text(countries[i]).val(countryCodes[i])
                    $("#countries").append(country)
                    }
            console.log(countries)
            console.log(countryCodes)
           
                


            })
})

$("#countries").on("change", function () {
    $("#cities").empty()
    var selectedCountry = $("#countries").val()
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://wft-geo-db.p.rapidapi.com/v1/geo/cities?limit=10&countryIds="+selectedCountry+"&minPopulation=350000&types=city",
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
            "x-rapidapi-key": "555cfff31emsh4fcda8a56074d60p149193jsn1ba035293d50"
        }
    }
    
    $.ajax(settings).then(function (response) {
        console.log(response);
                var results = response
//dropdown for cities
console.log(results.data[0].name)
                
            for (var i = 0;i<10;i++) {
                    cities.push({name:results.data[i].name,lat:results.data[i].latitude,lon:results.data[i].longitude})
                    
                    var city = $("<option>").text(cities[i].name)
                    $("#cities").append(city)

                    
                    
}
})})


$("#cities").on("change", function() {
    var googleKey = "AIzaSyA2-3Fi1nZ7Ep570B8W28x4lmGxY5UqRlc"
    var selectedCity = $("#cities").val()

    for(var i=0;i<cities.length;i++) {
        if (selectedCity===cities[i].name) {
            var lat = cities[i].lat
            var lon = cities[i].lon
        }
    }
    $.ajax({
        method: "GET",
        crossOrigin: true,
        url: "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+lat+","+lon+"&radius=2000&type=restaurant&key="+googleKey,
    }).then(function(response) {
            console.log(response)
        
        for(var i=0;i<5;i++) {
           var photoURL = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference="+response.results[i].photos[0].photo_reference+"&key="+googleKey
           var newDiv = $("<div>")
           var img = $("<img>").attr("src",photoURL)
           var title = $("<p>").text(response.results[i].name)
           var rating = $("<p>").text("Rating: "+response.results[i].rating+" Number of ratings: "+response.results[i].user_ratings_total)
           var vicinity = $("<p>").text("Vicinity: "+response.results[i].vicinity)
           
           newDiv.append(img,title,rating,vicinity)
           $("#results-go-here").append(newDiv)
        }}
    )})

