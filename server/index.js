import express from 'express';
import { PORT, mongoDBURL } from './config/config.js';
import mongoose from 'mongoose';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post()

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`App is listening to port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });