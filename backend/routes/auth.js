const express = require("express")
const jwt = require("jsonwebtoken")
const User = require("../models/User")
const router = express.Router()

// Sign Up
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body

    if (!username || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" })
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" })
    }

    const existingUser = await User.findOne({ $or: [{ email }, { username }] })
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" })
    }

    const user = new User({ username, email, password })
    await user.save()

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || "your_jwt_secret_key_here", {
      expiresIn: "7d",
    })

    res.status(201).json({
      message: "User created successfully",
      token,
      user: { id: user._id, username: user.username, email: user.email },
    })
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message })
  }
})

// Sign In
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" })
    }

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" })
    }

    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" })
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || "your_jwt_secret_key_here", {
      expiresIn: "7d",
    })

    res.json({
      message: "Sign in successful",
      token,
      user: { id: user._id, username: user.username, email: user.email },
    })
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message })
  }
})

module.exports = router
