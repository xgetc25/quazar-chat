const micro = require('micro');
const fs = require('fs');
const path = require('path');

const document = path.join(__dirname, 'index.html');
const html = fs.readFileSync(document);
const MessageRouter = require('./messageRouter.js');

const server = micro(async (req, res) => {
  console.log('Serving index.html');
  res.end(html);
});

const io = require('socket.io')(server);

const messageRouter = new MessageRouter({
  userRoom: io.of('/user'),
  operatorRoom: io.of('/operator')
});

messageRouter.handleConnections();

server.listen(4000, () => console.log('Listening on localhost:4000'));
