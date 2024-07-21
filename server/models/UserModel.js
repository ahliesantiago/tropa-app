import mongoose from 'mongoose';
import { InterestModel } from './InterestModel.js';

const userSchema = new mongoose.Schema({
  isAdmin: {
    type: Boolean,
    default: false,
  },
  username: {
    type: String,
    required: true,
    minLength: 6,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  middleName: String,
  lastName: {
    type: String,
    required: true,
  },
  nickname: String,
  emailAddress: {
    type: String,
    required: true, 
    unique: true,
  },
  phoneNumber: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  birthday: {
    type: Date,
    required: true,
  },
  location: String,
  about: {
    type: String,
    minLength: 10,
  },
  interests: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'InterestModel',
  }],
  gender: String,
  pronouns: String,
  preference: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export const UserModel = mongoose.model('users', userSchema);