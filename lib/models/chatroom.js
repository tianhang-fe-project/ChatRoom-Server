'use strict';

import mongoose from 'mongoose'

const chatRoomSchema = new mongoose.Schema({
  room_id: Number,
  name: { type: String, default: "" },
  admin: String,
  messages: [{
    sender: String,
    timestamp: { type: Date, default: Date.now },
    text: String
  }],
  user: [{
    name: String,
    is_admin: Boolean
  }]
});

chatRoomSchema.index({ id: 1 });

const ChatRoom = mongoose.model('ChatRoom', chatRoomSchema);

export default ChatRoom