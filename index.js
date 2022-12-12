const express = require("express")
const app = express()
const path = require("path")
app.set("view engine", "ejs")
app.set("views", path.join(__dirname,"views"))

app.get("/", function (req,res){
    res.render("index")
})
console.log("running on http://localhost:3000")
app.listen(3000)