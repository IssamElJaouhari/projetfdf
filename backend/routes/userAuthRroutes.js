const { registrUser, loginUser } = require("../controllers/UserAuth.js")

const express = require("express")


const router = express.Router()


router.post("/register", registrUser)
router.post("/login", loginUser)


module.exports = router