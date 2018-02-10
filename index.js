var http = require('http');
var fs   = require('fs');
var path = require('path');
var mime = {
  ".html": "text/html",
  ".css":  "text/css",
  ".js":  "text/javascript",
  // 読み取りたいMIMEタイプはここに追記
};
var socketio = require("socket.io");

var http_server = new http.createServer(function(req, res) {

  if (req.url == '/') {
    filePath = '/index.html';
  } else {
    filePath = req.url;
  }
  var fullPath = __dirname + filePath;

  res.writeHead(200, {"Content-Type": mime[path.extname(fullPath)] || "text/plain"});
  fs.readFile(fullPath, function(err, data) {
    if (err) {
      // エラー時の応答
    } else {
      res.end(data, 'UTF-8');
    }
  });
}).listen(3000);
console.log('Server running at http://localhost:3000/');


var io = socketio.listen(http_server);
io.sockets.on("connection", function (socket) {
 
  // メッセージ送信（送信者にも送られる）
  socket.on("C_to_S_message", function (data) {
    io.sockets.emit("S_to_C_message", {value:data.value});
  });
 
  // ブロードキャスト（送信者以外の全員に送信）
  socket.on("C_to_S_broadcast", function (data) {
    socket.broadcast.emit("S_to_C_message", {value:data.value});
  });
 
  // 切断したときに送信
  socket.on("disconnect", function () {
  io.sockets.emit("S_to_C_message", {value:"user disconnected"});
  });
});