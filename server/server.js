// server.js
const app = require('http').createServer();
const io = require('socket.io')(app, {
  cors: {
    origin: '*',
  }
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('message', (message) => {
    console.log('message: ' + message);
    console.log(message)
    io.emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const PORT = 7397;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
