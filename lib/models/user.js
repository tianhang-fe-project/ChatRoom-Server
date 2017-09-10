'use strict';

import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  useremail: { type: String, required: true, unique: true },
  avatar: String
});

userSchema.index({ useremail: 1 });

const User = mongoose.model('User', userSchema);

export default User