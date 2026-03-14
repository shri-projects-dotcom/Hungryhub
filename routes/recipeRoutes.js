const express = require("express");
const router = express.Router();
const { addRecipe,
        getAllRecipes,
        getrecipeByID,
        deleteRecipe,
        updateRecipe,
        searchRecipes,
        toggleLikeRecipe,
        getTopRecipes
      } = require("../controllers/recipeController");
      
const { protect } = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");
const upload = require("../middleware/upload");

router.post("/",protect,upload.single("image"),addRecipe);
router.get("/",getAllRecipes);
router.get("/view/:id",getrecipeByID);
router.put("/:id",protect,updateRecipe);
router.get("/search",searchRecipes);
router.delete("/:id",protect,authorize("admin","user"),deleteRecipe);
router.put("/:id/likes",protect,toggleLikeRecipe)
router.get("/top",getTopRecipes)

module.exports = router;