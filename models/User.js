import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: Number,
  },
  email: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: true,
  },
  image: {
    type: String,
  },
  password: {
    type: String,
    require: true
  },
});

export default mongoose.models.user ||
  mongoose.model('users', UserSchema);