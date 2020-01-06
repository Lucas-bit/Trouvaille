$(document).ready(function() {
  //Preloader
  preloaderFadeOutTime = 3000;
  function hidePreloader() {
  var preloader = $(".loader_bg");
  preloader.fadeOut(preloaderFadeOutTime);
  }
  hidePreloader();
  })


var cities = []
var countries = []

$("#continents").on("change", function () {
    $("#countries").empty()
    $("#cities").empty()
    cities = []
    countries = []

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
    cities = []
      var selectedCountry = $("#countries").val()
      var minPop = 350000
      var settings = {
          "async": true,
          "crossDomain": true,
          "url": "https://wft-geo-db.p.rapidapi.com/v1/geo/cities?limit=10&countryIds="+selectedCountry+"&minPopulation="+minPop+"&types=city",
          "method": "GET",
          "headers": {
              "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
              "x-rapidapi-key": "555cfff31emsh4fcda8a56074d60p149193jsn1ba035293d50"
}}

var countriesInterval = setInterval(function() {
        $.ajax(settings).then(function (response) {
                var results = response
                if (results.data.length > 0) {
      //dropdown for cities
                  for (var i = 0;i<10;i++) {
                    cities.push({name:results.data[i].name,lat:results.data[i].latitude,lon:results.data[i].longitude})
                          var city = $("<option>").text(cities[i].name)
                          $("#cities").append(city)
                          clearInterval(countriesInterval)
                  }} else {
                    minPop-=86250
                    settings.url = "https://wft-geo-db.p.rapidapi.com/v1/geo/cities?limit=10&countryIds="+selectedCountry+"&minPopulation="+minPop+"&types=city"
                  }
                })},1000)
      
                
    })


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

//Button listeners//

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

// Weather starts here //

$(document).ready(function() {
    $("#button").on("click", function() {
        event.preventDefault()
      var searchValue = $("#cities").val();
  
      // clear input box
    
  
      getForecast(searchValue);

    });
  
    $(".history").on("click", "li", function() {
      searchWeather($(this).text());
    });
  
    function makeRow(text) {
      var li = $("<li>").addClass("list-group-item list-group-item-action").text(text);
      $(".history").append(li);
    }
  
    function searchWeather(searchValue) {
      $.ajax({
        type: "GET",
        url: "http://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&appid=7ba67ac190f85fdba2e2dc6b9d32e93c&units=imperial",
        dataType: "json",
        success: function(data) {
          // create history link for this search
          console.log(data)
          if (history.indexOf(searchValue) === -1) {
            history.push(searchValue);
            window.localStorage.setItem("history", JSON.stringify(history));
      
            makeRow(searchValue);
          }
          
          // clear any old content
          $("#today").empty();
  
          // create html content for current weather
          var title = $("<h3>").addClass("card-title").text(data.name + " (" + new Date().toLocaleDateString() + ")");
          var card = $("<div>").addClass("card");
          var wind = $("<p>").addClass("card-text").text("Wind Speed: " + data.wind.speed + " MPH");
          var humid = $("<p>").addClass("card-text").text("Humidity: " + data.main.humidity + "%");
          var temp = $("<p>").addClass("card-text").text("Temperature: " + data.main.temp + " °F");
          var cardBody = $("<div>").addClass("card-body");
          var img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png");
  
          // merge and add to page
          title.append(img);
          cardBody.append(title, temp, humid, wind);
          card.append(cardBody);
          $("#today").append(card);
  
          // call follow-up api endpoints
          getForecast(searchValue);
          getUVIndex(data.coord.lat, data.coord.lon);
        }
      });
    }
    
    function getForecast(searchValue) {
      $.ajax({
        type: "GET",
        url: "http://api.openweathermap.org/data/2.5/forecast?q=" + searchValue + "&appid=7ba67ac190f85fdba2e2dc6b9d32e93c&units=imperial",
        dataType: "json",
        success: function(data) {
          // overwrite any existing content with title and empty row
          $("#forecast").html("<h4 class=\"mt-3\">5-Day Forecast: "+ data.city.name +"</h4>").append("<div class=\"row\">") 
          console.log(data)
  
          // loop over all forecasts (by 3-hour increments)
          for (var i = 0; i < data.list.length; i++) {
            // only look at forecasts around 3:00pm
            if (data.list[i].dt_txt.indexOf("15:00:00") !== -1) {
              // create html elements for a bootstrap card
              var col = $("<div>").addClass("col-md-2 card-margin");
              var card = $("<div>").addClass("card bg-primary text-white");
              var body = $("<div>").addClass("card-body p-2");
  
              var title = $("<h5>").addClass("card-title").text(new Date(data.list[i].dt_txt).toLocaleDateString());
  
              var img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png");
  
              var p1 = $("<p>").addClass("card-text").text("Temp: " + data.list[i].main.temp_max + " °F");
              var p2 = $("<p>").addClass("card-text").text("Humidity: " + data.list[i].main.humidity + "%");
  
              // merge together and put on page
              col.append(card.append(body.append(title, img, p1, p2)));
              $("#forecast .row").append(col);
            }
          }
        }
      });
    }
  
    function getUVIndex(lat, lon) {
      $.ajax({
        type: "GET",
        url: "http://api.openweathermap.org/data/2.5/uvi?appid=7ba67ac190f85fdba2e2dc6b9d32e93c&lat=" + lat + "&lon=" + lon,
        dataType: "json",
        success: function(data) {
          var uv = $("<p>").text("UV Index: ");
          var btn = $("<span>").addClass("btn btn-sm").text(data.value);
          
          // change color depending on uv value
          if (data.value < 3) {
            btn.addClass("btn-success");
          }
          else if (data.value < 7) {
            btn.addClass("btn-warning");
          }
          else {
            btn.addClass("btn-danger");
          }
          
          $("#today .card-body").append(uv.append(btn));
        }
      });
    }
  
    // get current history, if any
    var history = JSON.parse(window.localStorage.getItem("history")) || [];
  
    // if (history.length > 0) {
    //   searchWeather(history[history.length-1]);
    // }
  
    for (var i = 0; i < history.length; i++) {
      makeRow(history[i]);
    }
  });
  

