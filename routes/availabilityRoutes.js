const express = require('express');
const router = express.Router();
const { createAvailability, getDoctorAvailability } = require('../controllers/availabiltyController'); 
const authMiddleware = require('../middlewares/auth');

// Route for doctor to create availability
router.post('/create', authMiddleware, createAvailability);

// Route for doctor to get their availability
router.get('/availability', authMiddleware, getDoctorAvailability);

module.exports = router;
