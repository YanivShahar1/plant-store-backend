// plant.route.js
const express = require('express');
const plantController = require('./plant.controller');
const { validatePlantData } = require('../middleware/validation');
const verifyAdminToken = require('../middleware/verifyAdminToken');
const asyncHandler = require('../middleware/asyncHandler');
const router = express.Router();

router.route('/')
  .get(asyncHandler(plantController.getAllPlants))
  .post(
    verifyAdminToken, 
    validatePlantData,
    asyncHandler(plantController.postAPlant)
  );

router.route('/:id')
  .get(asyncHandler(plantController.getSinglePlant))
  .put(
    verifyAdminToken,
    validatePlantData, 
    asyncHandler(plantController.updatePlant)
  )
  .delete(
    verifyAdminToken,
    asyncHandler(plantController.deleteAPlant)
  );

module.exports = router;