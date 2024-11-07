const express = require("express");
const router = express.Router();
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/auth");

const User = require("../models/User");
const Mail = require("./mail");

// @route GET api/auth
// @desc Check if user is logged in
// @access Public
router.get("/", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    res.json({ success: true, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @route POST api/auth/register
// @desc Register user
// @access Public
router.post("/register", async (req, res) => {
  const { email, password, name, phone, address } = req.body;

  // Simple validation
  if (!email || !password || !name)
    return res.status(400).json({
      success: false,
      message: "Please fill out all required fields.",
    });

  try {
    // Check for existing user
    const user = await User.findOne({ email });

    if (user)
      return res
        .status(400)
        .json({ success: false, message: "Email has already registered." });

    // All good
    const hashedPassword = await argon2.hash(password);
    const newUser = new User({
      email,
      password: hashedPassword,
      name,
      phone,
      address,
    });
    await newUser.save();

    // Send confirmation email
    const mail = new Mail();
    mail.setReceiver(email);
    mail.setSubject(`Welcome to ${mail.mailOptions.from.name}`);
    mail.setText(`Hi ${name},\n\nThank you for registering with us!`);
    mail.setHTML(
      `<h1>Welcome to ${mail.mailOptions.from.name}!</h1><p>Hi ${name},</p><p>Thank you for registering with us!</p>`
    );

    try {
      await mail.send();
      console.log("Confirmation email sent successfully");
    } catch (emailError) {
      console.error("Error sending confirmation email:", emailError);
    }

    // Return token
    const accessToken = jwt.sign(
      { userId: newUser._id },
      process.env.ACCESS_TOKEN_SECRET
    );

    res.json({
      success: true,
      message: "User created successfully",
      accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @route POST api/auth/login
// @desc Login user
// @access Public
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res
      .status(400)
      .json({ success: false, message: "Missing email and/or password" });

  try {
    // Check for existing user
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "Incorrect email or password" });

    // Email found
    const passwordValid = await argon2.verify(user.password, password);
    if (!passwordValid)
      return res
        .status(400)
        .json({ success: false, message: "Incorrect email or password" });

    // Return token
    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET
    );

    res.json({
      success: true,
      message: "User logged in successfully",
      accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
