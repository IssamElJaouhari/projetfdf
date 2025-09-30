const { registrUser, loginUser } = require("../controllers/UserAuth.js")

const express = require("express")


const jwt = require('jsonwebtoken')

const User = require("../models/user.js")

const router = express.Router()



const protectedroute = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]

        if (!token) {
            return res.status(400).json({ message: "there is no token !!" })
        }

        const decoder = jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.user = await User.findById(decoder.id).select("-password")

        if (!req.user) {
            return res.status(404).json({ message: "sorry user not found" })
        }

        next();
    } catch (error) {
        return res.status(401).json({ message: "token problem" })
    }
}


router.post("/register", registrUser)
router.post("/login", loginUser)
router.get("/profile", protectedroute, (req, res) => {
    res.json(req.user)
})



module.exports = router