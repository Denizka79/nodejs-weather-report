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
            console.log(temp);
        })
    });
    res.send("The server is up and running.");
});
app.listen(3000, function() {
    console.log("Server is running on port 3000.");
});