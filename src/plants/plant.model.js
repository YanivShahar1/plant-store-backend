/**
 * Plant Schema for MongoDB using Mongoose
 * This schema defines the data structure for plants in an e-commerce or plant management system.
 * It includes comprehensive validation, indexing, and virtual properties for plant-related data.
 */

const mongoose = require('mongoose');

// Define the main schema structure
const PlantSchema = new mongoose.Schema({
  // Basic plant information
  name: {
    type: String,
    required: [true, 'Plant name is required'],
    trim: true,  // Removes whitespace from both ends
    minlength: [2, 'Plant name must be at least 2 characters long'],
    maxlength: [100, 'Plant name cannot exceed 100 characters']
  },
  
  // Scientific classification
  scientificName: {
    type: String,
    required: [true, 'Scientific name is required'],
    trim: true,
    minlength: [2, 'Scientific name must be at least 2 characters long'],
    maxlength: [100, 'Scientific name cannot exceed 100 characters']
  },

  // Detailed plant description
  description: {
    type: String,
    required: [true, 'Description is required'],
    minlength: [10, 'Description must be at least 10 characters long'],
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },

  // Pricing information with validation
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative'],
    validate: {
      validator: Number.isFinite,
      message: '{VALUE} is not a valid price'
    }
  },

  // Previous price for sale calculations
  oldPrice: {
    type: Number,
    required: false,
    min: [0, 'Old price cannot be negative'],
    validate: {
      // Custom validator to ensure old price is greater than current price
      validator: function(v) {
        return !v || v > this.price;
      },
      message: 'Old price must be greater than current price'
    }
  },

  // Inventory management
  stock: {
    type: Number,
    required: [true, 'Stock quantity is required'],
    min: [0, 'Stock cannot be negative'],
    validate: {
      validator: Number.isInteger,
      message: '{VALUE} is not a valid stock quantity'
    }
  },

  // Plant categorization
  category: {
    type: String,
    enum: {
      values: [
        'Indoor Plants',
        'Outdoor Plants',
        'Succulents & Cacti',
        'Flowering Plants',
        'Trees & Shrubs',
        'Herbs & Vegetables'
      ],
      message: '{VALUE} is not a valid category'
    },
    required: [true, 'Category is required']
  },

  // Detailed care instructions object
  careInstructions: {
    light: {
      type: String,
      enum: {
        values: [
          'Low Light (Shade)',
          'Medium Light (Indirect Sun)',
          'Bright Light (Direct Sun)'
        ],
        message: '{VALUE} is not a valid light requirement'
      },
      required: [true, 'Light requirement is required']
    },
    water: {
      type: String,
      enum: {
        values: [
          'Low (Keep Soil Dry)',
          'Moderate (Water Weekly)',
          'Frequent (2-3 Times Weekly)'
        ],
        message: '{VALUE} is not a valid watering requirement'
      },
      required: [true, 'Watering requirement is required']
    },
    temperature: {
      type: String,
      enum: {
        values: [
          'Cool (15-18°C / 60-65°F)',
          'Average (18-24°C / 65-75°F)',
          'Warm (24-29°C / 75-85°F)'
        ],
        message: '{VALUE} is not a valid temperature requirement'
      },
      required: [true, 'Temperature requirement is required']
    },
    humidity: {
      type: String,
      enum: {
        values: [
          'Low (30-40%)',
          'Medium (40-60%)',
          'High (60%+)'
        ],
        message: '{VALUE} is not a valid humidity requirement'
      },
      required: [true, 'Humidity requirement is required']
    }
  },

  // Growing conditions and characteristics
  sunExposure: {
    type: String,
    enum: {
      values: [
        'Full Sun (6+ hours direct)',
        'Partial Sun (3-6 hours direct)',
        'Shade (minimal direct sun)'
      ],
      message: '{VALUE} is not a valid sun exposure'
    },
    required: [true, 'Sun exposure is required']
  },

  // Physical characteristics
  plantSize: {
    type: String,
    enum: {
      values: [
        'Small (Up to 30cm/12")',
        'Medium (30-100cm/1-3ft)',
        'Large (100cm+/3ft+)'
      ],
      message: '{VALUE} is not a valid plant size'
    },
    required: [true, 'Plant size is required']
  },

  // Care difficulty and growth characteristics
  maintenanceLevel: {
    type: String,
    enum: {
      values: ['Easy', 'Moderate', 'Expert'],
      message: '{VALUE} is not a valid maintenance level'
    },
    required: [true, 'Maintenance level is required']
  },

  growthRate: {
    type: String,
    enum: {
      values: ['Slow', 'Medium', 'Fast'],
      message: '{VALUE} is not a valid growth rate'
    },
    required: [true, 'Growth rate is required']
  },

  // Special plant features array with validation
  features: {
    type: [{
      type: String,
      enum: {
        values: [
          'Air Purifying',
          'Pet Friendly',
          'Low Maintenance',
          'Drought Resistant',
          'Aromatic',
          'Edible',
          'Bee Friendly'
        ],
        message: '{VALUE} is not a valid feature'
      }
    }],
    validate: {
      validator: function(v) {
        return v.length <= 10;
      },
      message: 'Cannot have more than 10 features'
    }
  },

  // Seasonal information
  bloomingSeason: {
    type: String,
    enum: {
      values: ['Spring', 'Summer', 'Fall', 'Winter', 'Year-round', 'Non-flowering'],
      message: '{VALUE} is not a valid blooming season'
    }
  },

  // Image management
  coverImage: {
    type: String,
    required: true,
  },

  // Searchable tags with limit
  tags: {
    type: [String],
    validate: {
      validator: function(v) {
        return v.length <= 20;
      },
      message: 'Cannot have more than 20 tags'
    }
  },

  // Timestamps for record keeping
  dateAdded: {
    type: Date,
    default: Date.now,
    immutable: true  // Cannot be changed once set
  },
  
  lastUpdated: {
    type: Date,
    default: Date.now
  },

  // Safety and status flags
  poisonous: {
    type: Boolean,
    required: [true, 'Toxicity information is required']
  },

  trending: {
    type: Boolean,
    default: false
  },

  status: {
    type: String,
    enum: {
      values: ['In Stock', 'Low Stock', 'Out of Stock', 'Coming Soon', 'Discontinued'],
      message: '{VALUE} is not a valid status'
    },
    default: 'In Stock'
  }
}, {
  // Schema options
  timestamps: true,  // Automatically manage createdAt and updatedAt
  toJSON: { virtuals: true },  // Include virtual properties when converting to JSON
  toObject: { virtuals: true }
});

