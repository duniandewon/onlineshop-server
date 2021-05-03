import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User'

const router = express.Router()


/**
 * @route   POST api/auth
 * @desc    Login user
 * @access  Public
 */
router.post("/", async (req, res) => {
  const {email, password} = req.body;

  if(!email) {
    return res.status(400).json({msg: "Email should not be empty"})
  }

  if(!password) {
    return res.status(400).json({msg: "Password should not be empty"})
  }

  try {
    const user = await User.findOne({email})
    
    if(!user) {
      return res.status(400).json({msg: "Wrong email or password"})
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Wrong email or password' });
    }

    const token = await jwt.sign({user: {id: user.id}}, process.env.JWT_SECRET, {expiresIn: 3600000})

    return res.status(200).json(token)
  } catch (err) {
    console.log(err)
    return res.status(500).json({msg: "Something went wrong"})
  }
})

export default router