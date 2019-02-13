// Get dependencies
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
var cors = require('cors');
// Get gist route
const api = require('./server/routes/api');
const app = express();
app.use(cors());
/**
 * Create HTTP server.
 */

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Set our api routes
app.use('/api', api);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);


/**
 * Listen on provided port, on all network interfaces.
 */
var appServer = app.listen(port, () => console.log(`API running on localhost:${port}`));
// Socket.io for real time communication
var io = require('socket.io').listen(appServer);

/**
 * Socket events
 */
io.sockets.on('connection', function(socket){
  console.log('Socket connected');
  // Socket event for gist created
  socket.on('gistSaved', function(gistSaved){
    io.emit('gistSaved', gistSaved);
  });

  // Socket event for gist updated
  socket.on('gistUpdated', function(gistUpdated){
    io.emit('gistUpdated', gistUpdated);
  });
});
