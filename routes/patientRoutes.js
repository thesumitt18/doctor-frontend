const express = require('express');
const router = express.Router();
const { registerPatient, loginPatient } = require('../controllers/patientController');

// Register route
router.post('/register', registerPatient);
// Login route
router.post('/login', loginPatient);

module.exports = router;
