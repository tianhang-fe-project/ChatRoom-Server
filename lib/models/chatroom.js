'use strict';

import mongoose from 'mongoose'

const chatRoomSchema = new mongoose.Schema({
  room_id: Number,
  name: { type: String, default: "" },
  admin: String,
  users: [String],
  blacklist: [String]
});

chatRoomSchema.index({ id: 1 });

const ChatRoom = mongoose.model('ChatRoom', chatRoomSchema);

export default ChatRoom