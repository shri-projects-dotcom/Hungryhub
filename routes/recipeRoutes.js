const express = require("express");
const router = express.Router();
const { addRecipe,
        getAllRecipes,
        getrecipeByID,
        deleteRecipe,
        updateRecipe,
        searchRecipes
      } = require("../controllers/recipeController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, addRecipe);
router.get("/",getAllRecipes);
router.get("/view/:id",getrecipeByID);
router.put("/:id",protect,updateRecipe);
router.get("/search",searchRecipes);
router.delete("/:id",protect,deleteRecipe);
module.exports = router;