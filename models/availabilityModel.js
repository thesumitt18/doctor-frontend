
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Doctor = require('./doctorModel'); 

const Availability = sequelize.define('Availability', {
  doctor_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  available_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  available_time_start: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  available_time_end: {
    type: DataTypes.TIME,
    allowNull: false,
  },
}, {
  timestamps: false,
});

// Associations: Availability belongs to a Doctor
Availability.belongsTo(Doctor, {
  foreignKey: 'doctor_id',
  as: 'doctor',
});

module.exports = Availability;
