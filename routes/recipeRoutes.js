const express = require("express");
const router = express.Router();
const { addRecipe,getAllRecipes, getrecipeByID } = require("../controllers/recipeController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, addRecipe);
router.get("/",getAllRecipes);
router.get("/:id",getrecipeByID);
module.exports = router;