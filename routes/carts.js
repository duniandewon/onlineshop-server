import express from 'express'

import auth from '../middlewares/auth'
import Cart from '../models/Cart'

const router = express.Router()

/**
 * @route   GET api/carts
 * @desc    Get carts
 * @access  Private
 */
router.get('/', auth, async (req, res) => {
  try {
    const carts = await Cart.find({user: req.user.id}) 

    return res.status(200).json(carts)
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: 'Something went wrong.' });
  }
})


export default router