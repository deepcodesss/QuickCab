const rideService = require("../services/ride.service");
const { validationResult } = require("express-validator");
const mapService = require("../services/map.service");
const { sendMessageToSocketId } = require('../socket');

module.exports.createRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return res
      .status(400)
      .json({ message: "validation error" }, { errors: errors.array() });
  }
  //  console.log(req.body);

  const { userId, pickup, destination, vehicleType } = req.body;

  try {
    const ride = await rideService.createRide({
      user: req.user._id,
      pickup,
      destination,
      vehicleType,
    });
    res.status(201).json({ ride, message: "ride created successfully" });

    const pickupCoordinates = await mapService.getLatLngFromAddress(pickup);

    const captains = await mapService.getCaptainInTheRadius(
      pickupCoordinates.lat,
      pickupCoordinates.lon,
      3000 // 3km radius
    );

    ride.otp = ""; 

    // for (const captain of captains) {
    //   if (captain.socketId) {
    //     sendMessageToSocketId(captain.socketId, {
    //       event: "new-ride",
    //       data: {
    //         rideId: ride._id,
    //         pickup,
    //         destination,
    //       },
    //     });
    //   }
    // }

    captains.map(captain => {
      console.log("captain and ride are : ", captain, ride);
      sendMessageToSocketId(captain.socketId, {
        event : 'new-ride',
        data: ride
      })
    })



    // console.log(captains);
  } catch (err) {
    return res.status(500).json({ massage: err.message });
  }
};

module.exports.getFare = async (req, res) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //    console.log(errors);
  //    return res
  //    .status(400)
  //    .json({ message: "validation error" }, { errors: errors.array() });
  // }

  const { pickup, destination } = req.query;

  try {
    const fare = await rideService.getFare(pickup, destination);
    // console.log(fare);
    return res.status(200).json(fare);
  } catch (err) {
    return res.status(500).json({ massage: err.message });
  }
};
