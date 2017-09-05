import ChatRoomModel from '../models/chatroom';


class ChatRoom {
  constructor() {
    this.addChatRoom = this.addChatRoom.bind(this);
    this.fetchRoomList = this.fetchRoomList.bind(this);
  }

  async addChatRoom(req, res, next) {
    console.log('req:', req.body);
    try {
      if (!req.body.admin) {
        throw new Error('chatroom admin is required');
      } else if (!req.body.id) {
        throw new Error('chatroom id is required');
      } else if (!req.body.name) {
        throw new Error('chatroom name is required');
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
      const newRoom = {
        room_id: req.body.id,
        name: req.body.name,
        admin: req.body.admin
      }
      const chatroom = new ChatRoomModel(newRoom);
      await chatroom.save();

      res.send({
        status: 1,
        sussess: 'Add ChatRoom Successfully',
        roomDetail: newRoom
      })

    } catch (err) {
      console.log('Add ChatRoom Failed');
      res.send({
        status: 0,
        type: 'ERROR_SERVER',
        message: 'Add ChatRoom Failed',
      })
    }
  }

  async fetchRoomList(req, res, next) {
    let roomList;
    await ChatRoomModel.find((err, rooms) => {
      // console.log(rooms);
      roomList = rooms;
    });
    res.send({
      status: 1,
      sussess: 'fetch ChatRoom List Successfully',
      roomDetail: roomList
    })
  }

  async fetchRoomMsgList(req, res, next) {

  }

  async fetchRoomUserList(req, res, next) {

  }

  async addChatMsg(roomid, sender, text) {

  }

  async addUser(roomid, email) {

  }

  async deleteUser(email) {

  }

}

export default new ChatRoom();