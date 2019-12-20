var selectedRegion = $("#continents").val()

$("document").ready(function() {
    $.ajax({
        method: "GET",
        url: "https://restcountries.eu/rest/v2/region/"+selectedRegion 
    }).then(function(response) {
                var results = response
//dropdown for countries
                var countries = []
            for (var i = 0;i<results.length;i++) {
                countries.push(results[i].name)
                var country = $("<option>").val(countries[i])
                $("#countries").append(country)
                }
            console.log(countries)
            console.log($(".dropdown").html())
                


            })
})
