

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
           
                getImage()


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


$("#logo-top").on("click", function(){
    window.location.href="index.html"
});

$("#logo-bottom").on("click", function(){
    window.location.href="index.html"
});


//---------------------------------slide-show------------------------------------------//

const carouselSlide = document.querySelector(".carousel-slide");
const carouselImages = document.querySelectorAll(".carousel-slide img");


//buttons
const prevBtn = document.querySelector("#prevBtn");
const nextBtn = document.querySelector("#nextBtn");

//Counter
let counter = 1; 
const size = carouselImages[0].clientWidth; // know how much to slide

carouselSlide.style.transform = "translateX(" + (-size * counter) + "px)"; // starts us at the first pic

//Button listeners

nextBtn.addEventListener("click", function () {
    if (counter >= carouselImages.length -1 ) return; //dont do anything
    carouselSlide.style.transition = "transform 0.4s ease-in-out"; // creates transition
    counter ++; //adds to our counter
    console.log(counter)
    carouselSlide.style.transform = "translateX(" + (-size * counter) + "px)";
});


prevBtn.addEventListener("click", function () {
    if (counter <= 0 ) return; //dont do anything
    carouselSlide.style.transition = "transform 0.4s ease-in-out"; // creates speed of transition
    counter --; //takes from our counter
    console.log(counter)
    carouselSlide.style.transform = "translateX(" + (-size * counter) + "px)";
});

carouselSlide.addEventListener("transitionend", function(){ //listens to when the slide stops moving
    console.log(carouselImages[counter]);
    if (carouselImages[counter].id === "lastClone"){
        carouselSlide.style.transition = "none";
        counter = carouselImages.length -2; 
        carouselSlide.style.transform = "translateX(" + (-size * counter) + "px)";
    }
    if (carouselImages[counter].id === "firstClone"){
        carouselSlide.style.transition = "none";
        counter = carouselImages.length - counter; 
        carouselSlide.style.transform = "translateX(" + (-size *counter) + "px)";
    }
})
function getImage(className) { 

    var image = "Africa";
    if (image === $("#continents").val()) {
        $("#regionPic").attr("src","assets/Africa.png")
    } 
    var image = "Americas";
    if (image === $("#continents").val()) {
        $("#regionPic").attr("src","assets/Americas.png")
    } 
    var image = "Asia";
    if (image === $("#continents").val()) {
        $("#regionPic").attr("src","assets/Asia.png")
    } 
    var image = "Europe";
    if (image === $("#continents").val()) {
        $("#regionPic").attr("src","assets/Europe.png")
    } 
    var image = "Oceania";
    if (image === $("#continents").val()) {
        $("#regionPic").attr("src","assets/Oceania.png")
    } 
    
   
}

