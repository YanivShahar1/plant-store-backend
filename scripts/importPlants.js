const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });  // Correct path to .env file
const Plant = require('../src/plants/plant.model'); // Ensure this is the correct path to your Plant model

// Debugging: Print the DB_URL to see if it's loaded correctly
console.log('DB_URL:', process.env.DB_URL);
// Connect to MongoDB
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    
    // Path to the plants.json file (relative to your project root)
    const filePath = path.join(__dirname, 'plants.json'); // This assumes plants.json is in the same directory as this script
    
    // Read the plants.json file
    fs.readFile(filePath, 'utf8', async (err, data) => {
      if (err) {
        console.error('Error reading the file:', err);
        process.exit(1);
      }

      // Parse the JSON data
      const { plants } = JSON.parse(data); // Destructure the plants array from the JSON object

      // Insert plants into MongoDB
      try {
        // Insert data into the 'plants' collection
        await Plant.insertMany(plants);
        console.log('Data has been successfully inserted into the database');
        mongoose.disconnect();
      } catch (error) {
        console.error('Error inserting data into MongoDB:', error);
        mongoose.disconnect();
      }
    });
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  });