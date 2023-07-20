const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/owner');
const authController = require('../controllers/owner'); 



router.post('/signup', authController.signup);

router.post('/login', authController.login);


router.get('/:id', authController.getOwner);


router.put('/:id', authController.updateOwner);

router.put('/updatepassword/:id', authController.updatePassword);

router.post('/token',  authController.forgotPassword)

router.post('/reset',  authController.resetPassword)


// router.post('/notification',authController.sendNotificationEmail)

module.exports = router;
