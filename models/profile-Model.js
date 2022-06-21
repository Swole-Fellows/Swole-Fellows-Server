'use strict';

const mongoose = require('mongoose');

//destructure
const { Schema } = mongoose;

const profileSchema = new Schema({
  email: {type: String},
  targetCal: {type: Number},
  currentWeight: {type: Number},
  sex: {type: String},
  age: {type: Number},
  height: {type: Number}

});

const ProfileModel = mongoose.model('profile', profileSchema);

module.exports = ProfileModel;
