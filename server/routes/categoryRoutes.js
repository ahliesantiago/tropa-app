/**
 * 
**/

import express from "express";
import { InterestCategoryModel } from "../models/InterestCategoryModel.js";
const router = express.Router();

/**
 * This route will display all categories.
**/
router.get('/', async (req, res) => {
  try{
    const categories = await InterestCategoryModel.find({});
    return res.status(200).json({
      count: categories.length,
      data: categories
    });
  }catch{
    console.log(error.message);
    res.status(500).send({message: error.message});
  }
});

/**
 * This route will display 1 category by ID.
**/
router.get('/:id', async (req, res) => {
  try{
    const category = await InterestCategoryModel.findById(req.params.id);
    return res.status(200).json(category);
  }catch(error){
    console.log(error.message);
    res.status(500).send({message: error.message});
  }
});

/**
 * This route will add a category.
**/
router.post('/new', async(req, res) => {
  try{
    if(!req.body){
      return res.status(400).send({message: 'Content cannot be empty'});
    }
    const newCategory = {
      categoryName: req.body.categoryName
    }
    const category = await InterestCategoryModel.create(newCategory);
    return res.status(201).send(category)
  }catch(error){
    console.log(error.message);
    res.status(500).send({message: error.message});
  }
});

/**
 * This route will update a category.
**/
router.put('/:id', async (req, res) => {
  try{
    if(!req.body){
      return res.status(400).send({message: 'Content cannot be empty'});
    }
    const category = await InterestCategoryModel.findByIdAndUpdate(req.params.id, req.body);
    if(!category){
      return res.status(404).send({message: 'Category not found'});
    }
    return res.status(200).send(category);
  }catch(error){
    console.log(error.message);
    res.status(500).send({message: error.message});
  }
});

/**
 * This route will delete a category.
**/
router.delete('/:id', async (req, res) => {
  try{
    const category = await InterestCategoryModel.findByIdAndDelete(req.params.id);
    if(!category){
      return res.status(404).send({message: 'Category not found'});
    }
    return res.status(200).send({message: 'Category deleted successfully'});
  }catch(error){
    console.log(error.message);
    res.status(500).send({message: error.message});
  }
});

export default router;
