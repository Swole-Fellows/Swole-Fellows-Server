'use strict';
const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  name: String,
  carbs: Number,
  protein: Number,
  fats: Number,
  calories: Number,
  servingSize: Number,
  image: String
});
const FoodModel = mongoose.model('food', foodSchema);

module.exports = FoodModel;
