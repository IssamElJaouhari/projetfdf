const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require("../models/user.js")




const registrUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;


        if (!name || !email || !password) {
            return res.status(400).json({ message: "Name, email, and password are required" });
        }


        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: "Email already exists" });
        }


        const passHashed = await bcrypt.hash(password, 10);


        const newUser = await User.create({
            name,
            email,
            password: passHashed,
        });

        // 5️⃣ Return response (avoid sending password back)
        res.status(201).json({
            message: "User registered successfully",
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
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const userexst = await User.findOne({ email })


        if (!userexst) {
            return res.status(400).json({ message: "Invalid email or password" })
        }

        const ispassmatch = await bcrypt.compare(password, userexst.password)
        if (!ispassmatch) {
            return res.status(400).json({ message: "Invalid email or password" })
        }

        const token = jwt.sign(
            { id: userexst._id }, process.env.JWT_SECRET_KEY,
            { expiresIn: process.env.EXPIRE_JWT }
        )
        res.json({
            message: "login successfully",
            token,
            user: {
                _id: userexst._id,
                name: userexst.name,
                email: userexst.email,
            }
        })

    } catch (error) {
        console.error("Error during login:", error)
        res.status(500).json({ message: "Internal server error" })
    }
}


module.exports = { registrUser, loginUser }