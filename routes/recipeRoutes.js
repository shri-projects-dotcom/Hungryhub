const express = require("express");
const router = express.Router();
const { addRecipe } = require("../controllers/recipeController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, addRecipe);

module.exports = router;