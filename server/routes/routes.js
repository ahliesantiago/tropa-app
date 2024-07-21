/**
 * 
**/

import express from 'express';

import userRoutes from '../routes/userRoutes.js';
import interestRoutes from '../routes/interestRoutes.js';
import categoryRoutes from '../routes/categoryRoutes.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello World!');
});

router.use('/users', userRoutes);
router.use('/interests', interestRoutes);
router.use('/categories', categoryRoutes);

/**
 * This is the route for signing in or registering to the app.
**/
router.post('/account', (req, res) => {
  res.send('Account creation page!');
});

export default router;