// Database indexes for improved query performance
PlantSchema.index({ name: 1 });
PlantSchema.index({ category: 1 });
PlantSchema.index({ trending: 1 });
PlantSchema.index({ status: 1 });
PlantSchema.index({ tags: 1 });
PlantSchema.index({ price: 1 });

// Middleware to automatically update lastUpdated timestamp before saving
PlantSchema.pre('save', function(next) {
  this.lastUpdated = new Date();
  next();
});

// Virtual properties (calculated fields that aren't stored in MongoDB)
PlantSchema.virtual('onSale').get(function() {
  return !!this.oldPrice && this.oldPrice > this.price;
});

PlantSchema.virtual('discountPercentage').get(function() {
  if (!this.oldPrice || this.oldPrice <= this.price) return 0;
  return Math.round(((this.oldPrice - this.price) / this.oldPrice) * 100);
});

// Instance method for updating stock levels
PlantSchema.methods.updateStock = function(quantity) {
  this.stock = Math.max(0, this.stock + quantity);
  return this.save();
};

// Static method for finding plants by maintenance level
PlantSchema.statics.findByMaintenanceLevel = function(level) {
  return this.find({ maintenanceLevel: level });
};

// Create and export the model
const Plant = mongoose.model('Plant', PlantSchema);
module.exports = Plant;