const rideService = require("../services/ride.service");
const { validationResult } = require("express-validator");
const mapService = require("../services/map.service");
const { sendMessageToSocketId } = require('../socket');
const rideModel = require("../models/ride.model");

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

    const captainInRadius = await mapService.getCaptainInTheRadius(
      pickupCoordinates.lat,
      pickupCoordinates.lon,
      3000 // 3km radius
    );

    ride.otp = ""; 

    const rideWithUser = await rideModel.findOne({ _id: ride._id}).populate('user')
    // console.log("this is ride data", rideWithUser);
    console.log(ride.vehicleType, rideWithUser.vehicleType);
    captainInRadius.map(async captain => {
      console.log("captain and ride are : ", captain, ride);
      // if(ride.vehicleType === rideWithUser.vehicleType)
      sendMessageToSocketId(captain.socketId, {
        event : 'new-ride',
        data: rideWithUser
      })
    })



    // console.log(captains);
  } catch (err) {
    console.log(err);
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


module.exports.confirmRide = async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({message : "validation error in rideId", errors : errors.array()});
  }
  
  const { rideId } = req.body;
  console.log(rideId);
  console.log(req.captain);
  
  try {
    const ride = await rideService.confirmRide({rideId, captain: req.captain});

    sendMessageToSocketId(ride.user.socketId, {
      event: 'ride-confirmed',
      data: ride
    })

    return res.status(200).json(ride);
  } catch (err) {
    return res.status(500).json({ massage: err.message });
  }
}


module.exports.startRide = async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    
    return res.status(400).json({message : "validation error in rideId", errors : errors.array()});
  }

  const {rideId, otp } = req.query;

  try{

    const ride = await rideService.startRide({ rideId, otp, captain : req.captain});
    
    sendMessageToSocketId(ride.user.socketId, {
      event : 'ride-started',
      data: ride
    })

    return res.status(200).json(ride);
  } catch(err){
    return res.status(500).json({message : err.message});
  }
}


module.exports.endRide = async (req, res) => {
  
  const errors = validationResult(req);
   if(!errors.isEmpty()){
    
    return res.status(400).json({message : "validation error in rideId", errors : errors.array()});
  }

  const { rideId } = req.body;
     try{

    const ride = await rideService.endRide({ rideId, captain : req.captain});
    
    sendMessageToSocketId(ride.user.socketId, {
      event : 'ride-ended',
      data: ride
    })

    return res.status(200).json(ride);
  } catch(err){
    return res.status(500).json({message : err.message});
  }

}


module.exports.cancelRide = async (req, res) => {

  const errors = validationResult(req);
   if(!errors.isEmpty()){
    
    return res.status(400).json({message : "validation error in rideId", errors : errors.array()});
  }

  const { rideId } = req.body;
     try{

    const ride = await rideService.cancelRide({ rideId, captain : req.captain});
    
    sendMessageToSocketId(ride.user.socketId, {
      event : 'ride-cancelled',
      data: ride
    })

    return res.status(200).json(ride);
  } catch(err){
    return res.status(500).json({message : err.message});
  }
  
}
