const rideModel = require('../models/ride.model');
const mapService = require('../services/map.service');
const crypto = require('crypto');
const { sendMessageToSocketId } = require('../socket');






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
        vehicleType,
    })

    return ride;
}




module.exports.confirmRide = async ({ rideId, captain }) => {

    console.log(rideId, captain._id);

    if(!rideId){
        throw new error("rideId is required");
    }

    await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status : 'accepted',
        captain: captain._id
    })

    const ride = await rideModel.findOne({
        _id : rideId
    }).populate('user').populate('captain').select('+otp');

    if(!ride){
        throw new Error("Ride not found");
    }

    return ride;
}




module.exports.startRide = async({rideId, otp, captain}) => {

    console.log("printing the otp verification thing :: ", rideId, otp, captain);

    if(!rideId || !otp){
        throw new Error("rideId and otp are required");
    }
    
    const ride = await rideModel.findOne({
        _id: rideId
    }).populate('user').populate('captain').select('+otp')

    console.log("actual otp and entered otp :: ", ride.otp, otp);
    
    if(!ride){
        throw new Error("ride not found");
    }
    
    if(ride.status !== 'accepted'){
        throw new Error("ride not accepted");
    }

    if(ride.otp !== otp){
        throw new Error("Invalid otp");
    }

    await rideModel.findOneAndUpdate({
        _id : rideId
    }, {
        status : 'ongoing'
    })

    sendMessageToSocketId(ride.user.socketId, {
        event: 'ride-started',
        data: ride
    })
    
    return ride;
}




module.exports.endRide = async ({rideId, captain}) => {
    if(!rideId){
        throw new Error("rideId is required");
    }
    
    const ride = await rideModel.findOne({
        _id: rideId,
        captain : captain._id
    }).populate('user').populate('captain').select('+otp')
    
    if(!ride){
        throw new Error("ride not found");
    }
    
    if(ride.status !== 'ongoing'){
        throw new Error("ride not ongoing");
    }
    
    await rideModel.findOneAndUpdate({
        _id : rideId
    }, {
        status : 'completed'
    })
    
    return ride;
    
}



module.exports.cancelRide = async ({ rideId, captain }) => {

    console.log(rideId, captain._id);

    if(!rideId){
        throw new error("rideId is required");
    }

    await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status : 'cancelled',
        captain: captain._id
    })

    const ride = await rideModel.findOne({
        _id : rideId
    }).populate('user').populate('captain');

    if(!ride){
        throw new Error("Ride not found");
    }

    return ride;
}
