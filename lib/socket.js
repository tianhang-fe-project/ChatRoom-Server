import SocketIO from 'socket.io';
import redis from 'redis';

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

      socket.join(roomid); //加入房间
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

    socket.on('say', function(data) {
      console.log("Received Message: " + data.text);
      pub.publish(roomid, JSON.stringify({
        "event": 'broadcast_say',
        "data": {
          username: roomSet[roomid][socket.id].username,
          text: data.text
        }
      }));
    });

    socket.on('roommsg', function(data) {
      console.log("Received Message: " + data.text);
      pub.publish(roomid, JSON.stringify({
        "event": 'broadcast_say',
        "data": {
          username: roomSet[roomid][socket.id].username,
          text: data.text
        }
      }));
    });


    socket.on('disconnect', function() {
      num--;
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
   * 订阅redis 回调
   * @param  {[type]} channel [频道]
   * @param  {[type]} count   [数量]  
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

    io.to(channel).emit('message', JSON.parse(message));
  });



  io.listen(server);

  console.log('worker pid: ' + process.pid + ' listen port:' + port);
}