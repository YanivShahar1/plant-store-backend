// order.route.js
const express = require('express');
const orderController = require('./order.controller');
const { validateOrderData } = require('../middleware/validation');
const verifyToken = require('../middleware/verifyAdminToken');
const asyncHandler = require('../middleware/asyncHandler');
const router = express.Router();

router.route('/')
  .post(
    verifyToken,
    validateOrderData,
    asyncHandler(orderController.createAOrder)
  );

router.route('/email/:email')
  .get(
    verifyToken,
    asyncHandler(orderController.getOrderByEmail)
  );

module.exports = router;