const rideModel = require('../models/ride.model');
const mapService = require('../services/map.service');
const crypto = require('crypto');




async function getFare (pickup, destination) {
    if( !pickup || !destination ){
        throw new Error("Pickup and Destination are required");
    }

    const distanceTime = await mapService.getDistanceTime(pickup, destination);

    const baseFare = {
        auto : 20,
        car : 40,
        moto: 10
    };
    
    const perKmRate = {
        auto : 9,
        car : 13,
        moto: 5 
    };

    const perMinRate = {
        auto : 2,
        car : 3,
        moto: 1
    };
    

    const fare = {

        auto : Math.round(baseFare.auto + (distanceTime.distanceInKm * perKmRate.auto) + (distanceTime.durationInMin * perMinRate.auto)),
        car : Math.round(baseFare.car + (distanceTime.distanceInKm * perKmRate.car) + (distanceTime.durationInMin * perMinRate.car)),
        moto : Math.round(baseFare.moto + (distanceTime.distanceInKm * perKmRate.moto) + (distanceTime.durationInMin * perMinRate.moto)),
    };

    return fare;

}
module.exports.getFare = getFare;


function getOtp(num){
    function generateOtp(num) {
        // console.log("here")
        const otp = crypto.randomInt(Math.pow(10, num-1), Math.pow(10, num)).toString();
        return otp;
    }
    return generateOtp(num);
}

module.exports.createRide = async ({ user, pickup, destination, vehicleType }) => {
    
    if( !user || !pickup || !destination || !vehicleType){
        throw new Error("All Fields are required");
    }

    const fare = await getFare(pickup, destination);
    // console.log(fare);
    // const otp = getOtp(6);
    // console.log(otp);

    const ride = await rideModel.create({
        user,
        pickup,
        destination,
        otp : getOtp(6),
        fare: fare[vehicleType],
    })

    return ride;
}





