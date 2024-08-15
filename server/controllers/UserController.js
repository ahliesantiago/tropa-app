import { UserModel } from '../models/UserModel.js'

// @desc  Update an existing user
// @route PUT /users/:id
// @access Public
export const Update = async (req, res) => {
  try{
    if(!req.body){
      return res.status(400).json({message: 'Content cannot be empty'})
    }
    const user = await UserModel.findByIdAndUpdate(req.params.id, {
      firstName: req.body.firstName,
      middleName: req.body.middleName,
      lastName: req.body.lastName,
      nickname: req.body.nickname,
      phoneNumber: req.body.phoneNumber,
      location: req.body.location,
      about: req.body.about,
      interests: req.body.interests,
      gender: req.body.gender,
      pronouns: req.body.pronouns,
      sexuality: req.body.sexuality,
      beliefReligion: req.body.beliefReligion,
      beliefIsLgbtFriendly: req.body.beliefIsLgbtFriendly,
      beliefFood: req.body.beliefFood,
      beliefPolitics: req.body.beliefPolitics,
      images: req.body.images,
      updatedAt: Date.now()
    })
    if(!user){
      return res.status(404).json({message: 'User not found'})
    }
    return res.status(200).json(user)
  }catch(error){
    console.log(error.message)
    res.status(500).json({message: error.message})
  }
}