'use strict';

import express from 'express';
import ChatRoom from '../controller/chatroom';
import Message from '../controller/message';

const router = express.Router();

router.get('/chatroom', ChatRoom.fetchRoomList);
router.post('/chatroom', ChatRoom.addChatRoom);
router.get('/chatroominfo/:roomid', ChatRoom.fetchRoomInfo);
router.get('/blacklist/:roomid', ChatRoom.fetchBlacklist);

router.get('/message/:roomid', Message.fetchRoomMsgList);
// router.post('/message', Message.addChatRoomMessage);

router.get('/user/:roomid', ChatRoom.fetchRoomUserList);
router.post('/user', ChatRoom.addUser);

export default router