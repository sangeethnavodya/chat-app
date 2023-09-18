const fastify = require('fastify')();
const httpServer = require('http').createServer(fastify);
const io = require('socket.io')(httpServer, {
  cors: {
    origin: 'http://localhost:3000', // Replace with the URL of your frontend
    methods: ['GET', 'POST'], // Add the HTTP methods you want to allow
    credentials: true, // Set this to true if you're using cookies or authentication
  },
});

const PORT = process.env.PORT || 3001;

fastify.get('/', (req, res) => {
  res.send({ message: 'Welcome to the Fastify WebSocket server' });
});

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });

  // Handle chat events here
  socket.on('message', (message) => {
    console.log(`Received message: ${message}`);
    // Broadcast the message to all connected clients
    io.emit('message', message);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
