/*
I asked chatGPT to build for me a simple booking system with features for creating both standard and anonymous bookings. 
Users can specify details like time, patient, provider, and booking status. 
The application records booking status changes over time, providing a comprehensive status history. 
Additionally, it associates bookings with unused credits and allows users to retrieve their booking history or the timeline of status changes for a specific booking. 
The database is managed through Sequelize, offering a relational mapping to a MySQL database.
Please also allow to show the provider some statistic about bookings getting canceled by the client and being rescheduled, and the patient statistic about how many credits he used per month.
*/

import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { Sequelize, DataTypes } from 'sequelize';

const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Create a single persistent MySQL database connection pool
const sequelize = new Sequelize('your_db_name', 'your_db_user', 'your_db_password', {
  host: 'localhost',
  dialect: 'mysql', // Use the appropriate database dialect
  logging: false, // Disable logging SQL queries (you can enable it for debugging)
});

// Define the Credit model
const Credit = sequelize.define('Credit', {
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  expirationDate: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      isDate: true,
      isAfter: new Date().toISOString(),
    },
  },
});

// Define the Booking model
const Booking = sequelize.define('Booking', {
  time: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      isDate: true,
      isAfter: new Date().toISOString(),
    },
  },
  patient: {
    type: DataTypes.STRING,
    allowNull: true, // Allow anonymous bookings
  },
  provider: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'pending', // Default status
  },
});