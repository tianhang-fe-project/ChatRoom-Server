'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var chatRoomSchema = new _mongoose2.default.Schema({
  room_id: Number,
  name: { type: String, default: "" },
  admin: String,
  users: [String],
  blacklist: [String]
});

chatRoomSchema.index({ id: 1 });

var ChatRoom = _mongoose2.default.model('ChatRoom', chatRoomSchema);

exports.default = ChatRoom;