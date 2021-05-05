  
import mongoose from 'mongoose';

const CartSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'product',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  quantity: {
    type: Number,
    require: true,
  }
});

export default mongoose.models.cart || mongoose.model('cart', CartSchema);