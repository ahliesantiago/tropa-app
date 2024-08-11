import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'
const app = express()

import { PORT, mongoDBURL } from './config/config.js'
import routes from './routes/routes.js'

app.set('views', './views')

app.use(express.json())
app.use(cors())
// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     // allowedHeaders: ['Content-Type'],
//     // allowedHeaders: ['Content-Type', 'Authorization'],
//     credentials: true,
//   })
// )
app.use(cookieParser())
app.use('/', routes)

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => {
      console.log(`App is listening to port ${PORT}`)
    })
  })
  .catch((err) => {
    console.log(err)
  })