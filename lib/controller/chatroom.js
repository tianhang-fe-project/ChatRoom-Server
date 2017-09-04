import ChatRoomModel from '../models/chatroom';


class ChatRoom {
  constructor() {
    this.addChatRoom = this.addChatRoom.bind(this);
  }

  async addChatRoom(req, res, next) {
    console.log('req:', req);
    try {

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
    let roomList = [1, 2];
    res.send({
      status: 1,
      sussess: 'fetch ChatRoom List Successfully',
      roomDetail: roomList
    })
  }
}

export default new ChatRoom();