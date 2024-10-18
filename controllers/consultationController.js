const { User } = require('../models/patientModel');
const { Consultation } = require('../models/consultationModel');
const upload = require('../middlewares/multerConfig'); 

// Handle consultation request
exports.createConsultationRequest = async (req, res) => {
  const { doctor_id, appointment_time } = req.body;
  const patient_id = req.user.id; 

  try {
    // Handle image upload if present
    if (!req.file) {
      return res.status(400).json({ message: 'Image file is required.' });
    }

    const image_url = `/uploads/consultation_images/${req.file.filename}`;

    // Create a new consultation request
    const consultation = await Consultation.create({
      patient_id,
      doctor_id,
      appointment_time,
      image_url,
    });

    res.status(201).json({ message: 'Consultation request created successfully.', consultation });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating consultation request.' });
  }
};

// Update consultation status (Doctor's ability)
exports.updateConsultationStatus = async (req, res) => {
  const { consultation_id, status } = req.body;
  const doctor_id = req.user.id; // Using the authenticated doctor ID

  try {
    // Fetch the consultation
    const consultation = await Consultation.findOne({ where: { id: consultation_id, doctor_id } });
    if (!consultation) {
      return res.status(404).json({ message: 'Consultation not found or you are not the assigned doctor.' });
    }

    // Update the status
    consultation.status = status;
    await consultation.save();

    res.json({ message: `Consultation status updated to ${status}.`, consultation });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating consultation status.' });
  }
};

// Get consultations for the doctor (Dashboard view)
exports.getConsultationsForDoctor = async (req, res) => {
  const doctor_id = req.user.id; // Using the authenticated doctor ID

  try {
    const consultations = await Consultation.findAll({
      where: { doctor_id },
      include: [{ model: User, as: 'patient', attributes: ['name', 'email'] }],
    });

    res.json({ consultations });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error retrieving consultations.' });
  }
};
