const express = require('express');

const router = express.Router();

// PATH-NYA DIBENERIN! Mundur 1 folder (..), trus masuk ke controllers
const authController = require('../controllers/authController');

router.post('/register/complete-profile', authController.completeProfile);
router.get('/profile/basic/:userId', authController.getBasicProfile);

module.exports = router;
