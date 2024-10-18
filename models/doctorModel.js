// models/doctorModel.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
// const Availability = require('./availabilityModel');

const Doctor = sequelize.define('Doctor', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING, 
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: { 
    type: DataTypes.STRING,
    allowNull: false,
  },
  specialization: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
});

// // Associations: A Doctor has many Availability records
// Doctor.hasMany(Availability, {
//   foreignKey: 'doctor_id',
//   as: 'availabilities', // Alias to access related availabilities
// });

module.exports = Doctor;
