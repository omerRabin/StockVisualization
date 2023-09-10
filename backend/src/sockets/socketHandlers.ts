import axios from 'axios';
import { Server } from 'socket.io';

import { realTimeStockData } from "../types";

const FINNHUB_QUOTE_ROUTE = 'https://finnhub.io/api/v1/stock/quote';

const fetchRealTimeStockData =async (io: Server, symbol: string) : Promise<void> => {
    const response = await axios.get<realTimeStockData>(FINNHUB_QUOTE_ROUTE, {
    params: {symbol}});
    
    try {
        io.emit('realTimeStockData', response.data);
    } catch (error) {
        console.error('Error fetching real-time stock data:', error);
        throw error;
    }
}

export {fetchRealTimeStockData}