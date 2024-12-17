const express = require("express");
const app = express();
const cors = require("cors");

const mongoose = require("mongoose");
const port = process.env.PORT || 5000;
require('dotenv').config();

// middleware
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173', 'https://plant-store-frontend.vercel.app'],
    credentials: true
}));

// routes
const plantRoutes = require('./src/plants/plant.route');
const orderRoutes = require("./src/orders/order.route");
const userRoutes = require("./src/users/user.route");
const adminRoutes = require("./src/stats/admin.stats");

app.use("/api/plants", plantRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/admin", adminRoutes);

async function main() {
  try {
    const connection = await mongoose.connect(process.env.DB_URL);

    // Log database names
    const admin = connection.connection.db.admin();
    const listDatabases = await admin.listDatabases();
    
    console.log("Databases:");
    listDatabases.databases.forEach(db => {
      console.log(`- ${db.name}`);
    });

    // Log collections in the connected database
    const db = connection.connection.db;
    const dbName = db.databaseName;
    const collections = await db.listCollections().toArray();
    
    console.log(`Connected to database: ${dbName}`);
    console.log("Collections in the connected database:");
    collections.forEach(collection => {
      console.log(`- ${collection.name}`);
    });

    app.use("/", (req, res) => {
      res.send("Plant Store Server is running!");
    });
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}

main();

app.listen(port, () => {
  console.log(`Plant Store app listening on port ${port}`);
});
