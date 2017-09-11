'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _message = require('../models/message');

var _message2 = _interopRequireDefault(_message);

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Message = function () {
  function Message() {
    _classCallCheck(this, Message);
  }

  _createClass(Message, [{
    key: 'addChatRoomMessage',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
        var newMessage, message;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                console.log('req:', req.body);
                _context.prev = 1;

                if (req.body.room_id) {
                  _context.next = 6;
                  break;
                }

                throw new Error('chatroom id is required');

              case 6:
                if (req.body.useremail) {
                  _context.next = 8;
                  break;
                }

                throw new Error('useremail is required');

              case 8:
                _context.next = 15;
                break;

              case 10:
                _context.prev = 10;
                _context.t0 = _context['catch'](1);

                console.log('params error', _context.t0.message);
                res.send({
                  status: 0,
                  type: 'ERROR_PARAMS',
                  message: _context.t0.message
                });
                return _context.abrupt('return');

              case 15:
                _context.prev = 15;
                newMessage = {
                  room_id: req.body.id,
                  useremail: req.body.name,
                  text: req.body.text
                };
                message = new _message2.default(newMessage);
                _context.next = 20;
                return message.save();

              case 20:

                res.send({
                  status: 1,
                  sussess: 'Add ChatRoom Message Successfully',
                  roomDetail: message
                });

                _context.next = 27;
                break;

              case 23:
                _context.prev = 23;
                _context.t1 = _context['catch'](15);

                console.log('Add ChatRoom Message Failed');
                res.send({
                  status: 0,
                  type: 'ERROR_SERVER',
                  message: 'Add ChatRoom Message Failed'
                });

              case 27:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 10], [15, 23]]);
      }));

      function addChatRoomMessage(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
      }

      return addChatRoomMessage;
    }()
  }, {
    key: 'saveChatRoomMessage',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(msg) {
        var newMessage, message;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                console.log('save msg:', msg);
                _context2.prev = 1;

                if (msg.room_id) {
                  _context2.next = 6;
                  break;
                }

                throw new Error('chatroom id is required');

              case 6:
                if (msg.useremail) {
                  _context2.next = 8;
                  break;
                }

                throw new Error('useremail is required');

              case 8:
                _context2.next = 14;
                break;

              case 10:
                _context2.prev = 10;
                _context2.t0 = _context2['catch'](1);

                console.log('params error', _context2.t0.message);
                return _context2.abrupt('return');

              case 14:
                _context2.prev = 14;
                newMessage = {
                  room_id: msg.room_id,
                  useremail: msg.useremail,
                  text: msg.text
                };
                message = new _message2.default(newMessage);
                _context2.next = 19;
                return message.save();

              case 19:
                _context2.next = 24;
                break;

              case 21:
                _context2.prev = 21;
                _context2.t1 = _context2['catch'](14);

                console.log('Add ChatRoom Message Failed');

              case 24:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[1, 10], [14, 21]]);
      }));

      function saveChatRoomMessage(_x4) {
        return _ref2.apply(this, arguments);
      }

      return saveChatRoomMessage;
    }()
  }, {
    key: 'fetchRoomMsgList',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res, next) {
        var pageSize, page, roomId, messageList, avatarMap, count;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                console.log('req:', req.body);
                console.log('params:', req.params);
                console.log('query:', req.query);
                _context3.prev = 3;

                if (req.params.roomid) {
                  _context3.next = 8;
                  break;
                }

                throw new Error('chatroom id is required');

              case 8:
                if (!(!req.query.page && req.query.page != 0)) {
                  _context3.next = 10;
                  break;
                }

                throw new Error('page number is required');

              case 10:
                _context3.next = 17;
                break;

              case 12:
                _context3.prev = 12;
                _context3.t0 = _context3['catch'](3);

                console.log('params error', _context3.t0.message);
                res.send({
                  status: 0,
                  type: 'ERROR_PARAMS',
                  message: _context3.t0.message
                });
                return _context3.abrupt('return');

              case 17:
                _context3.prev = 17;
                pageSize = 10;
                page = parseInt(req.query.page);
                roomId = req.params.roomid;
                messageList = void 0;
                avatarMap = {};
                count = void 0;
                _context3.next = 26;
                return _message2.default.find({ room_id: roomId })
                // .skip(page * pageSize)
                // .limit(pageSize)
                .sort({ 'timestamp': 1 }).exec(function (err, msgs) {
                  messageList = msgs;
                });

              case 26:
                _context3.next = 28;
                return Promise.all(messageList.map(function (msg) {
                  // console.log("--0000-");
                  return _user2.default.findOne({ useremail: msg.useremail }, function (err, user) {
                    if (user) {
                      avatarMap[user.useremail] = user.avatar;
                    }
                    // console.log(currMsg);
                    return user;
                  });
                })).then(function (msgList) {
                  console.log("------avatarMap----");
                  // console.log(avatarMap);
                  // messageList = res;
                });

              case 28:
                _context3.next = 30;
                return _message2.default.count({ room_id: roomId }).exec(function (err, msgCount) {
                  count = msgCount;
                });

              case 30:

                res.send({
                  status: 1,
                  sussess: 'fetch Message List Successfully',
                  messageList: messageList,
                  count: count,
                  avatarMap: avatarMap
                });
                _context3.next = 37;
                break;

              case 33:
                _context3.prev = 33;
                _context3.t1 = _context3['catch'](17);

                console.log('fetch Message List Failed');
                res.send({
                  status: 0,
                  type: 'ERROR_SERVER',
                  message: 'fetch Message List Failed'
                });

              case 37:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[3, 12], [17, 33]]);
      }));

      function fetchRoomMsgList(_x5, _x6, _x7) {
        return _ref3.apply(this, arguments);
      }

      return fetchRoomMsgList;
    }()
  }]);

  return Message;
}();

exports.default = new Message();