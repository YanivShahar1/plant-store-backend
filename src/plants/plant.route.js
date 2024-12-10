const express = require('express');
const Plant = require('./plant.model');
const { postAPlant, getAllPlants, getSinglePlant, updatePlant, deleteAPlant } = require('./plant.controller');
const verifyAdminToken = require('../middleware/verifyAdminToken');
const router = express.Router();


// Post a plant
router.post("/create-plant", verifyAdminToken, postAPlant);

// Get all plants
router.get("/", getAllPlants);

// Get a single plant
router.get("/:id", getSinglePlant);

// Update a plant
router.put("/edit/:id", verifyAdminToken, updatePlant);

// Delete a plant
router.delete("/:id", verifyAdminToken, deleteAPlant);

module.exports = router;
