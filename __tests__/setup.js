// backend/__tests__/setup.js
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
require('dotenv').config();

let mongoServer;

beforeAll(async () => {
  console.log('\n🚀 Starting test environment setup...');
  try {
    console.log('📦 Creating MongoDB Memory Server...');
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    
    console.log('🔄 Attempting database connection...');
    await mongoose.connect(mongoUri);
    
    console.log(`\n🌿 Test Database Connection Status: mongoUri: ${mongoUri}`);
    console.log('✅ Successfully connected to test database');
    
    // Log database version and connection details
    const version = await mongoose.connection.db.admin().serverStatus();
    console.log(`📊 MongoDB Version: ${version.version}`);
    console.log(`🔐 Database Name: ${mongoose.connection.db.databaseName}`);
  } catch (error) {
    console.error('\n❌ Error connecting to the test database:');
    console.error('🔍 Error details:', error);
    throw error;
  }
});

afterAll(async () => {
  console.log('\n🔄 Starting test environment cleanup...');
  try {
    console.log('📤 Disconnecting from database...');
    await mongoose.disconnect();
    
    console.log('🛑 Stopping MongoDB Memory Server...');
    await mongoServer.stop();
    
    console.log('\n🔌 Database Cleanup:');
    console.log('✅ Successfully disconnected from test database\n');
  } catch (error) {
    console.error('\n❌ Error during cleanup:');
    console.error('🔍 Error details:', error);
    throw error;
  }
});

// Increased timeout for slower systems/CI environments
jest.setTimeout(60000); // 60 seconds
console.log('⚙️ Test timeout set to 60 seconds');

afterEach(async () => {
  try {
    console.log('\n🧹 Cleaning up test data...');
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      const count = await collections[key].countDocuments();
      await collections[key].deleteMany();
      console.log(`✨ Cleared ${count} documents from ${key} collection`);
    }
    console.log('✅ Test data cleanup completed\n');
  } catch (error) {
    console.error('\n❌ Error during test cleanup:');
    console.error('🔍 Error details:', error);
    throw error;
  }
});