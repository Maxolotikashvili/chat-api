const app = require('express')();
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer, {
    cors: { origin: '*' }
});
require('dotenv').config();
const port = process.env.PORT || 3000;

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('message', (message) => {
        if (message !== '') {
            io.emit('message', message);
        } else {
            return;
        }
    });

    socket.on('disconnect', () => {
        console.log('a user disconnected!');
    });
});

httpServer.listen(port, () => console.log(`listening on port ${port}`));