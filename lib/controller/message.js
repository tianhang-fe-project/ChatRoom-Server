import MessageModel from '../models/message';


class Message {
  constructor() {}

  async addChatRoomMessage(req, res, next) {
    console.log('req:', req.body);
    try {
      if (!req.body.room_id) {
        throw new Error('chatroom id is required');
      } else if (!req.body.useremail) {
        throw new Error('useremail is required');
      }
    } catch (err) {
      console.log('params error', err.message);
      res.send({
        status: 0,
        type: 'ERROR_PARAMS',
        message: err.message
      })
      return
    }

    try {
      const newMessage = {
        room_id: req.body.id,
        useremail: req.body.name,
        text: req.body.text
      }
      const message = new MessageModel(newMessage);
      await message.save();

      res.send({
        status: 1,
        sussess: 'Add ChatRoom Message Successfully',
        roomDetail: message
      })

    } catch (err) {
      console.log('Add ChatRoom Message Failed');
      res.send({
        status: 0,
        type: 'ERROR_SERVER',
        message: 'Add ChatRoom Message Failed',
      })
    }
  }

  async saveChatRoomMessage(msg) {
    console.log('save msg:', msg);
    try {
      if (!msg.room_id) {
        throw new Error('chatroom id is required');
      } else if (!msg.useremail) {
        throw new Error('useremail is required');
      }
    } catch (err) {
      console.log('params error', err.message);
      return
    }

    try {
      const newMessage = {
        room_id: msg.room_id,
        useremail: msg.useremail,
        text: msg.text
      }
      const message = new MessageModel(newMessage);
      await message.save();
    } catch (err) {
      console.log('Add ChatRoom Message Failed');
    }
  }


  async fetchRoomMsgList(req, res, next) {
    console.log('req:', req.body);
    console.log('params:', req.params);
    console.log('query:', req.query);
    try {
      if (!req.params.roomid) {
        throw new Error('chatroom id is required');
      } else if ((!req.query.page) && (req.query.page != 0)) {
        throw new Error('page number is required');
      }
    } catch (err) {
      console.log('params error', err.message);
      res.send({
        status: 0,
        type: 'ERROR_PARAMS',
        message: err.message
      })
      return
    }

    try {
      const pageSize = 10000;
      const page = parseInt(req.query.page);
      const roomId = req.params.roomid;
      let messageList;
      let count;
      await MessageModel.find({ room_id: roomId })
        .skip(page * pageSize)
        .limit(pageSize)
        .sort({ 'timestamp': 1 })
        .exec((err, msgs) => {
          messageList = msgs;
        });

      await MessageModel.count({ room_id: roomId }).exec((err, msgCount) => {
        count = msgCount;
      });

      res.send({
        status: 1,
        sussess: 'fetch Message List Successfully',
        messageList: messageList,
        count: count
      })
    } catch (err) {
      console.log('fetch Message List Failed');
      res.send({
        status: 0,
        type: 'ERROR_SERVER',
        message: 'fetch Message List Failed'
      })
    }

  }
}

export default new Message();