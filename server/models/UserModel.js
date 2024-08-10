import mongoose from 'mongoose';
import { InterestModel } from './InterestModel.js';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  isAdmin: {
    type: Boolean,
    default: false,
  },
  username: {
    type: String,
    required: [true, "Username required"],
    minLength: 6,
    unique: true,
  },
  firstName: {
    type: String,
    required: [true, "First name required"],
  },
  middleName: String,
  lastName: {
    type: String,
    required: [true, "Last name required"],
  },
  nickname: String,
  emailAddress: {
    type: String,
    required: [true, "Email address required"], 
    unique: true,
  },
  phoneNumber: {
    type: String,
    unique: true,
    sparse: true
  },
  password: {
    type: String,
    required: [true, "Password required"],
    minLength: 6,
  },
  birthday: {
    type: Date,
    required: [true, "Birthday required, minimum age is 18 years old"],
    // "You need to be at least 18 years old to join"
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
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Trans', 'Genderqueer', 'Other'],
  },
  pronouns: {
    type: String,
    // enum: ['He/him', 'She/her', 'They/them', 'Other']
  },
  sexuality: {
    type: String,
    // enum: ['Unknown', 'Heterosexual', 'Homosexual', 'Bisexual', 'Asexual', 'Pansexual', 'Queer', 'Other'],
  },
  beliefReligion: {
    type: String,
    // enum: ['Atheist', 'Buddhist', 'Christian', 'Hindu', 'Islam', 'Jewish', 'Muslim', 'Sikh', 'Other'],
  },
  beliefIsLgbtFriendly: Boolean,
  beliefFood: {
    type: String,
    // enum: ['No preference', 'Vegetarian', 'Vegan', 'Kosher', 'Halal', 'Other'],
  },
  beliefPolitics: {
    type: String,
    // enum: ['Liberal', 'Conservative', 'Moderate', 'Apolitical', 'Other'],
  },
  images: [{
    type: String,
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, 10);
});

export const UserModel = mongoose.model('users', userSchema);