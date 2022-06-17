'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URL);



async function seed() {
  const Food = new Food({
    name: 'Rice',
    carbs: 25,
    sugars: 22,
    protein: 3,
    fats: 1,
    calories: 300,
    servingSize: '300'
  });

  Food.save(function (err) {
    if (err) console.log(err);
    else console.log('chicken to the mooooooooooooooon');
  });


  mongoose.disconnect();
}

seed();
