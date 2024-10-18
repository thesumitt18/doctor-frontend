
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Doctor = require('../models/doctorModel');
const dotenv = require('dotenv');
// const Availability = require('../models/availabilityModel');
dotenv.config();

// Doctor Registration
exports.registerDoctor = async (req, res) => {
  const { name, email, password, specialization, phone } = req.body;

  if (!name || !email || !password || !phone || !specialization) {
    return 'All fields are required, and specialization is mandatory for doctors.';
  }
  try {
    const existingDoctor = await Doctor.findOne({ where: { email } });
    if (existingDoctor) {
      return res.status(400).json({ message: 'Doctor already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await Doctor.create({
      name,
      email,
      password: hashedPassword,
      specialization,
      phone,
    });
    
    res.status(201).json({ message: 'Doctor registered successfully.' });
  } catch (err) {
    console.error('Error details:', err);
    res.status(500).json({ message: 'Error registering doctor.' });
  }
};
// Doctor Login
exports.loginDoctor = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }
  try {
    const doctor = await Doctor.findOne({ where: { email, role: 'doctor' } });
    if (!doctor) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    // Create JWT token
    const token = jwt.sign(
      { id: doctor.id, role: doctor.role, email: doctor.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' } 
    );

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error logging in doctor.' });
  }
};
