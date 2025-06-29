const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
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
  
  router.get('/get-fare', 
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
)

module.exports = router;
