import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { fetchRealTimeStockData } from './src/sockets';
import cors from 'cors';
import { mainRouter } from './src/routes';

require('dotenv').config();

const app = express();
const server = http.createServer(app);
const allowedOrigins = ['http://localhost:3000'];
const io = new Server(server, { cors: { origin: allowedOrigins } });

app.use(cors());
app.set('origins', 'http://localhost:3000');

app.use(mainRouter);

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('realTimeStockData', async (symbol) => {
    await fetchRealTimeStockData(io, symbol);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(4567, () => {
  console.log('Server is running on port 4567');
});
