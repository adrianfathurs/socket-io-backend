// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors()); 

const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

io.on('connection', (socket) => {
    console.log('A client connected');

    // Handle events from client
    socket.on('message', (data) => {
        console.log('Received message from client:', data);
        // Broadcast the message to all clients
        io.emit('message', data);
    });

    // Send a message to the client
    socket.emit('serverMessage', 'Hello from the server');

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

app.get('/', (request, response)=>{ response.send("Cobaaa");})
server.listen(3001, () => {
    console.log('Socket.IO server is running on port 3001');
});
