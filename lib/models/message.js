'use strict';

import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema({
  room_id: { type: Number, index: true },
  text: { type: String, default: "" },
  timestamp: { type: Date, default: Date.now },
  useremail: String
});

messageSchema.index({ id: 1 });

const Message = mongoose.model('Message', messageSchema);

export default Message