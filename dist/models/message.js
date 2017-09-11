'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var messageSchema = new _mongoose2.default.Schema({
  room_id: { type: Number, index: true },
  text: { type: String, default: "" },
  timestamp: { type: Date, default: Date.now },
  useremail: String
});

messageSchema.index({ id: 1 });

var Message = _mongoose2.default.model('Message', messageSchema);

exports.default = Message;