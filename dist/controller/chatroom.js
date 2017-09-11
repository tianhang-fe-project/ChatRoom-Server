'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _chatroom = require('../models/chatroom');

var _chatroom2 = _interopRequireDefault(_chatroom);

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ChatRoom = function () {
  function ChatRoom() {
    _classCallCheck(this, ChatRoom);

    this.addChatRoom = this.addChatRoom.bind(this);
    this.fetchRoomList = this.fetchRoomList.bind(this);
  }

  _createClass(ChatRoom, [{
    key: 'addChatRoom',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
        var newRoom, chatroom;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                console.log('req:', req.body);
                _context.prev = 1;

                if (req.body.admin) {
                  _context.next = 6;
                  break;
                }

                throw new Error('chatroom admin is required');

              case 6:
                if (req.body.id) {
                  _context.next = 10;
                  break;
                }

                throw new Error('chatroom id is required');

              case 10:
                if (req.body.name) {
                  _context.next = 12;
                  break;
                }

                throw new Error('chatroom name is required');

              case 12:
                _context.next = 19;
                break;

              case 14:
                _context.prev = 14;
                _context.t0 = _context['catch'](1);

                console.log('params error', _context.t0.message);
                res.send({
                  status: 0,
                  type: 'ERROR_PARAMS',
                  message: _context.t0.message
                });
                return _context.abrupt('return');

              case 19:
                _context.prev = 19;
                newRoom = {
                  room_id: req.body.id,
                  name: req.body.name,
                  admin: req.body.admin
                };
                chatroom = new _chatroom2.default(newRoom);
                _context.next = 24;
                return chatroom.save();

              case 24:

                res.send({
                  status: 1,
                  sussess: 'Add ChatRoom Successfully',
                  roomDetail: newRoom
                });

                _context.next = 31;
                break;

              case 27:
                _context.prev = 27;
                _context.t1 = _context['catch'](19);

                console.log('Add ChatRoom Failed');
                res.send({
                  status: 0,
                  type: 'ERROR_SERVER',
                  message: 'Add ChatRoom Failed'
                });

              case 31:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 14], [19, 27]]);
      }));

      function addChatRoom(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
      }

      return addChatRoom;
    }()
  }, {
    key: 'fetchRoomList',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {
        var roomList;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                roomList = void 0;
                _context2.next = 3;
                return _chatroom2.default.find(function (err, rooms) {
                  // console.log(rooms);
                  roomList = rooms;
                });

              case 3:
                res.send({
                  status: 1,
                  sussess: 'fetch ChatRoom List Successfully',
                  roomDetail: roomList
                });

              case 4:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function fetchRoomList(_x4, _x5, _x6) {
        return _ref2.apply(this, arguments);
      }

      return fetchRoomList;
    }()
  }, {
    key: 'fetchRoomUserList',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res, next) {
        var roomId, userlist;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;

                if (req.params.roomid) {
                  _context3.next = 3;
                  break;
                }

                throw new Error('chatroom id is required');

              case 3:
                _context3.next = 10;
                break;

              case 5:
                _context3.prev = 5;
                _context3.t0 = _context3['catch'](0);

                console.log('params error', _context3.t0.message);
                res.send({
                  status: 0,
                  type: 'ERROR_PARAMS',
                  message: _context3.t0.message
                });
                return _context3.abrupt('return');

              case 10:
                _context3.prev = 10;
                roomId = req.params.roomid;
                userlist = void 0;
                _context3.next = 15;
                return _chatroom2.default.findOne({ room_id: roomId }).select('users -_id')
                // .sort({ 'timestamp': 1 })
                .exec(function (err, data) {
                  // console.log(data);
                  data = data || {};
                  userlist = data.users;
                });

              case 15:
                _context3.next = 17;
                return Promise.all(userlist.map(function (email) {
                  return _user2.default.findOne({ useremail: email }, function (err, user) {
                    return user;
                  });
                })).then(function (res) {
                  console.log("------user list-----");
                  // console.log(res);
                  userlist = res;
                });

              case 17:
                // console.log("------user list-----");
                // console.log(userlist);

                res.send({
                  status: 1,
                  sussess: 'fetch User List Successfully',
                  userList: userlist
                });
                _context3.next = 24;
                break;

              case 20:
                _context3.prev = 20;
                _context3.t1 = _context3['catch'](10);

                console.log('fetch User List Failed');
                res.send({
                  status: 0,
                  type: 'ERROR_SERVER',
                  message: 'fetch User List Failed'
                });

              case 24:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 5], [10, 20]]);
      }));

      function fetchRoomUserList(_x7, _x8, _x9) {
        return _ref3.apply(this, arguments);
      }

      return fetchRoomUserList;
    }()
  }, {
    key: 'fetchRoomInfo',
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res, next) {
        var roomId, roomInfo;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;

                if (req.params.roomid) {
                  _context4.next = 3;
                  break;
                }

                throw new Error('chatroom id is required');

              case 3:
                _context4.next = 10;
                break;

              case 5:
                _context4.prev = 5;
                _context4.t0 = _context4['catch'](0);

                console.log('params error', _context4.t0.message);
                res.send({
                  status: 0,
                  type: 'ERROR_PARAMS',
                  message: _context4.t0.message
                });
                return _context4.abrupt('return');

              case 10:
                _context4.prev = 10;
                roomId = req.params.roomid;
                roomInfo = void 0;
                _context4.next = 15;
                return _chatroom2.default.findOne({ room_id: roomId }).exec(function (err, data) {
                  // console.log(data);
                  roomInfo = data;
                });

              case 15:

                res.send({
                  status: 1,
                  sussess: 'fetch ChatRoom Successfully',
                  roomInfo: roomInfo
                });
                _context4.next = 22;
                break;

              case 18:
                _context4.prev = 18;
                _context4.t1 = _context4['catch'](10);

                console.log('fetch ChatRoom Failed');
                res.send({
                  status: 0,
                  type: 'ERROR_SERVER',
                  message: 'fetch ChatRoom Failed'
                });

              case 22:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this, [[0, 5], [10, 18]]);
      }));

      function fetchRoomInfo(_x10, _x11, _x12) {
        return _ref4.apply(this, arguments);
      }

      return fetchRoomInfo;
    }()
  }, {
    key: 'addUser',
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(roomid, email, avatar, cb) {
        var query, update, options;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return _chatroom2.default.update({ room_id: roomid }, { $addToSet: { "users": email } }, function (err, model) {
                  // console.log(err);
                  // console.log(model);
                  cb();
                });

              case 2:
                query = { useremail: email }, update = {
                  useremail: email,
                  avatar: avatar
                }, options = { upsert: true, new: true, setDefaultsOnInsert: true };

                //add user to user list(avatar)

                _context5.next = 5;
                return _user2.default.findOneAndUpdate(query, update, options, function (error, result) {
                  if (error) return;
                  // console.log(result);
                });

              case 5:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function addUser(_x13, _x14, _x15, _x16) {
        return _ref5.apply(this, arguments);
      }

      return addUser;
    }()
  }, {
    key: 'deleteUser',
    value: function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(roomid, email, black) {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return _chatroom2.default.update({ room_id: roomid }, { $pull: { "users": email } }, function (err, model) {
                  console.log(err);
                  // console.log(model);
                });

              case 2:
                if (!black) {
                  _context6.next = 7;
                  break;
                }

                //add user to chatroom blcklist
                console.log("--blacklist----");
                console.log(email);
                _context6.next = 7;
                return _chatroom2.default.update({ room_id: roomid }, { $addToSet: { "blacklist": email } }, function (err, model) {
                  console.log(err);
                  // console.log(model);
                });

              case 7:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function deleteUser(_x17, _x18, _x19) {
        return _ref6.apply(this, arguments);
      }

      return deleteUser;
    }()
  }, {
    key: 'fetchBlacklist',
    value: function () {
      var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res, next) {
        var roomId, blacklist;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.prev = 0;

                if (req.params.roomid) {
                  _context7.next = 3;
                  break;
                }

                throw new Error('chatroom id is required');

              case 3:
                _context7.next = 10;
                break;

              case 5:
                _context7.prev = 5;
                _context7.t0 = _context7['catch'](0);

                console.log('params error', _context7.t0.message);
                res.send({
                  status: 0,
                  type: 'ERROR_PARAMS',
                  message: _context7.t0.message
                });
                return _context7.abrupt('return');

              case 10:
                _context7.prev = 10;
                roomId = req.params.roomid;
                blacklist = void 0;
                _context7.next = 15;
                return _chatroom2.default.findOne({ room_id: roomId }).select('blacklist -_id').exec(function (err, data) {
                  console.log(data);
                  blacklist = data;
                });

              case 15:
                res.send({
                  status: 1,
                  sussess: 'fetch blacklist Successfully',
                  blacklist: blacklist
                });
                _context7.next = 22;
                break;

              case 18:
                _context7.prev = 18;
                _context7.t1 = _context7['catch'](10);

                console.log('fetch blacklist Failed');
                res.send({
                  status: 0,
                  type: 'ERROR_SERVER',
                  message: 'fetch blacklist Failed'
                });

              case 22:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this, [[0, 5], [10, 18]]);
      }));

      function fetchBlacklist(_x20, _x21, _x22) {
        return _ref7.apply(this, arguments);
      }

      return fetchBlacklist;
    }()
  }]);

  return ChatRoom;
}();

exports.default = new ChatRoom();