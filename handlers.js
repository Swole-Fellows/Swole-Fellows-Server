'use strict';
const RecipeHandlers = {};
const FoodHandlers = {};
const FoodModel = require('./models/food-model');
const RecipeModel = require('./models/recipe-model');


FoodHandlers.create = async (request, response, next) => {
  try{
    const data = request.body;
    const food = new FoodModel(data);
    await food.save();
    response.status(200).json(data);
  } catch(error) {next(error.messeage);}
  console.log('creating a Food...');
  response.status(200).json('creating a Food...');
};

FoodHandlers.getAll = async (request, response) => {
  const food = await FoodModel.find({});
  response.status(200).send(food);
  console.log('getting all the Foods...');
  response.status(200).json('getting all the Foods...');
};

FoodHandlers.getOne = async (request, response) => {
  const id = request.params.id;
  const food = await FoodModel.find({_id: id});
  response.status(200).send(food);
  console.log('getting a single Food...');
  response.send('getting a single Food...');
};


FoodHandlers.update = async (request, response) => {
  const { id } = req.params;
  try {
    const fodd = await FoodModel.findOne({ _id: id});
    if (!foodModel) res.status(400).send('unable to update food');
    else {
      const updatedFood = await FoodModel.findByIdAndUpdate(id, {...req.body }, { new: true, overwrite: true });
      res.status(200).send(updatedFood);
    }
  } catch (e) {
    res.status(500).send('server error');
  }

  console.log('updating a Food...');
  response.send(Food);
};

FoodHandlers.delete = async (request, response) => {
  const id = request.params.id;
  await FoodModel.deleteOne({_id: id});
  console.log('deleting a Food...');
  response.status(200).send('Food deleted');
};




RecipeHandlers.create = async (request, response) => {
  try{
    const data = request.body;
    const food = new FoodModel(data);
    await food.save();
    response.status(200).json(data);
  } catch(error) {next(error.messeage);}
  console.log('creating a Recipe...');
  response.status(200).json('creating a Recipe...');

};

RecipeHandlers.getAll = async (request, response) => {
  const recipe = await RecipeModel.find({});
  response.status(200).send(recipe);
  console.log('getting all the Recipes...');
  response.status(200).json('getting all the Recipes...');

};

RecipeHandlers.getOne = async (request, response) => {
  const id = request.params.id;
  const recipe = await RecipeModel.find({_id: id});
  response.status(200).send(recipe);
  console.log('getting a single Recipe...');
  response.send('getting a single Recipe...');
};


RecipeHandlers.update = async (request, response) => {
  const { id } = req.params;
  try {
    const fodd = await RecipeModel.findOne({ _id: id});
    if (!RecipeModel) res.status(400).send('unable to update recipe');
    else {
      const updatedRecipe = await RecipeModel.findByIdAndUpdate(id, {...req.body }, { new: true, overwrite: true });
      res.status(200).send(updatedRecipe);
    }
  } catch (e) {
    res.status(500).send('server error');
  }

  console.log('updating a Recipe...');
  response.send(Food);
};

RecipeHandlers.delete = async (request, response) => {
  const id = request.params.id;
  await RecipeModel.deleteOne({_id: id});
  console.log('deleting a Recipe...');
  response.status(200).send('Recipe deleted');
};

module.exports = FoodHandlers;
module.exports = RecipeHandlers;
