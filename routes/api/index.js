// Import the Express Router module
const router = require("express").Router();

// Import the routes for thoughts and users
const thoughtRoutes = require("./thoughts");
const userRoutes = require("./users");


// Attach the routes for thoughts and users to their corresponding base paths
router.use("/thoughts", thoughtRoutes);
router.use("/users", userRoutes);

//Export router 
module.exports = router;
