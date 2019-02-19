
const UserConnectionHandler = require('./customerConnectionHandler.js');
const OperatorConnectionHandler = require('./operatorConnectionHandler.js');

// Routes messages between connected customers, operators and Dialogflow agent
class MessageRouter {
  constructor ({ userRoom, operatorRoom }) {
    this.store = {};
    this.userRoom = userRoom;
    this.operatorRoom = operatorRoom;

  }

  // Attach event handlers and begin handling connections
  handleConnections () {
    this.userRoom.on('connection', this._handleCustomerConnection.bind(this));
    this.operatorRoom.on('connection', this._handleOperatorConnection.bind(this));
  }

  // Creates an object that stores a customer connection and has
  // the ability to delete itself when the customer disconnects
  _handleCustomerConnection (socket) {
    const onDisconnect = () => {
      delete this.store[socket.id];
    };
    this.store[socket.id] = new UserConnectionHandler(socket, this, onDisconnect);
  }

  // Same as above, but for operator connections
  _handleOperatorConnection (socket) {
    const onDisconnect = () => {
      delete this.store[socket.id];
    };
    this.store[socket.id] = new OperatorConnectionHandler(socket, this, onDisconnect);
  }

  _sendConnectionStatusToOperator (customerId, disconnected) {
    console.log('Sending customer id to any operators');
    const status = disconnected
      ? 'user disconnected'
      : 'user connected';
    this.operatorRoom.emit(status, customerId);
  }


  _routeCustomer (message, customer, customerId) {
    this.operatorRoom.emit('user message', this._operatorMessageObject(customer.id, message));
  }


  _relayOperatorMessage (data) {
    this.operatorRoom.emit('operator message', data);
  }

  // Factory method to create message objects in the format expected by the operator client
  _operatorMessageObject (customerId, utterance, isAgentResponse) {
    return {
      customerId: customerId,
      message: utterance
    };
  }



}

module.exports = MessageRouter;
