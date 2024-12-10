const express = require('express');
// Import the User model for database operations
const User = require('./user.model');
// Import JWT for creating authentication tokens
const jwt = require('jsonwebtoken');

// Create an Express router instance
const router = express.Router();

// Get JWT secret key from environment variables for security
const JWT_SECRET = process.env.JWT_SECRET_KEY

/**
 * Admin Login Route
 * POST /admin
 * Authenticates an admin user and returns a JWT token
 */
router.post("/admin", async (req, res) => {
    // Extract username and password from request body
    const {username, password} = req.body;
    
    try {
        // Search for admin in database by username
        const admin = await User.findOne({username});
        
        // If no admin is found with that username
        if(!admin) {
            res.status(404).send({message: "Admin not found!"})
            return; // Add return to prevent further execution
        }
        
        // Check if password matches
        // Note: In production, passwords should be hashed, not stored as plain text
        if(admin.password !== password) {
            res.status(401).send({message: "Invalid password!"})
            return; // Add return to prevent further execution
        }
        
        // Create JWT token containing admin information
        // This token will be used for authenticating future requests
        const token = jwt.sign(
            {
                id: admin._id,        // Include admin's database ID
                username: admin.username, // Include username
                role: admin.role         // Include role for authorization
            }, 
            JWT_SECRET,              // Sign with secret key
            {expiresIn: "1h"}       // Token expires in 1 hour
        )

        // Send successful response with token and user info
        return res.status(200).json({
            message: "Authentication successful",
            token: token,          // Client will store this token
            user: {               // Send back user info (excluding sensitive data)
                username: admin.username,
                role: admin.role
            }
        })
        
    } catch (error) {
        // Log error for debugging
        console.error("Failed to login as admin", error)
        // Send error response to client
        res.status(401).send({message: "Failed to login as admin"}) 
    }
})

// Export the router for use in main application
module.exports = router;