const mongoose = require('mongoose');
const Plant = require('../../src/plants/plant.model');

describe('Plant Model Tests', () => {
  const createTestPlant = (overrides = {}) => ({
    name: 'Test Plant',
    scientificName: 'Testus plantus',
    description: 'A plant created for testing',
    price: 19.99,
    stock: 10,
    category: 'Indoor Plants',
    careInstructions: {
      light: 'Medium Light (Indirect Sun)',
      water: 'Moderate (Water Weekly)',
      temperature: 'Average (18-24°C / 65-75°F)',
      humidity: 'Medium (40-60%)'
    },
    coverImage: 'test-plant.jpg',
    sunExposure: 'Partial Sun (3-6 hours direct)',
    plantSize: 'Small (Up to 30cm/12")',
    poisonous: false,
    maintenanceLevel: 'Easy',
    growthRate: 'Medium',
    bloomingSeason: 'Summer',
    ...overrides
  });

  describe('Read Operations', () => {
    beforeEach(async () => {
      console.log('\n📝 Setting up Read Operations test data...');
      await Plant.create(createTestPlant());
      console.log('✅ Test data created successfully');
    });

    afterEach(() => {
      console.log('🧹 Cleaned up Read Operations test data');
    });

    test('should fetch plants with pagination', async () => {
      console.log('\n🔍 Testing: Fetch plants with pagination');
      const plants = await Plant.find({}).limit(10).skip(0);
      expect(plants).toHaveLength(1);
      expect(plants[0].name).toBe('Test Plant');
      console.log('✅ Pagination test completed successfully');
    });

    test('should have all required fields', async () => {
      console.log('\n🔍 Testing: Required fields validation');
      const plant = await Plant.findOne({ name: 'Test Plant' });
      const requiredFields = ['name', 'scientificName', 'price', 'stock', 'category'];
      
      requiredFields.forEach(field => {
        expect(plant[field]).toBeDefined();
      });
      console.log('✅ Required fields validation completed successfully');
    });

    test('should properly format price as number', async () => {
      console.log('\n🔍 Testing: Price format validation');
      const plant = await Plant.findOne({ name: 'Test Plant' });
      expect(typeof plant.price).toBe('number');
      expect(plant.price).toBeGreaterThan(0);
      console.log('✅ Price format validation completed successfully');
    });
  });

  describe('Create Operations', () => {
    afterEach(() => {
      console.log('🧹 Cleaned up Create Operations test data');
    });

    test('should create a new plant with valid data', async () => {
      console.log('\n🔍 Testing: Create plant with valid data');
      const plantData = createTestPlant({ name: 'New Test Plant', price: 24.99 });
      const newPlant = await Plant.create(plantData);

      expect(newPlant.name).toBe('New Test Plant');
      expect(newPlant.price).toBe(24.99);
      expect(newPlant).toHaveProperty('_id');
      console.log('✅ Plant creation test completed successfully');
    });

    test('should fail to create plant with invalid price', async () => {
      console.log('\n🔍 Testing: Create plant with invalid price');
      const invalidData = createTestPlant({ price: -10 });
      await expect(Plant.create(invalidData)).rejects.toThrow();
      console.log('✅ Invalid price validation test completed successfully');
    });

    test('should fail to create plant with missing required fields', async () => {
      console.log('\n🔍 Testing: Create plant with missing fields');
      const invalidData = { name: 'Invalid Plant' };
      await expect(Plant.create(invalidData)).rejects.toThrow();
      console.log('✅ Missing fields validation test completed successfully');
    });
  });

  describe('Update Operations', () => {
    let existingPlant;

    beforeEach(async () => {
      console.log('\n📝 Setting up Update Operations test data...');
      existingPlant = await Plant.create(createTestPlant({ name: 'Update Test Plant' }));
      console.log('✅ Test data created successfully');
    });

    afterEach(() => {
      console.log('🧹 Cleaned up Update Operations test data');
    });

    test('should update multiple fields of an existing plant', async () => {
      console.log('\n🔍 Testing: Update multiple plant fields');
      const updates = {
        price: 29.99,
        stock: 15,
        description: 'Updated description'
      };

      const updatedPlant = await Plant.findByIdAndUpdate(
        existingPlant._id,
        updates,
        { new: true }
      );

      expect(updatedPlant.price).toBe(29.99);
      expect(updatedPlant.stock).toBe(15);
      expect(updatedPlant.description).toBe('Updated description');
      console.log('✅ Multiple fields update test completed successfully');
    });

    test('should fail to update with invalid data', async () => {
      console.log('\n🔍 Testing: Update plant with invalid data');
      await expect(Plant.findByIdAndUpdate(
        existingPlant._id,
        { price: -5 },
        { new: true, runValidators: true }
      )).rejects.toThrow();
      console.log('✅ Invalid update validation test completed successfully');
    });
  });

  describe('Delete Operations', () => {
    let plantToDelete;

    beforeEach(async () => {
      console.log('\n📝 Setting up Delete Operations test data...');
      plantToDelete = await Plant.create(createTestPlant({ name: 'Delete Test Plant' }));
      console.log('✅ Test data created successfully');
    });

    afterEach(() => {
      console.log('🧹 Cleaned up Delete Operations test data');
    });

    test('should delete a plant and confirm deletion', async () => {
      console.log('\n🔍 Testing: Delete existing plant');
      await Plant.findByIdAndDelete(plantToDelete._id);
      
      const deletedPlant = await Plant.findById(plantToDelete._id);
      expect(deletedPlant).toBeNull();
      console.log('✅ Plant deletion test completed successfully');
    });

    test('should handle deletion of non-existent plant', async () => {
      console.log('\n🔍 Testing: Delete non-existent plant');
      const nonExistentId = new mongoose.Types.ObjectId();
      const result = await Plant.findByIdAndDelete(nonExistentId);
      expect(result).toBeNull();
      console.log('✅ Non-existent plant deletion test completed successfully');
    });
  });
});