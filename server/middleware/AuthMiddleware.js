import 'dotenv/config'
import jwt from 'jsonwebtoken'
import UserModel from '../models/UserModel.js'

export const userVerification = (req, res) => {
  const token = req.cookies.jwt
  if (!token) {
    return res.status(401).json({ status: "You are not authorized to view this page." })
  }
  jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
    if (err) {
      return res.status(401).json({ status: "You are not authorized to view this page." })
    }
    return res.status(200).json({ status: "User authorization verified." })
  })
}