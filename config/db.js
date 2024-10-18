const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

// Setting up Sequelize connection
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql'
  }
);

// Test the database connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

sequelize.sync().then(() => {
    console.log('Database synced successfully');
  }).catch(err => {
    console.error('Error syncing database:', err);
  });

testConnection();

module.exports = sequelize;
