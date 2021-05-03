import express from 'express'

import Product from '../models/products'

const router = express.Router()

/**
 * @route   GET api/products
 * @desc    Get products
 * @access  Public
 */

router.get('/', async (req, res) => {
  try {
    const product = await Product.find({});

    if (!product) {
      return res.status(404).json({ msg: 'No products were found!' });
    }

    return res.status(200).json(product);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: 'Something went wrong.' });
  }
})

export default router