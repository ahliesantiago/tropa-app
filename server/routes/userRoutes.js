/**
 * 
**/

import express from 'express';

import { UserModel } from '../models/UserModel.js';
import * as auth from '../controllers/AuthController.js';

const router = express.Router();

router.post('/new', auth.Register);
router.post('/login', auth.Login);
router.post('/logout', auth.Logout);

/**
 * This route will display all users.
**/
router.get('/', async (req, res) => {
  try{
    const users = await UserModel.find({});
    return res.status(200).json({
      count: users.length,
      data: users
    });
  }catch{
    console.log(error.message);
    res.status(500).json({message: error.message});
  }
});

/**
 * This route will display 1 user by username.
**/
router.get('/:username', async (req, res) => {
  try{
    const user = await UserModel.find({username: req.params.username});
    return res.status(200).json(user);
  }catch(error){
    console.log(error.message);
    res.status(500).json({message: error.message});
  }
});

/**
 * This route will display 1 user by ID.
**/
router.get('/:id', async (req, res) => {
  try{
    const user = await UserModel.findById(req.params.id);
    return res.status(200).json(user);
  }catch(error){
    console.log(error.message);
    res.status(500).json({message: error.message});
  }
});

/**
 * This route will update a user.
**/
router.put('/:id', async (req, res) => {
  try{
    if(!req.body){
      return res.status(400).json({message: 'Content cannot be empty'});
    }
    const user = await UserModel.findByIdAndUpdate(req.params.id, {
      firstName: req.body.firstName,
      middleName: req.body.middleName,
      lastName: req.body.lastName,
      nickname: req.body.nickname,
      phoneNumber: req.body.phoneNumber,
      location: req.body.location,
      about: req.body.about,
      interests: req.body.interests,
      gender: req.body.gender,
      pronouns: req.body.pronouns,
      sexuality: req.body.sexuality,
      beliefReligion: req.body.beliefReligion,
      beliefIsLgbtFriendly: req.body.beliefIsLgbtFriendly,
      beliefFood: req.body.beliefFood,
      beliefPolitics: req.body.beliefPolitics,
      images: req.body.images,
      updatedAt: Date.now()
    });
    if(!user){
      return res.status(404).json({message: 'User not found'});
    }
    return res.status(200).json(user);
  }catch(error){
    console.log(error.message);
    res.status(500).json({message: error.message});
  }
});

export default router;