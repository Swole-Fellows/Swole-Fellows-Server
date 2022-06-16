'use strict';

const mongoose = require('mongoose');

//destructure
const { Schema } = mongoose;

const profileSchema = new Schema({
  email: {type: String},

});

const ProfileModel = mongoose.model('profile', profileSchema);
module.exports = ProfileModel;
