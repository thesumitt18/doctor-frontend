const express = require('express');
const router = express.Router();
const { registerDoctor, loginDoctor } = require('../controllers/doctorController');

// Register route
router.post('/register', registerDoctor);
// Login route
router.post('/login', loginDoctor);

module.exports = router;
