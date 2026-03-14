const express = require("express");
const router = express.Router();
const {suggestRecipe} = require("../controllers/aiController");

router.post("/suggest",suggestRecipe);

module.exports = router;