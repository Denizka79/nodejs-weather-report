const express = require("express");
const https = require("https");
const app = express();
app.get("/", function(req, res) {
    const url = "https://api.openweathermap.org/data/2.5/weather?q=Moscow&appid=7e38fde0788b6840a4d358435022c898&units=metric"
    https.get(url, function(response) {
        console.log(response.statusCode);
        response.on("data", function(data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<p>Weather is currently " + weatherDescription + "</p>");
            res.write("<h1>The temperature in Moscow is " + temp + " degrees.</h1>");
            res.write("<img src=" + imageURL + ">");
            res.send();
        })
    });
    //res.send("The server is up and running.");
});
app.listen(3000, function() {
    console.log("Server is running on port 3000.");
});