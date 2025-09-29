const express = require("express")
const connectdata = require('./config/db.js')
const routesAuth = require("./routes/userAuthRroutes.js")

require("dotenv").config()

const port = 7007


connectdata()
const app = express()

app.use(express.json())


app.use("/api/auth", routesAuth)


app.get("/", (req, res) => {
    res.end("<h1>HELLO postman</h1>")
})

app.listen(port, () => {
    console.log(`server running at ${port}`)
})