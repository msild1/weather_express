const express = require("express")
const app = express()
const path = require("path")
const fetch = require("node-fetch")

app.set("view engine", "ejs")
app.set("views", path.join(__dirname,"views"))





app.get("/", function (req,res){
    let key = "8e7fc1f98df00e5f10dc0e4579b07430"
    let city = "Tartu"
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`)
        .then(function(resp){
            return resp.json()
        }) // Convert data to json
        .then(function(data) {
            let desc = data.weather[0].description
            let city = data.name
            let temp = Math.round(parseFloat(data.main.temp)-273.15)
            res.render("index", {
                desc: desc,
                city: city,
                temp: temp,
            })
        })
        .catch(function(){
            // catch errors
        })
})
console.log("running on http://localhost:3000")
app.listen(3000)