const Recipe = require("../models/Recipe");

// ADD RECIPE
exports.addRecipe = async (req, res) => {
  const { title, ingredients, description, instructions, cookTime, servings, image } = req.body;

  try {
    // Basic validation
    if (!title || !ingredients || !instructions || !cookTime) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    const recipe = await Recipe.create({
      title,
      description,
      ingredients,
      instructions,
      cookTime,
      servings,
      image,
      createdBy: req.user._id, // comes from auth middleware
    });

    res.status(201).json(recipe);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};