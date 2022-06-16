'use strict';
const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  _id: String,
  email: String,
  carbs: Number,
  image: String,
  dietLabel: String,
  mealType: String,
  cuisineType: String,
  totalNutrients: {}
});
const RecipeModel = mongoose.model('recipe', recipeSchema);

module.exports = RecipeModel;
