const ChatConnectionHandler = require('./chatConnectionHandler.js');

// Handles the connection to an individual customer
class CustomerConnectionHandler extends ChatConnectionHandler {
  constructor (socket, messageRouter, onDisconnect) {
    super(socket, messageRouter, onDisconnect);
    // In this sample, we use the socket's unique id as a customer id.
    this.init(socket.id);
    this.attachHandlers();
  }

  init (customerId) {
    console.log('A user joined: ', this.socket.id);
    this.router._sendConnectionStatusToOperator(customerId)
  }

  attachHandlers () {
    this.socket.on('user message', (message) => {
      console.log('Received user message: ', message);
      this._gotCustomerInput(message);
    });
    this.socket.on('disconnect', () => {
      console.log('Customer disconnected');
      this.router._sendConnectionStatusToOperator(this.socket.id, true);
      this.onDisconnect();
    });
  }

  // Called on receipt of input from the customer
  _gotCustomerInput (msg) {
    // Look up this customer
    const user = this.router.store[this.socket.id];
    this.router._routeCustomer(msg, user, this.socket.id);
    this._respondToCustomer(msg, this.socket);

  }

  _respondToCustomer (response) {
    console.log('Sending response to customer:', response);
    this.socket.emit('user message', response);
    return Promise.resolve();
  }


}

module.exports = CustomerConnectionHandler;
