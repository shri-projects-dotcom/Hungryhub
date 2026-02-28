const express = require("express");
const router = express.Router();
const { addRecipe,getAllRecipes } = require("../controllers/recipeController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, addRecipe);
router.get("/",getAllRecipes);

module.exports = router;