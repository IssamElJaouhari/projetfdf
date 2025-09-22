const express = require("express")
const connectdata = require('./config/db.js')

connectdata()

const app = express()

app.get("/", (req, res) => {
    res.end("<h1>HELLO BACKEND</h1>")
})

app.get("/about", (req, res) => {
    res.end("<h1>about page</h1>")
})

app.get("/contact", (req, res) => {
    res.end("<h1>contact page</h1>")
})

app.get("/projets", (req, res) => {
    res.end("<h1>about page</h1>")
})


app.listen(7007, () => {
    console.log("server running")
})