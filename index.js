const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const consultationRoutes = require('./routes/consultationRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const availabilityRoutes = require('./routes/availabilityRoutes');
const patientRoutes = require('./routes/patientRoutes');
const { sequelize } = require('./config/db'); 
dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json()); 

// Routes
app.use('/api/doctor', doctorRoutes)
app.use('/api/patient', patientRoutes)
app.use('/api/availability', availabilityRoutes);
app.use('/api/consultations', consultationRoutes);


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
