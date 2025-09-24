const express = require("express")
const connectdata = require('./config/db.js')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require("./models/user.js")

require("dotenv").config()

connectdata()

const app = express()

app.use(express.json())


app.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // 1️⃣ Validate input first
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Name, email, and password are required" });
        }

        // 2️⃣ Check if email already exists
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // 3️⃣ Hash password securely
        const passHashed = await bcrypt.hash(password, 10);

        // 4️⃣ Create user
        const newUser = await User.create({
            name,
            email,
            password: passHashed,
        });

        // 5️⃣ Return response (avoid sending password back)
        res.status(201).json({
            message: "User created successfully",
            user: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
            },
        });

    } catch (error) {
        console.error("❌ Error during user registration:", error);
        if (error.code === 11000) {
            return res.status(400).json({ message: "Email must be unique" });
        }
        res.status(500).json({ message: "Server error" });
    }
});







app.get("/", (req, res) => {
    res.end("<h1>HELLO postman</h1>")
})


app.listen(7007, () => {
    console.log("server running")
})