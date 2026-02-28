const express = require("express");
const router = express.Router();
const { addRecipe,
        getAllRecipes,
        getrecipeByID,
        deleteRecipe,
        updateRecipe
      } = require("../controllers/recipeController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, addRecipe);
router.get("/",getAllRecipes);
router.get("/:id",getrecipeByID);
router.put("/:id",protect,updateRecipe);
router.delete("/:id",protect,deleteRecipe);
module.exports = router;