'use strict';
const RecipeHandlers = {};
const FoodHandlers = {};
const FoodModel = require('./models/food-model');
const RecipeModel = require('./recipe-model');


FoodHandlers.create = async (request, response) => {
try {
const data = request.body;
const food = new FoodModel(data);
response.status(200)

}
  console.log('creating a Food...');
  response.status(200).json('creating a Food...');
};

FoodHandlers.getAll = async (request, response) => {

  console.log('getting all the Foods...');
  response.status(200).json('getting all the Foods...');
};

FoodHandlers.getOne = async (request, response) => {
  try {
    const FoodFromAPI = await FoodModel.find({})
  }
  console.log('getting a single Food...');
  response.send('getting a single Food...');
};


FoodHandlers.update = async (request, response) => {
  console.log('updating a Food...');
  response.send(Food);
};

FoodHandlers.delete = async (request, response) => {
  console.log('deleting a Food...');
  response.status(200).send('Food deleted');
};




RecipeHandlers.create = async (request, response) => {
  console.log('creating a Recipe...');
  response.status(200).json('creating a Recipe...');
};

RecipeHandlers.getAll = async (request, response) => {
  console.log('getting all the Recipes...');
  response.status(200).json('getting all the Recipes...');
};

RecipeHandlers.getOne = async (request, response) => {
  console.log('getting a single Recipe...');
  response.send('getting a single Recipe...');
};


RecipeHandlers.update = async (request, response) => {
  console.log('updating a Recipe...');
  response.send(Recipe);
};

RecipeHandlers.delete = async (request, response) => {

  console.log('deleting a Recipe...');
  response.status(200).send('Recipe deleted');
};

module.exports = FoodHandlers;
module.exports = RecipeHandlers;
