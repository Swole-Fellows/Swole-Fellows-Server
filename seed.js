'use strict';

const mongoose = require('mongoose');
require('dotenv').config();

const Food = require('./models/food-model.js');

async function seed() {
  mongoose.connect(process.env.DB_URL);

  const bannana = new Food({
    name: 'bannana',
    carbs: 25,
    sugars: 22,
    protein: 3,
    fats: 1,
    calories: 300,
    servingSize: '300',
    email: 'jamesdoyle202@gmail.com'
  });
  bannana.save(function (err) {
    if (err) console.error(err);
    else console.log('save hp1');
  });


  mongoose.disconnect();
}

seed();
