'use strict';

require('dotenv').config();
const cors = require('cors');
const express = require('express');
const axios = require('axios');
const verifyUser = require('./authorize.js');
const FoodHandlers = require('./handlers');
const RecipeHandlers = require('./handlers');


const PORT = process.env.PORT || 3001;
const DB_URL = process.env.DB_URL ;

const app = express();

app.use(cors());
app.use(express.json());
app.use(verifyUser);

const mongoose = require('mongoose');

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('Mongoose connected'));

// API Calls

async function getFood(req) {
  const search = req.query.search;
  const url = `https://api.edamam.com/api/food-database/v2/parser?app_id=a0001873&app_key=25bea95fd0ab0ce3e9788372c104698a&nutrition-type=logging&ingr=${search}`;
  try {
    const response = await axios.get(url);
    // console.log(response.data.parsed);
    console.log(response.data.parsed.food);
    console.log(response.data.hints.food);
    
    // const foodData = new Food(value);
    return Promise.resolve(response.data);
  } catch (error) {
    console.error(error);
  }
}

class Food {

  constructor(value) {
    // this.name = req.query.search;
    this.name = value.food.label;
    this.calories= value.calories;
    this.servingSize= value.totalWeight;
    this.fats= value.totalNutrients.FAT.quantity;
    this.carbs= value.totalNutrients.CHOCDF.quantity;
    this.protein= value.totalNutrients.PROCNT.quantity;
    // this.image = value;
  }
}

app.get('/food', (req, res) => getFood(req).then(value => res.status(200).send(value)));

// MongoDB

app.post('/food', FoodHandlers.create);
app.get('/food ', FoodHandlers.getAll);
app.get('/food/:id', FoodHandlers.getOne);
app.put('/food', FoodHandlers.update);
app.delete('/food/:id', FoodHandlers.delete);

app.post('/recipes', RecipeHandlers.create);
app.get('/recipes ', RecipeHandlers.getOne);
app.get('/recipes', RecipeHandlers.getAll);
app.put('/recipes', RecipeHandlers.update);
app.delete('/recipes', RecipeHandlers.delete);

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
