'use strict';
const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  _id: String,
  name: String,
  carbs: Number,
  sugars: Number,
  protein: Number,
  fats: Number,
  calories: Number,
  servingSize: String,
  mass: Number
});
const FoodModel = mongoose.model('food', foodSchema);

module.exports = FoodModel;

