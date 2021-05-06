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
    const carts = await Cart.find({user: req.user.id}).populate("product")

    return res.status(200).json(carts)
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: 'Something went wrong.' });
  }
})

/**
 * @route   POST api/carts/
 * @desc    Create a cart
 * @access  Private
 */
router.post('/', auth, async(req, res) => {
  const {product} = req.body

  try {
    const cartItem = await Cart.findOne({product})

    if(cartItem) {
      return res.status(400).json({msg: "Product is already in the cart"})
    }

    const newCart = new Cart({
      user: req.user.id,
      quantity: 1,
      product
    })

    await newCart.save()

    return res.status(200).json(newCart)
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: 'Something went wrong.' });
  }
})

/**
 * @route   PUT api/carts
 * @desc    Toggle cart quantity
 * @access  Private
 */
 router.put('/', auth, async(req, res) => {
   const {product, quantity} = req.body;

   try {
     let cartItem = await Cart.findOne({product}).populate("product")

     if(!cartItem) {
       return res.status(404).json({msg: "Cart item not found"})
     }

     if(cartItem.user.toString() !== req.user.id) {
       return res.status(401).json({ msg: 'Not authorized' })
     }

     cartItem = await Cart.findOneAndUpdate({product}, {quantity}, {new: true})

    return res.status(200).json(cartItem)
   } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: 'Something went wrong.' });
   }
 })

 /**
 * @route   DELETE api/carts/:product_id
 * @desc    Remove cart
 * @access  Private
 */
router.delete('/', auth, async(req, res) => {
  const {product} = req.body;

  try {
    const cartItem = await Cart.findOne({product})

    if(!cartItem) {
      return res.status(404).json({msg: "Cart item not found"})
    }

    if(cartItem.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' })
    }

    await Cart.findOneAndDelete({product})

    return res.status(200).json({msg: "Cart item removed successfully"})
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: 'Something went wrong.' });
  }
})

export default router