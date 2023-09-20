import express from 'express';
import { mainRouter } from './src/routes';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import { fetchRealTimeStockData } from './src/sockets';


require('dotenv').config();

const app = express();
app.use(cors());
const port = process.env.PORT || 4567;

app.use(mainRouter);

const server = http.createServer(app);
const io = new Server(server);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

io.on('connection', (socket) => {
    console.log('A client connected');

    socket.on('realTimeStockData', (symbol) => {
        fetchRealTimeStockData(io, symbol);
    });

    socket.on('disconnect', () => {
        console.log('A client disconnected');
    });
});