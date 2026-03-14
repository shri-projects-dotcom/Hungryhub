const Recipe = require("../models/Recipe");
const imagekit = require("../config/imageKit");
// ADD RECIPE
exports.addRecipe = async (req, res) => {
  const { title, ingredients, description, instructions, cookingTime, servings } = req.body;
  

  try {
    // Basic validation
    if (!title || !ingredients || !instructions || !cookingTime) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }
    let imageUrl = "";

    if (req.file) {
      const uploadedImage = await imagekit.upload({
        file: req.file.buffer,
        fileName: Date.now() + "-" + req.file.originalname,
      });

      imageUrl = uploadedImage.url;
    }


    const recipe = await Recipe.create({
      title,
      description,
      ingredients,
      instructions,
      cookingTime,
      servings,
      image:imageUrl,
      createdBy: req.user._id, // comes from auth middleware
    });

    res.status(201).json(recipe);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
exports.getAllRecipes =async (req,res) =>{
  try{
    const recipes= await Recipe.find().populate("createdBy", "name email").sort({createdAt:-1});
    res.json(recipes);
  }catch (error){
  //  console.log(error);
    res.status(500).json({message:"server error" });
  }
};
exports.getrecipeByID= async(req,res)=>{
  try{
    const recipe=await Recipe.findById(req.params.id).populate("createdBy","name email");
    if(!recipe){
      return res.status(404).json({message:"Recipe not found"});
    }
    res.json(recipe);

  }
  catch(error){
    // console.log(error);
    res.status(500).json({message:"server error"});

  }
};
exports.deleteRecipe= async(req,res)=>{
  try{
    const recipe=await Recipe.findById(req.params.id);
    if(!recipe){
      return res.status(404).json({message:"Recipe not found"});
    }
    if(recipe.createdBy.toString() !== req.user._id.toString() && req.user.role !== "admin"){
      return res.status(401).json({message:"Not authorized to delete this recipe"});
    }
    await recipe.deleteOne();
    res.json({message:"recipe deleted successfully"});

  }
  catch(error){
    // console.log(error);
    res.status(500).json({message:"server error"});

  }
};
exports.updateRecipe = async(req,res)=>{
  try{
    const recipe= await Recipe.findById(req.params.id);
    if(!recipe){
      return res.status(404).json({message:"recipe not found"});

    }
    //check ownership
    if(recipe.createdBy.toString()!== req.user._id.toString()){
      return res.status(401).json({message:"not authorised to update this recipe"})
    }
    //update recipe
    recipe.title=req.body.title||recipe.title;
    recipe.ingredients=req.body.ingredients||recipe.ingredients;
    recipe.instructions=req.body.instructions||recipe.instructions;
    recipe.cookingTime=req.body.cookingTime||recipe.cookingTime;
    recipe.servings=req.body.servings||recipe.servings;
    recipe.image=req.body.image||recipe.image;

    const updatedRecipe= await recipe.save();
    res.json(updatedRecipe);
  }
  catch(error){
    res.status(500).json({message:"server error"})

  }
};
exports.searchRecipes = async (req,res)=>{
  try{
    const { ingredients } = req.query;
    if(!ingredients){
      return res.status(400).json({message:"please provide ingredients"});
    }
    //convert comma string into array
    const ingredientsArray= ingredients.split(",").map(item => item.trim().toLowerCase());
    const recipe = await Recipe.find({
        "ingredients.name":{ $in:ingredientsArray.map(item=>new RegExp(item,'i')) }
    }).populate("createdBy","name email");
    if(recipe.length==0){
        return res.status(404).json({message:"Does not have any recipes with these ingredients"});
    }
    res.json(recipe);

  }
  catch(error){
    console.log(error);
    res.status(500).json({message:"server error"});
  }
};
exports.toggleLikeRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    const userId = req.user._id;

    const alreadyLiked = recipe.likes.includes(userId);

    if (alreadyLiked) {
      // Unlike
      recipe.likes = recipe.likes.filter(
        (id) => id.toString() !== userId.toString()
      );
    } else {
      // Like
      recipe.likes.push(userId);
    }

    await recipe.save();

    res.json({
      message: alreadyLiked ? "Recipe unliked" : "Recipe liked",
      totalLikes: recipe.likes.length,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getTopRecipes = async (req, res) => {
  try {
    const topRecipes = await Recipe.aggregate([
      {
        $addFields: {
          likesCount: { $size:{$ifNull:[ "$likes",[]]}}
        }
      },
      {
        $sort: { likesCount: -1 }
      },
      {
        $limit: 5
      }
    ]);

    res.json(topRecipes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};