'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _chatroom = require('../controller/chatroom');

var _chatroom2 = _interopRequireDefault(_chatroom);

var _message = require('../controller/message');

var _message2 = _interopRequireDefault(_message);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/chatroom', _chatroom2.default.fetchRoomList);
router.post('/chatroom', _chatroom2.default.addChatRoom);
router.get('/chatroominfo/:roomid', _chatroom2.default.fetchRoomInfo);
router.get('/blacklist/:roomid', _chatroom2.default.fetchBlacklist);

router.get('/message/:roomid', _message2.default.fetchRoomMsgList);
// router.post('/message', Message.addChatRoomMessage);

router.get('/user/:roomid', _chatroom2.default.fetchRoomUserList);
router.post('/user', _chatroom2.default.addUser);

exports.default = router;