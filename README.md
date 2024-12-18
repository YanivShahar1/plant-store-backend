# 🌿 Plant Store Backend API

A RESTful API built with Node.js, Express, and MongoDB to support the Plant Store demo e-commerce platform.

> **Note**: This is a demonstration/portfolio project. The checkout process is simulated and no real transactions are processed.

## 🔗 Quick Links
- 📹 [Video Demo](https://youtu.be/__J_0LBf-cc)
- 🌐 [Frontend Demo](https://plant-store-frontend.vercel.app/)
- 💻 [Frontend Repository](https://github.com/YanivShahar1/plant-store-frontend)

## 🚀 Key Features

### 🪴 Plant Management API
- Complete CRUD operations for plant inventory
- Comprehensive plant data modeling including:
  - Basic info (name, scientific name, description)
  - Pricing and stock management
  - Detailed care instructions
  - Plant characteristics and conditions
  - Image URL management
  - Categories and tags

### 📊 Admin Dashboard API
- Sales analytics endpoints
- Inventory tracking
- Mock order processing
- User management

### 🔐 Authentication & Security
- JWT-based authentication
- Protected admin routes
- Role-based access control
- Token verification middleware

## 🛠️ Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT
- **Security**: bcrypt
- **Development**: 
  - Nodemon
  - ESLint
  - Morgan (logging)

## ⚙️ Installation

1. **Clone the repository**
```bash
git clone https://github.com/YanivShahar1/plant-store-backend.git
cd plant-store-backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Setup**
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_jwt_secret_key
```

4. **Start Development Server**
```bash
npm run dev
```

## 📚 API Endpoints

### Plants API
```javascript
GET     /api/plants            // Get all plants
GET     /api/plants/:id        // Get single plant
POST    /api/plants           // Create plant (Admin)
PUT     /api/plants/:id       // Update plant (Admin)
DELETE  /api/plants/:id       // Delete plant (Admin)
```

### Orders API
```javascript
POST    /api/orders            // Create order
GET     /api/orders/email/:email // Get user orders
```

### Admin API
```javascript
POST    /api/auth/admin        // Admin login
GET     /api/admin/stats      // Dashboard statistics
```

## 🔐 Authentication

Protected routes require JWT token in headers:
```javascript
{
  "Authorization": "Bearer your_jwt_token"
}
```

## 📝 Data Models

### Plant Schema
```typescript
{
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100
  },
  scientificName: String,
  description: String,
  price: {
    type: Number,
    required: true,
    min: 0
  },
  stock: Number,
  category: {
    type: String,
    enum: ['Indoor Plants', 'Outdoor Plants', 'Succulents', ...]
  },
  careInstructions: {
    light: String,
    water: String,
    temperature: String,
    humidity: String
  },
  images: {
    type: String
  },
  tags: [String]
}
```

### Order Schema
```typescript
{
  name: String,
  email: String,
  address: {
    city: String,
    country: String,
    state: String,
    zipcode: String
  },
  phone: Number,
  productIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Plant'
  }],
  totalPrice: Number
}
```

## 🧪 Error Handling

The API implements centralized error handling:
- Validation errors
- Authentication errors
- Database errors
- Not found errors

Example error response:
```json
{
  "status": "error",
  "message": "Resource not found",
  "code": 404
}
```

## 👨‍💻 Development

### Running Tests
```bash
npm test
```

### Code Linting
```bash
npm run lint
```

## 🔧 Environment Variables

Required variables:
```env
PORT=5000                  # Server port
DB_URI=                   # MongoDB production connection URL
DB_TEST_URI=              # MongoDB testing database URL for running tests
JWT_SECRET_KEY=           # JWT secret key
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📫 Contact

Yaniv Shahar - [GitHub](https://github.com/YanivShahar1)

Project Link: [https://github.com/YanivShahar1/plant-store-backend](https://github.com/YanivShahar1)

---

Made with ❤️ by [Yaniv Shahar](https://github.com/yanivshahar1)