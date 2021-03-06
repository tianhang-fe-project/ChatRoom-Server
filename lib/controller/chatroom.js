import ChatRoomModel from '../models/chatroom';
import UserModel from '../models/user';


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


  async fetchRoomUserList(req, res, next) {
    try {
      if (!req.params.roomid) {
        throw new Error('chatroom id is required');
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
      const roomId = req.params.roomid;
      let userlist;
      await ChatRoomModel.findOne({ room_id: roomId })
        .select('users -_id')
        // .sort({ 'timestamp': 1 })
        .exec((err, data) => {
          // console.log(data);
          data = data || {};
          userlist = data.users;
        });

      await Promise.all(userlist.map((email) => {
        return UserModel.findOne({ useremail: email }, (err, user) => {
          return user;
        });
      })).then((res) => {
        console.log("------user list-----");
        // console.log(res);
        userlist = res;
      });
      // console.log("------user list-----");
      // console.log(userlist);

      res.send({
        status: 1,
        sussess: 'fetch User List Successfully',
        userList: userlist
      })
    } catch (err) {
      console.log('fetch User List Failed');
      res.send({
        status: 0,
        type: 'ERROR_SERVER',
        message: 'fetch User List Failed'
      })
    }
  }

  async fetchRoomInfo(req, res, next) {
    try {
      if (!req.params.roomid) {
        throw new Error('chatroom id is required');
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
      const roomId = req.params.roomid;
      let roomInfo;
      await ChatRoomModel.findOne({ room_id: roomId })
        .exec((err, data) => {
          // console.log(data);
          roomInfo = data;
        });

      res.send({
        status: 1,
        sussess: 'fetch ChatRoom Successfully',
        roomInfo: roomInfo
      })
    } catch (err) {
      console.log('fetch ChatRoom Failed');
      res.send({
        status: 0,
        type: 'ERROR_SERVER',
        message: 'fetch ChatRoom Failed'
      })
    }
  }

  async addUser(roomid, email, avatar, cb) {
    //add user to room
    await ChatRoomModel.update({ room_id: roomid }, { $addToSet: { "users": email } },
      function(err, model) {
        // console.log(err);
        // console.log(model);
        cb();
      }
    );
    let query = { useremail: email },
      update = {
        useremail: email,
        avatar: avatar
      },
      options = { upsert: true, new: true, setDefaultsOnInsert: true };

    //add user to user list(avatar)
    await UserModel.findOneAndUpdate(query, update, options, function(error, result) {
      if (error) return;
      // console.log(result);
    });
  }

  async deleteUser(roomid, email, black) {
    await ChatRoomModel.update({ room_id: roomid }, { $pull: { "users": email } },
      function(err, model) {
        console.log(err);
        // console.log(model);
      }
    );
    if (black) {
      //add user to chatroom blcklist
      console.log("--blacklist----");
      console.log(email);
      await ChatRoomModel.update({ room_id: roomid }, { $addToSet: { "blacklist": email } },
        function(err, model) {
          console.log(err);
          // console.log(model);
        }
      );
    }
  }

  async fetchBlacklist(req, res, next) {
    try {
      if (!req.params.roomid) {
        throw new Error('chatroom id is required');
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
      const roomId = req.params.roomid;
      let blacklist;
      await ChatRoomModel.findOne({ room_id: roomId })
        .select('blacklist -_id')
        .exec((err, data) => {
          console.log(data);
          blacklist = data;
        });
      res.send({
        status: 1,
        sussess: 'fetch blacklist Successfully',
        blacklist: blacklist
      })
    } catch (err) {
      console.log('fetch blacklist Failed');
      res.send({
        status: 0,
        type: 'ERROR_SERVER',
        message: 'fetch blacklist Failed'
      })
    }
  }

}

export default new ChatRoom();