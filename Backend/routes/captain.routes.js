const express = require('express');
const router = express.Router();
const { body } = require("express-validator");
const captainController = require('../controllers/captain.controller');
const authMiddleware = require('../middlewares/auth.middleware');



router.post('/register', [
    body('fullname.firstname').notEmpty().withMessage('First name is required'),
    body('fullname.lastname').notEmpty().withMessage('Last name is required'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('location.lat').optional().isNumeric(),
    body('location.lng').optional().isNumeric()
], captainController.registerCaptain);

router.post('/login', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 6}).withMessage('Password must be at least')
],
captainController.loginCaptain
)


router.get('/profile', authMiddleware.authCaptain, captainController.getCaptainProfile);

router.put('/kyc', [
    // body('vehicle.color').notEmpty().withMessage('Vehicle color is required'),
    // body('vehicle.plate').notEmpty().withMessage('Vehicle plate is required'),
    // body('vehicle.capacity').isNumeric().withMessage('Vehicle capacity must be a number'),
    // body('vehicle.vehicleType').notEmpty().isIn(['car', 'bike', 'auto']).withMessage('Invalid vehicle type')

], authMiddleware.authCaptain, captainController.submitKYC);

router.get('/logout', authMiddleware.authCaptain, captainController.logoutCaptain);

module.exports = router;