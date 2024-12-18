// src/middleware/validation.js
const validatePlantData = (req, res, next) => {
    const { name, scientificName, price, stock, category } = req.body;
    
    // Check required fields
    if (!name || !scientificName || !price || !stock || !category) {
        return res.status(400).json({ 
            message: 'Missing required fields'
        });
    }

    // Validate price
    if (price < 0) {
        return res.status(400).json({
            message: 'Price cannot be negative'
        });
    }

    // Validate stock
    if (stock < 0 || !Number.isInteger(stock)) {
        return res.status(400).json({
            message: 'Stock must be a positive integer'
        });
    }

    next();
};

const validateOrderData = (req, res, next) => {
    const { items, totalAmount, email } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({
            message: 'Order must contain items'
        });
    }

    if (!totalAmount || totalAmount <= 0) {
        return res.status(400).json({
            message: 'Invalid total amount'
        });
    }

    if (!email || !email.includes('@')) {
        return res.status(400).json({
            message: 'Valid email is required'
        });
    }

    next();
};

module.exports = {
    validatePlantData,
    validateOrderData
};