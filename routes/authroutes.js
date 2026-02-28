const express=require('express');
const router = express.Router();
const { registerUser, loginUser, userProfile } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");


router.get("/" ,(req,res)=>{
    res.send("auth route working");
});
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, userProfile);
module.exports=router;
