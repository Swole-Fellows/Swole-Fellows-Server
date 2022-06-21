'use strict';

require('dotenv').config();
const cors = require('cors');
const express = require('express');
const axios = require('axios');
const verifyUser = require('./authorize.js');
const FoodHandlers = require('./handlers');
const RecipeHandlers = require('./handlers');
const ProfileHandlers = require('./profileHandlers');

const PORT = process.env.PORT || 3001;
const DB_URL = process.env.DB_URL;

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

    const foodData = new Food(response.data);
    return Promise.resolve(foodData);
  } catch (error) {
    console.error(error);
  }
}

class Food {

  constructor(value) {
    this.foodName = value.hints[0].food.label;
    this.calories = value.hints[0].food.nutrients.ENERC_KCAL;
    this.servingSize = value.totalWeight;
    this.fats = value.hints[0].food.nutrients.FAT;
    this.carbs = value.hints[0].food.nutrients.CHOCDF;
    this.protein = value.hints[0].food.nutrients.PROCNT;
    this.servingSize = value.hints[0].measures.find(obj => obj.label === 'Serving').weight;
    this.image = value.hints[0].food.image;
    this.amountConsumed = 0;
  }
}

// class Profile {
//   constructor(value){
//     this.targetCal= {type: Number};
//     this.currentWeight= {type: Number};
//     this.dateOfBirth= {type: String};
//     this.sex= {type: String};
//     this.email= {type: String};
//   }
// }

app.get('/food', (req, res) => getFood(req).then(value => res.status(200).send(value)));

// MongoDB

app.post('/foodDB', FoodHandlers.create);
app.get('/foodDB', FoodHandlers.getAll);
app.get('/foodDB/:id', FoodHandlers.getOne);
app.put('/foodDB/:id', FoodHandlers.update);
app.delete('/foodDB/:id', FoodHandlers.delete);

app.post('/profile', ProfileHandlers.create);
app.get('/profile/:id', ProfileHandlers.getOne);
app.put('/profile/:id', ProfileHandlers.update);
app.delete('/profile/:id', ProfileHandlers.delete);

// app.post('/recipes', RecipeHandlers.create);
// app.get('/recipes ', RecipeHandlers.getOne);
// app.get('/recipes', RecipeHandlers.getAll);
// app.put('/recipes', RecipeHandlers.update);
// app.delete('/recipes', RecipeHandlers.delete);

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
