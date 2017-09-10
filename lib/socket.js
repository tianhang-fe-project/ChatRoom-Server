import SocketIO from 'socket.io';
import redis from 'redis';
import Message from './controller/message';
import ChatRoom from './controller/chatroom';

export default (server, port) => {

  let redisClient = redis.createClient;
  let pub = redisClient(6379, '127.0.0.1');
  let sub = redisClient(6379, '127.0.0.1');

  let num = 0;
  let roomSet = {};
  let io = new SocketIO(server);

  io.on('connection', function(socket) {
    // console.log(socket);
    //客户端请求ws URL:  http://127.0.0.1:6001?roomid=k12_webcourse_room_1
    var roomid = socket.handshake.query.roomid;

    console.log('worker pid: ' + process.pid + ' join roomid: ' + roomid);

    socket.on('join', function(data) {

      socket.join(roomid); //join room
      console.log("data:", data);
      if (!roomSet[roomid]) {
        roomSet[roomid] = {};
        console.log('sub channel ' + roomid);
        sub.subscribe(roomid);
      }
      roomSet[roomid][socket.id] = {};

      //reportConnect();
      data.socketId = socket.id;

      console.log(data.username + ' join, IP: ' + socket.client.conn.remoteAddress);
      roomSet[roomid][socket.id].username = data.username;
      // io.to(roomid).emit('broadcast_join', data);
      pub.publish(roomid, JSON.stringify({
        "event": 'join',
        "data": data
      }));

    });

    // socket.on('say', function(data) {
    //   console.log("Received Message: " + data.text);
    //   pub.publish(roomid, JSON.stringify({
    //     "event": 'broadcast_say',
    //     "data": {
    //       username: roomSet[roomid][socket.id].username,
    //       text: data.text
    //     }
    //   }));
    // });

    socket.on('roommsg', function(data) {
      console.log("Received Message: " + JSON.stringify(data));
      pub.publish(roomid, JSON.stringify({
        "event": 'broadcast_say',
        "data": {
          username: data.username,
          useremail: data.username,
          text: data.text,
          room_id: roomid,
          avatar: data.avatar
        }
      }));
    });

    socket.on('leave', function(data) {
      console.log(data);
      socket.leave(roomid);
      pub.publish(roomid, JSON.stringify({
        "event": 'broadcast_quit',
        "data": {
          username: data.username,
          useremail: data.username,
          text: data.text,
          room_id: roomid,
          leavetype: data.leavetype
        }
      }));
    });


    socket.on('disconnect', function(data) {
      num--;
      console.log("Received Message: " + JSON.stringify(data));
      console.log('worker pid: ' + process.pid + ' clien disconnection num:' + num);
      /*
      process.send({
        cmd: 'client disconnect'
      });
      */

      if (roomSet[roomid] && roomSet[roomid][socket.id] && roomSet[roomid][socket.id].username) {
        console.log(roomSet[roomid][socket.id].username + ' quit');
        pub.publish(roomid, JSON.stringify({
          "event": 'broadcast_quit',
          "data": {
            username: roomSet[roomid][socket.id].username
          }
        }));
      }
      roomSet[roomid] && roomSet[roomid][socket.id] && (delete roomSet[roomid][socket.id]);

    });
  });

  /**
   * redis callback
   * @param  {[type]} channel [channel]
   * @param  {[type]} count   [count]  
   * @return {[type]}         [description]
   */
  sub.on("subscribe", function(channel, count) {
    console.log('worker pid: ' + process.pid + ' subscribe: ' + channel);
  });


  /**
   * [description]
   * @param  {[type]} channel  [description]
   * @param  {[type]} message
   * @return {[type]}          [description]
   */
  sub.on("message", function(channel, message) {
    console.log("message channel " + channel + ": " + message);
    //chanel is room id
    const jsonMessage = JSON.parse(message);

    console.log('json:', jsonMessage);
    //msg persistence
    const roomId = channel;
    const userName = jsonMessage.data.username;
    const avatar = jsonMessage.data.avatar;
    const msgText = jsonMessage.data.text;
    const type = jsonMessage.event;

    console.log("type....", type);
    if (type === "broadcast_say") {
      const msg = {
        room_id: roomId,
        useremail: userName,
        text: msgText,
        avatar: avatar
      };
      try {
        Message.saveChatRoomMessage(msg);
      } catch (err) {
        console.log(err);
      }
    }
    //ChatRoom
    if (type === "join") {
      try {
        ChatRoom.addUser(roomId, userName, avatar, () => {
          io.to(channel).emit('message', jsonMessage);
        });
      } catch (err) {
        console.log(err);
      }
    }

    if (type === "broadcast_quit") {
      try {
        const leaveType = jsonMessage.data.leavetype;
        if (leaveType === 'remove') {
          ChatRoom.deleteUser(roomId, userName, true);
        } else {
          ChatRoom.deleteUser(roomId, userName, false);
        }
      } catch (err) {
        console.log(err);
      }
    }
    if (type != 'join') {
      io.to(channel).emit('message', jsonMessage);
    }

  });


  io.listen(server);

  console.log('worker pid: ' + process.pid + ' listen port:' + port);
}