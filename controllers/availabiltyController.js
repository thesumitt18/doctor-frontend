const { Availability } = require('../models/availabilityModel');

// Create a new availability slot for a doctor
exports.createAvailability = async (req, res) => {
  const { doctor_id, available_date, available_time_start, available_time_end } = req.body;

  try {
    const newAvailability = await Availability.create({
      doctor_id,
      available_date,
      available_time_start,
      available_time_end,
    });

    res.status(201).json({ message: 'Availability set successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error setting availability.' });
  }
};

// Get availability slots for a specific doctor
exports.getDoctorAvailability = async (req, res) => {
  const doctor_id = req.user.id;

  try {
    const availability = await Availability.findAll({
      where: { doctor_id },
    });

    res.json({ availability });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching availability.' });
  }
};
