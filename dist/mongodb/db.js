'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _configLite = require('config-lite');

var _configLite2 = _interopRequireDefault(_configLite);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.connect(_configLite2.default.url, { server: { auto_reconnect: true } });
_mongoose2.default.Promise = global.Promise;

var db = _mongoose2.default.connection;

db.once('open', function () {
  console.log('connenct DB successfully !');
});

db.on('error', function (error) {
  console.error('Error in MongoDb connection: ' + error);
  _mongoose2.default.disconnect();
});

db.on('close', function () {
  console.log('DB disconnected, reconnecting the DB ...');
  _mongoose2.default.connect(_configLite2.default.url, { server: { auto_reconnect: true } });
});

exports.default = db;