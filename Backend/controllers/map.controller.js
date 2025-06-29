// controllers/map.controller.js
const mapService = require("../services/map.service.js");
const { validationResult } = require("express-validator");

module.exports.getCoordinates = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ message: "validation error" }, { errors: errors.array() });
  }

  const { address } = req.query;
  // console.log('Received address:', address); //  DEBUG

  if (!address) {
    return res.status(400).json({ error: "Address is required" });
  }

  try {
    const coords = await mapService.getLatLngFromAddress(address);
    // console.log('Coords received:', coords); //  DEBUG

    if (!coords) {
      return res.status(404).json({ error: "Location not found" });
    }

    res.json(coords);
  } catch (err) {
    // console.error('Error in getCoordinates:', err); //  DEBUG
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.getDistanceTime = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ message: "validation error" }, { errors: errors.array() });
  }
  const { origin, destination } = req.query;
  
  if (!origin || !destination) {
    return res
    .status(400)
    .json({ error: "Origin and destination are required" });
  }
  
  try {
    const routeInfo = await mapService.getDistanceTime(origin, destination);
    res.json(routeInfo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports.getAutoCompleteSuggestions = async (req, res) => {
  // const errors = validationResult(req.query);
  // if (!errors.isEmpty()) {
  //   return res
  //     .status(400)
  //     .json({ message: "validation error" }, { errors: errors.array() });
  // }
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: "Query is required" });
  }

  try {
    const suggestions = await mapService.getAutoCompleteSuggestions(query);
    res.json(suggestions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
