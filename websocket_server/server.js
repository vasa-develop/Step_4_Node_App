"use strict";
// Optional. You will see this name in eg. 'ps' or 'top' command
process.title = 'node-chat';
// Port where we'll run the websocket server
var webSocketsServerPort = 4000;
var ip = "52.90.188.133";
// websocket and http servers

var webSocketServer = require('../include/import_websocket.js').server;
var http = require('../include/import_http.js');


/**
 * Global variables
 */
// latest 100 messages
var history = [ ];
// list of currently connected clients (users)
var clients = [ ];

var certificate = "0x1158F15E74DCEc06AEAeEbA5b0EaA8461c73dB36";

//Encrption and decryption

var encrypt = require('../include/encdec.js');


/**
 * Helper function for escaping input strings
 */
function htmlEntities(str) {
  return String(str)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
// Array with some colors
var colors = [ 'red', 'green', 'blue', 'magenta', 'purple', 'plum', 'orange' ];
// ... in random order
colors.sort(function(a,b) { return Math.random() > 0.5; } );
/**
 * HTTP server
 */
var server = http.createServer(function(request, response) {
  // Not important for us. We're writing WebSocket server,
  // not HTTP server
});
server.listen(webSocketsServerPort, function() {
  console.log((new Date()) + " Server is listening on port "
      + webSocketsServerPort);
});
/**
 * WebSocket server
 */
var wsServer = new webSocketServer({
  // WebSocket server is tied to a HTTP server. WebSocket
  // request is just an enhanced HTTP request. For more info 
  // http://tools.ietf.org/html/rfc6455#page-6
  httpServer: server
});
// This callback function is called every time someone
// tries to connect to the WebSocket server
wsServer.on('request', function(request) {
  console.log((new Date()) + ' Connection from origin '
      + request.origin + '.');
  // accept connection - you should check 'request.origin' to
  // make sure that client is connecting from your website
  // (http://en.wikipedia.org/wiki/Same_origin_policy)
  var connection = request.accept(null, request.origin); 
  // we need to know client index to remove them on 'close' event
  var index = clients.push(connection) - 1;
  var userName = false;
  var userColor = false;
  console.log((new Date()) + ' Connection accepted.');
  var msg = index+"|"+ip+"|"+webSocketsServerPort+"|"+certificate;
  var msg = encrypt.encrypt(msg);
  connection.sendUTF(
        JSON.stringify({ type: 'info', data: msg} ));
  
  
  // send back chat history
  if (history.length > 0) {
    connection.sendUTF(
        JSON.stringify({ type: 'history', data: history} ));
  }
  // user sent some message
  connection.on('message', function(message) {

    var msg = JSON.parse(message.utf8Data);
    console.log("recieved user message: " + message);
//    console.log("message: "+JSON.parse(message.utf8Data).index);

    if (message.type === 'utf8') { // accept only text
    // first message sent by user is their name

    var socket_index = msg.index;
    var cert = msg.certificate;


    
      var json = JSON.stringify({ type:'approval', data: 'loggedin' });
      clients[socket_index].sendUTF(json);
    
   
    }
    else{
      console.log("message_type: "+message.type);
    }
  });
  // user disconnected
  connection.on('close', function(connection) {
    if (userName !== false && userColor !== false) {
      console.log((new Date()) + " Peer "
          + connection.remoteAddress + " disconnected.");
      // remove user from the list of connected clients
      clients.splice(index, 1);
      // push back user's color to be reused by another user
      colors.push(userColor);
    }
  });
});