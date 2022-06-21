'use strict';
const ProfileHandlers ={};
const ProfileModel = require('./models/profile-Model');

ProfileHandlers.create = async (request, response, next) => {
  try {
    const data = request.body;
    console.log(data);
    const profile = await ProfileModel.create({...data, email: request.user.email});
    await profile.save();
    response.status(200).json(profile);
  } catch (error) { next(error.message); }
  console.log('creating a Profile...');
};

ProfileHandlers.getOne = async (request, response) => {
  const id = request.params.id;
const profile = await ProfileModel.find({ _id: id, /*email:request.user.email*/ });
  response.status(200).json(profile);
  console.log('getting a single profile...');
};

ProfileHandlers.update = async (request, response) => {
  const { id } = request.params;
  console.log(request.user.email);
  try {
    const Profile = await ProfileModel.findOne({ _id: id, email:request.user.email });
    if (!Profile) response.status(400).send('unable to update Profile');
    else {
      const updatedProfile = await ProfileModel.findByIdAndUpdate(id, {...request.body, email:request.user.email}, { new: true, overwrite: false });
      response.status(200).send(updatedProfile);
    }
  } catch (e) {
    response.status(500).send('server error in ProfileHandlers Update');
  }};

  ProfileHandlers.delete = async (request, response) => {
    const id = request.params.id;
    await ProfileModel.deleteOne({ _id: id, email: request.user.email });
    console.log('deleting a Profile...');
    response.status(200).send('Profile deleted');
  };

module.exports = ProfileHandlers;

