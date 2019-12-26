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
                var cities = []
            for (var i = 0;i<10;i++) {
                    cities.push(results.data[i].name)
                    var city = $("<option>").text(cities[i])
                    $("#cities").append(city)
                    }
            })})


$(".logo").on("click", function(){
    window.location.href="index.html"
});
