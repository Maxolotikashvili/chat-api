const app = require('express')();
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer, {
    cors: { origin: '*' }
});
require('dotenv').config();
const port = process.env.PORT || 3000;
let usersList = [];

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('user', (user) => {
        usersList.push({name: user, id: socket.id});
        io.emit('userlist', usersList);
    })
    
    socket.on('message', (message) => {
        const currentUser = usersList.find((user) => user.id === socket.id);

        if (message !== '') {
            io.emit('data', {user: currentUser.name, message: message, id: currentUser.id});
        } else {
            return;
        }
    });

    socket.on('disconnect', () => {
        console.log('a user disconnected!');
        usersList = [];
    });
});

httpServer.listen(port, () => console.log(`listening on port ${port}`));