//get restaurants and tourist attractions

$("#button").on("click", function() {
  var googleKey = "AIzaSyA2-3Fi1nZ7Ep570B8W28x4lmGxY5UqRlc"
  var selectedCity = $("#cities").val()
    for(var i=0;i<cities.length;i++){
      if (selectedCity===cities[i].name){
          var lat = cities[i].lat
          var lon = cities[i].lon
}}
  
  $.ajax({
    method: "GET",
    crossOrigin: true,
    url: "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+lat+","+lon+"&radius=2000&type=restaurant&key="+googleKey,
  }).then(function(response) {
      $("#restaurant-title").html("<h4 class=\"resturant-title\">Restaurants: " ,"</h4>")
      $("#restaurant")
        for(var i=0;i<5;i++) {
          var photoURL = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference="+response.results[i].photos[0].photo_reference+"&key="+googleKey
          var newDiv = $("<div>").addClass("restaurant-divs")
          var img = $("<img>").attr("src",photoURL).addClass("restaurant-photos")
          var title = $("<p>").text(response.results[i].name).addClass("restaurant-name")
          var rating = $("<p>").text("Rating: "+response.results[i].rating+" Number of ratings: "+response.results[i].user_ratings_total).addClass("restaurant-rating")
          var area = $("<p>").text("Area: "+response.results[i].vicinity).addClass("restaurant-area")
          newDiv.append(img,title,rating,area)
          $("#restaurant").append(newDiv)
}})

  $.ajax({
    method: "GET",
    crossOrigin: true,
    url: "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+lat+","+lon+"&radius=2000&type=tourist_attraction&key="+googleKey,
  }).then(function(response){
      $("#pointsOfInterestTitle").html("<h4 class=\"points-of-int\">Points of Interest: " ,"</h4>")
      $("#pointsOfInterest")
        for(var i=0;i<5;i++){
           var photoURL = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference="+response.results[i].photos[0].photo_reference+"&key="+googleKey
           var newDiv = $("<div>").addClass("points-of-int-divs")
           var img = $("<img>").attr("src",photoURL).addClass("points-of-int-photos")
           var title = $("<p>").text(response.results[i].name).addClass("points-of-int-name")
           var rating = $("<p>").text("Rating: "+response.results[i].rating+" Number of ratings: "+response.results[i].user_ratings_total).addClass("points-of-int-rating")
           var area = $("<p>").text("Area: "+response.results[i].vicinity).addClass("points-of-int-area")
           
           newDiv.append(img,title,rating,area)
           $("#pointsOfInterest").append(newDiv)
}})})