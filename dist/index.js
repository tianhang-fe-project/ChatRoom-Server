'use strict';

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _socket = require('./socket');

var _socket2 = _interopRequireDefault(_socket);

var _db = require('./mongodb/db.js');

var _db2 = _interopRequireDefault(_db);

var _chatroom = require('./router/chatroom');

var _chatroom2 = _interopRequireDefault(_chatroom);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var server = _http2.default.createServer(app);

var port = process.env.PORT || 8080;

app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Credentials", true); //可以带cookies
  res.header("X-Powered-By", '3.2.1');
  if (req.method == 'OPTIONS') {
    res.send(200);
  } else {
    next();
  }
});

// parse application/json 
app.use(_bodyParser2.default.json());
app.use(_express2.default.static(_path2.default.join(__dirname, 'public')));

app.get('/', function (req, res) {
  // res.sendFile(path.join(__dirname + '/public/index.html'));
  // console.log();
  // res.sendFile('./public/index.html');
  res.sendFile(_path2.default.join(__dirname, 'public', 'index.html'));

  // res.send(__dirname);
});

app.use('/', _chatroom2.default);

app.use(function (err, req, res, next) {
  res.status(404).send('Could not find router ...');
});

(0, _socket2.default)(server, port);

server.listen(port);