

$("#continents").on("change",function() {
    $("#countries").empty()
    var selectedRegion = $("#continents").val()
    
    $.ajax({
        method: "GET",
        url: "https://restcountries.eu/rest/v2/region/"+selectedRegion 
    }).then(function(response) {
                var results = response
//dropdown for countries
                var countries = []
            for (var i = 0;i<results.length;i++) {
                    countries.push(results[i].name)
                    var country = $("<option>").text(countries[i])
                    $("#countries").append(country)
                    }
            console.log(countries)
            console.log($("#countries").html())
                


            })
})

$("#countries").on("change",function() {
    $("#cities").empty()
    var selectedRegion = $("#continents").val()
    
    $.ajax({
        method: "GET",
        url: "https://restcountries.eu/rest/v2/region/"+selectedRegion 
    }).then(function(response) {
                var results = response
//dropdown for countries
                var countries = []
            for (var i = 0;i<results.length;i++) {
                    countries.push(results[i].name)
                    var country = $("<option>").text(countries[i])
                    $("#countries").append(country)
                    }
            console.log(countries)
            console.log($("#countries").html())
                


            })
})
