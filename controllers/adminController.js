const User = require("../models/User");
const Recipes = require("../models/Recipe");

const getUsers = async (req,res) =>{
    try{
        const users = await User.find().select("-password");
        res.json(users)
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
};

const deleteUser = async (req,res) =>{
    try{
        const user = await User.findById(req.params.id);
        if(!user){
            res.status(404).json({message:"user not found"});
        }
        await user.deleteOne();
        res.json({message:"user deleted successfully"});
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
};

const dashboardStats = async(req,res) =>{
    try{
        const totalUsers = await User.countDocuments();
        const totalRecipes = await Recipes.countDocuments();
        const today = new Date();
        today.setHours(0,0,0,0);
        const recipesToday = await Recipes.countDocuments({createdAt:{$gte:today},});
        res.json({totalUsers,totalRecipes,recipesToday},)
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
};

module.exports = {
    getUsers,deleteUser,dashboardStats
};