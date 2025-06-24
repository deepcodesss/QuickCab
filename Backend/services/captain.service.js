const captainModel = require('../models/captain.model');


module.exports.createCaptain = async ({
    firstname,
    lastname,
    email,
    password,
}) => {
    if (!firstname || !lastname || !email || !password) {
        throw new Error('All fields are required');
    }

    const captain = await captainModel.create({
        fullname: {
            firstname,
            lastname,
        },
        email,
        password,
    });

    return captain;
}