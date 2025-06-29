// routes/map.routes.js
const express = require("express");
const router = express.Router();
const mapController = require("../controllers/map.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const { query } = require("express-validator");

// Example: GET /map/geocode?address=Taj+Mahal+Agra
router.get(
  "/get-coordinates",
  query("address").isString().isLength({ min: 3 }),
  authMiddleware.authUser,
  mapController.getCoordinates
);

router.get(
  "/get-distance-time",
  query("origin").isString().isLength({ min: 3 }),
  query("destination").isString().isLength({ min: 3 }),
  authMiddleware.authUser,
  mapController.getDistanceTime
);

router.get(
  "/get-suggestions",
  //  query("query").isString().isLength({ min: 3 }),
  authMiddleware.authUser,
  mapController.getAutoCompleteSuggestions
);

module.exports = router;
