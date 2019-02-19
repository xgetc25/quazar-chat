const ChatConnectionHandler = require('./chatConnectionHandler.js');

// Handles the connection to an individual operator
class OperatorConnectionHandler extends ChatConnectionHandler {
  constructor (socket, messageRouter, onDisconnect) {
    super(socket, messageRouter, onDisconnect);
    this.init(socket.id);
    this.attachHandlers();
  }

  init (operatorId) {
    console.log('An operator joined: ', this.socket.id);
  }

  attachHandlers () {
    this.socket.on('operator message', (message) => {
      console.log('Received operator message:', message);
      this._gotOperatorInput(message);
    });
    this.socket.on('disconnect', () => {
      console.log('operator disconnected');
      this.onDisconnect();
    });
  }

  // Called on receipt of input from the operator
  _gotOperatorInput (data) {
    const { user, message } = data;
    console.log('Got operator input: ', data);
    this.router._relayOperatorMessage(data);
    this.router.store[user]._respondToCustomer({user, message, isOperator: true})
  }


}

module.exports = OperatorConnectionHandler;
