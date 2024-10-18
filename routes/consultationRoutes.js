const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth'); 
const { createConsultationRequest, updateConsultationStatus, getConsultationsForDoctor } = require('../controllers/consultationController');
const upload = require('../middlewares/multerConfig'); 

// Route for creating a consultation request (with file upload)
router.post('/request', authMiddleware, upload.single('image'), createConsultationRequest);

// Route for updating consultation status (Doctor's ability)
router.put('/status', authMiddleware, updateConsultationStatus);

// Route for getting consultations for the doctor (Dashboard view)
router.get('/consultations', authMiddleware, getConsultationsForDoctor);

module.exports = router;

