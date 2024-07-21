import mongoose from 'mongoose';
import { InterestCategoryModel } from './InterestCategoryModel.js';

const interestSchema = new mongoose.Schema({
  interestName: {
    type: String,
    required: true,
    unique: true,
  },
  categories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'InterestCategoryModel',
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

export const InterestModel = mongoose.model('interests', interestSchema);