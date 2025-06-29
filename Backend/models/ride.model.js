const mongoose = require('mongoose');





const rideSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required : true
    },
    captain:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'captain',
    },
    pickup:{
        type: String,
        required : true
    },
    destination:{
        type: String,
        required : true
    },
    fare:{
        type: String,
        required : true
    },
    status:{
        type: String,
        enum: [ 'pending', 'accepted', 'ongoing', 'completed', 'cancelled' ],
        default: 'pending'
    },
    duration: {
        type : Number
    },
    distance: {
        type: Number
    },
    paymentId: {
        type: String
    },
    orderId: {
        type: String
    },
    signature : {
        type: String,
    },
    otp:{
        type: String,
        required: true,
        select: false,
    },
})

module.exports = mongoose.model('rideSchema', rideSchema);