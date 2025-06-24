const captainModel = require("../models/captain.model");
const captainService = require("../services/captain.service");
const blacklistTokenModel = require("../models/blacklistToken.model");
const { validationResult } = require("express-validator");

module.exports.registerCaptain = async (req, res, next) => {
  console.log("Received body:", req.body);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, password, vehicle } = req.body;

  const hashedPassword = await captainModel.hashPassword(password);

  const isCaptainAlreadyExists = await captainModel.findOne({ email });
  if (isCaptainAlreadyExists) {
    return res
      .status(400)
      .json({ message: "Captain with this email already exists" });
  }

  try {
    const captain = await captainService.createCaptain({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email: email,
      password: hashedPassword,
    });

    const token = captain.generateAuthToken();
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(201).json({
      captain,
      token,
      message: "Captain registered successfully",
    });
  } catch (error) {
    console.error("Error registering captain:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.loginCaptain = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const captain = await captainModel.findOne({ email }).select("+password");

    if (!captain) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await captain.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = captain.generateAuthToken();
    res.cookie("token", token);

    res.status(200).json({
      captain,
      token,
      message: "Captain logged in successfully",
    });
  } catch (error) {
    console.error("Error logging in captain:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.getCaptainProfile = async (req, res, next) => {
  res.status(200).json({ captain: req.captain });
};

module.exports.logoutCaptain = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  await blacklistTokenModel.create({ token });

  res.clearCookie("token");

  res.status(200).json({ message: "Logout successfully" });
};

module.exports.submitKYC = async (req, res) => {
  try {
    const { vehicle, aadhaarNumber, panNumber } = req.body;

    // Prevent reuse of Aadhaar or PAN
    const existingCaptain = await captainModel.findOne({
      $or: [{ aadhaarNumber }, { panNumber }],
      _id: { $ne: req.captain._id },
    });

    if (existingCaptain) {
      return res.status(400).json({ message: "Aadhaar or PAN already in use" });
    }

    // Optional: prevent re-submission of KYC for same captain
    if (req.captain.aadhaarNumber || req.captain.panNumber) {
      return res.status(400).json({ message: "KYC already submitted" });
    }

    const updatedCaptain = await captainModel.findByIdAndUpdate(
      req.captain._id,
      {
        vehicle,
        aadhaarNumber,
        panNumber,
        status: "active",
      },
      { new: true }
    );

    return res
      .status(200)
      .json({ message: "KYC submitted", captain: updatedCaptain });
  } catch (err) {
    console.error("KYC Error:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
