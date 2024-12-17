// __tests__/models/plant.model.test.js
const Plant = require('../../src/plants/plant.model');

describe('Plant Model Read Tests', () => {
  let totalPlantsCount;

  beforeAll(async () => {
    totalPlantsCount = await Plant.countDocuments();
    console.log('\n📊 Database Stats:');
    console.log(`Total plants in database: ${totalPlantsCount}`);
  });

  test('should be able to fetch plants', async () => {
    const plants = await Plant.find({}).limit(1);
    
    console.log('\n🔍 Fetch Test Results:');
    console.log(`Plants fetched: ${plants.length} of ${totalPlantsCount}`);
    
    if (plants.length > 0) {
      const plant = plants[0];
      console.log('\n🌱 Sample Plant Details:');
      console.log('---------------------------');
      console.log(`ID: ${plant._id}`);
      console.log(`Name: ${plant.name}`);
      console.log(`Scientific Name: ${plant.scientificName}`);
      console.log(`Price: $${plant.price}`);
      console.log(`Category: ${plant.category}`);
      console.log(`Stock: ${plant.stock}`);
      console.log('---------------------------');
    } else {
      console.log('⚠️ No plants found in database');
    }

    expect(Array.isArray(plants)).toBe(true);
  });

  test('should have all required fields', async () => {
    const plant = await Plant.findOne({});
    
    if (plant) {
      console.log('\n✅ Field Validation Test:');
      console.log(`Checking plant: "${plant.name}"`);
      
      expect(plant.name).toBeDefined();
      expect(plant.scientificName).toBeDefined();
      expect(plant.price).toBeDefined();
      
      console.log('✓ All required fields are present');
    } else {
      console.log('⚠️ No plant found for field validation');
    }
  });
});