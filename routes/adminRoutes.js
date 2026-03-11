const express = require("express");
const router = express.Router();
const {getUsers,deleteUser,dashboardStats} = require("../controllers/adminController");

const { protect } = require("../middleware/authMiddleware");
const authorize= require("../middleware/roleMiddleware");

router.get("/users",protect,authorize("admin"),getUsers);
router.delete("/user/:id",protect,authorize("admin"),deleteUser);
router.get("/dashboard",protect,authorize("admin"),dashboardStats);

module.exports = router;


