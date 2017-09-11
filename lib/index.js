import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import socket from './socket'
import db from './mongodb/db.js';
import router from './router/chatroom'
import path from 'path';

let app = express();
let server = http.createServer(app);

let port = process.env.PORT || 3000;

app.all('*', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Credentials", true); //可以带cookies
  res.header("X-Powered-By", '3.2.1')
  if (req.method == 'OPTIONS') {
    res.send(200);
  } else {
    next();
  }
});

// parse application/json 
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', function(req, res) {
  // res.sendFile(path.join(__dirname + '/public/index.html'));
  // console.log();
  // res.sendFile('./public/index.html');
  res.sendFile(path.join(__dirname, 'client', 'index.html'));

  // res.send(__dirname);
});

app.use('/', router);

app.use((err, req, res, next) => {
  res.status(404).send('Could not find router ...');
});

socket(server, port)

server.listen(port);