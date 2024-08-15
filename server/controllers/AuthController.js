import { UserModel } from '../models/UserModel.js'
import { generateToken } from '../util/generateToken.js'

// @desc  Register a new user
// @route POST /users/new
// @access Public
export const Register = async (req, res) => {
  try{
    if(!req.body){
      return res.status(400).json({message: 'Content cannot be empty'})
    }
    const takenUsername = await UserModel.findOne({username: req.body.username})
    const takenEmail = await UserModel.findOne({emailAddress: req.body.emailAddress})
    if(takenUsername){
      return res.status(400).json({message: 'Username already exists'})
    }else if(takenEmail){
      return res.status(400).json({message: 'Email already registered'})
    }
    const newUser = {
      isAdmin: req.body.isAdmin,
      username: req.body.username,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      emailAddress: req.body.emailAddress,
      password: req.body.password,
      birthday: new Date(req.body.birthday),
    }
    const user = await UserModel.create(newUser)
    generateToken(res, user._id)
    return res.status(201).json({
      message: 'Registration successful',
      isAdmin: user.isAdmin,
      id: user._id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
    })
  }catch(error){
    console.log(error.message)
    res.status(500).json({message: error.message})
  }
}

// @desc  Login attempt, match email or username and password
// @route POST /users/login
// @access Public
export const Login = async (req, res) => {
  try{
    const { loginMode, password } = req.body
    if(!loginMode || !password){
      return res.status(400).json({message: 'All fields are required'})
    }
    const userByEmail = await UserModel.findOne({ email: loginMode })
    const userByUsername = await UserModel.findOne({ username: loginMode })
    let user
    if(userByEmail){
      user = userByEmail
    }else if(userByUsername){
      user = userByUsername
    }else if(!userByEmail || !userByUsername){
      return res.status(400).json({message: 'Incorrect username, email, or password'})
    }
    if(user && user.comparePassword(password)){
      generateToken(res, user._id)
      let complete = false;
      if (user.location && user.about && user.interests && user.gender && user.pronouns && user.beliefIsLgbtFriendly){
        complete = true;
      }
      return res.status(201).json({
        message: 'Login successful',
        isAdmin: user.isAdmin,
        id: user._id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        isComplete: complete, // will be used to signify if user's profile basics are complete
      })
    }else{
      return res.status(400).json({message: 'Incorrect username, email, or password'})
    }
  }catch(error){
    console.log(error.message)
    res.status(500).json({message: error.message})
  }
}

// @desc  Logout user
// @route GET /users/logout
// @access Public
export const Logout = async (req, res) => {
  res.cookie('jwt', '', {
    expires: new Date(0), // Date(Date.now()),
    httpOnly: true
  })

  res.status(200).json({message: 'User signed out'})
}
