const express = require('express');
const Order = require('../orders/order.model'); // Assuming you have an Order model for plant purchases
const Plant = require('../plants/plant.model'); // Assuming this is the Plant model
const router = express.Router();

// Function to calculate admin stats
router.get("/", async (req, res) => {
    try {
        // 1. Total number of orders
        const totalOrders = await Order.countDocuments();

        // 2. Total sales (sum of all totalPrice from orders)
        const totalSales = await Order.aggregate([
            {
                $group: {
                    _id: null,
                    totalSales: { $sum: "$totalPrice" },
                }
            }
        ]);

        // 3. Total number of plants
        const totalPlants = await Plant.countDocuments();

        // 4. Trending plants statistics:
        const trendingPlantsCount = await Plant.countDocuments({ trending: true });

        // 5. Monthly sales (group by month and sum total sales for each month)
        const monthlySales = await Order.aggregate([
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },  // Group by year and month
                    totalSales: { $sum: "$totalPrice" },  // Sum totalPrice for each month
                    totalOrders: { $sum: 1 }  // Count total orders for each month
                }
            },
            { $sort: { _id: 1 } }  // Sort by date
        ]);

        // 6. Plants low in stock (optional)
        const lowStockPlants = await Plant.find({ stock: { $lt: 5 } }, "name stock").lean();

        // Result summary
        res.status(200).json({
            totalOrders,
            totalSales: totalSales[0]?.totalSales || 0,
            totalPlants,
            trendingPlants: trendingPlantsCount,
            monthlySales,
            lowStockPlants,
        });
    } catch (error) {
        console.error("Error fetching admin stats:", error);
        res.status(500).json({ message: "Failed to fetch admin stats" });
    }
});

module.exports = router;
