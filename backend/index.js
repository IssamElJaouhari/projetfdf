const express = require("express")
const cors = require("cors")
const connectdata = require('./config/db.js')
const routesAuth = require("./routes/userAuthRroutes.js")

require("dotenv").config()

const port = 7007


connectdata()
const app = express()

// Enable CORS for all origins (you can restrict this in production)
app.use(cors())

app.use(express.json())


app.use("/api/auth", routesAuth)

    / api / auth /

    app.get("/", (req, res) => {
        res.end("<h1>HELLO postman</h1>")
    })

app.listen(port, () => {
    console.log(`server running at ${port}`)
})

