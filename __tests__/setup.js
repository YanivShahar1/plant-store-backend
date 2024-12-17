// backend/__tests__/setup.js
const mongoose = require('mongoose');
require('dotenv').config();

beforeAll(async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log('\n🌿 Test Database Connection Status:');
    console.log('✓ Successfully connected to test database');
  } catch (error) {
    console.error('❌ Error connecting to the test database:', error);
  }
});

afterAll(async () => {
  try {
    await mongoose.disconnect();
    console.log('\n🔌 Database Cleanup:');
    console.log('✓ Successfully disconnected from test database\n');
  } catch (error) {
    console.error('❌ Error disconnecting from the test database:', error);
  }
});