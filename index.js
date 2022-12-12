const express = require("express")
const app = express()
const path = require("path")
const fetch = require("node-fetch")
let bodyParser = require('body-parser')
// const body = require("body-parser")
let urlencodedParser = bodyParser.urlencoded({ extended: false })


app.set("view engine", "ejs")
app.set("views", path.join(__dirname,"views"))

const key = "8e7fc1f98df00e5f10dc0e4579b07430"


const getWeatherDataPromise = (url) => {
    return new Promise((resolve,reject) => {
        fetch(url)
            .then(response =>{
                return response.json()
            })
            .then(data =>{
                console.log(data.weather)
                let desc = data.weather[0].description
                let city = data.name
                let temp = Math.round(parseFloat(data.main.temp)-273.15)
                let result = {
                    desc: desc,
                    city: city,
                    temp: temp,
                }
                resolve(result)
            })
            .catch(error => {
                reject(error)
            })
    })
}

app.all("/",urlencodedParser,function(req,res){
    let city
    if(req.method == "GET"){
        city="Tartu"
    }
    if(req.method == "POST"){
        city=req.body.cityname
    }
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`
    getWeatherDataPromise(url).then(data => {
        res.render("index",data)
    })
})

app.get("/", function (req,res){
    let city = "Tartu"
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`

    getWeatherDataPromise(url).then(data => {
        res.render("index",data)
    })
})

app.post("/", urlencodedParser,function (req,res){
    let city = req.body.cityname
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`

    getWeatherDataPromise(url).then(data => {
        res.render("index",data)
    })
})



console.log("running on http://localhost:3000")
app.listen(3000)