const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(path.join(__dirname, 'client')));

let connectedUsers = 0;

io.on('connection', (socket) => {
    console.log(`User ${socket.id} connected`);
    connectedUsers++;
    io.emit('updateConnectedUsers', connectedUsers);

    socket.on('disconnect', () => {
        console.log(`User ${socket.id} disconnected`);
        connectedUsers--;
        io.emit('updateConnectedUsers', connectedUsers);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

setInterval(() => {
    io.emit('updateConnectedUsers', connectedUsers);
}, 5000);
