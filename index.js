var express = require('express');
const { Socket } = require('socket.io');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

server.listen(3000);

app.get('/',function(request,respons)
{
    respons.sendFile(__dirname + '/index.html');
}
);

users = [];
connections = [];

io.sockets.on('connection', function(socket) {
    console.log("connected");
    connections.push(socket);
    
    socket.on('disconnect', function(data){
    console.log("disconnected");
    connections.splice(connections.indexOf(socket), 1)
    });
    socket.on('send_mess', function(data){
        io.sockets.emit('send_mess', {msg:data});
    });
});