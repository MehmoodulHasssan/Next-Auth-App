import mongoose from 'mongoose';

const { Schema, models, model } = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Please provide a username'],
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please set a password'],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgotPasswrodToken: String,
  forgotPasswrodTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});

const User = models.User || model('User', UserSchema);
export default User;
