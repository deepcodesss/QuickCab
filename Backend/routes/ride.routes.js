const express = require("express");
const router = express.Router();
const { body, query } = require("express-validator");
const rideController = require("../controllers/ride.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post(
  "/create",
  authMiddleware.authUser,
  body("pickup")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Inavlid pickup address"),
  body("destination")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Inavlid destination address"),
  body("vehicleType")
    .isString()
    .isIn(["auto", "car", "moto"])
    .withMessage("Inavlid vehicle type"),
  rideController.createRide
);

router.get(
  "/get-fare",
  authMiddleware.authUser,
  body("pickup")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Inavlid pickup address"),
  body("destination")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Inavlid destination address"),
  rideController.getFare
);

router.post(
  "/confirm",
  authMiddleware.authCaptain,
  body("rideId").isMongoId().withMessage("Inavlid ride id"),
  rideController.confirmRide
);

router.get(
  "/start-ride",
  authMiddleware.authCaptain,
  query("rideId").isMongoId().withMessage("Inavlid ride id"),
  query("otp").isString().isLength({ min : 6, max : 6}).withMessage("Inavlid otp"),
  rideController.startRide
);

router.post('/end-ride',
  authMiddleware.authCaptain,
  body("rideId").isMongoId().withMessage("Inavlid ride id"),
  rideController.endRide
)

module.exports = router;
