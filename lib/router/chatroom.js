'use strict';

import express from 'express';
import ChatRoom from '../controller/chatroom'

const router = express.Router();

router.get('/', (req, res) => {
  res.send("hello world !")
});
router.get('/chatroom', ChatRoom.fetchRoomList);
router.post('/chatroom', ChatRoom.addChatRoom);


export default router