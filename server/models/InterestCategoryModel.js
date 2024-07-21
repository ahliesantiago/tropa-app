import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export const InterestCategoryModel = mongoose.model('categories', categorySchema);