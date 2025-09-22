const express = require("express")
const connectdata = require('./config/db.js')

connectdata()

const app = express()




app.listen(7007, () => {
    console.log("server running")
})