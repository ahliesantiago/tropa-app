import 'dotenv/config'
import jwt from "jsonwebtoken"

export const generateToken = (res, id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d' // 3 * 24 * 60 * 60
  })

  res.cookie("jwt", token, {
    withCredentials: true,
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development', // true in production
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 // 30 days in seconds
  })
}