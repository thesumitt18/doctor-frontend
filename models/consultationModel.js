const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./patientModel'); 

const Consultation = sequelize.define('Consultation', {
  status: {
    type: DataTypes.ENUM('Pending', 'Accepted', 'Confirmed', 'Completed', 'Rejected'),
    defaultValue: 'Pending',
  },
  appointment_time: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  image_url: {
    type: DataTypes.STRING,
  },
}, {
  timestamps: true,
});

// // Relationships
// Consultation.belongsTo(User, { as: 'patient', foreignKey: 'patient_id' });
// Consultation.belongsTo(User, { as: 'doctor', foreignKey: 'doctor_id' });

module.exports = Consultation;
