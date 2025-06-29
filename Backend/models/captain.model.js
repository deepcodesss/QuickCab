const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const captainSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength: [3, "First name must be at least 3 characters long"],
    },
    lastname: {
      type: String,
      required: true,
      minlength: [3, "Last name must be at least 3 characters long"],
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    //match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: true,
    select: false,
    //minlength: [6, 'Password must be at least 6 characters long'],
  },
  socketId: {
    type: String,
    //default: null,
  },
  status: {
    type: String,
    enum: ["active", "inactive" /*'banned'*/],
    default: "inactive",
  },

  drivingLicenseNumber: {
    type: String,
    unique: true,
    sparse: true,
    minlength: 10,
    maxlength: 20,
  },

  panNumber: {
    type: String,
    unique: true,
    sparse: true,
    minlength: 10,
    maxlength: 10,
  },

  vehicle: {
    color: String,
    plate: String,
    capacity: Number,
    vehicleType: {
      type: String,
      //required: true,
      enum: ["car", "motorcycle", "auto"],
    },
  },
  location: {
    lat: {
      type: Number,
    },
    lon: {
      type: Number,
    },
  },
});

captainSchema.index({ "vehicle.location": "2dsphere" });

captainSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  return token;
};

captainSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

captainSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

const captainModel = mongoose.model("captain", captainSchema);

module.exports = captainModel;
