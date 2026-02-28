const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
    },

    ingredients: [
      {
        name: { type: String, required: true },
        quantity: { type: String },
      },
    ],

    instructions: [
      {
        type: String,
        required: true,
      },
    ],

    cookingTime: {
      type: Number, // in minutes
    },

    servings: {
      type: Number,
    },

    image: {
      type: String, // image URL
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Recipe", recipeSchema);