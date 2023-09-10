import axios from 'axios';

import { historicalStockData } from "../types";
import { RawCandleData, candleParameters } from '../interfaces';

const FINNHUB_CANDLE_ROUTE = 'https://finnhub.io/api/v1/stock/candle';

const fetchHistoricalStockData = async (parameters : candleParameters ) : Promise<historicalStockData> =>
{
    try
    {
        const response = await axios.get<RawCandleData>(FINNHUB_CANDLE_ROUTE, {
            params: {
              symbol: parameters.symbol,
              resolution: parameters.resolution,
              from: parameters.startTime,
              to: parameters.endTime,
              token: process.env.API_KEY,
            },
          });
        
        const historicalStockData : historicalStockData = {
            candlesClosedPricesList: response.data.c,
            candlesHighestPricesList: response.data.h,
            candlesLowestPricesList: response.data.l,
            candlesOpenPricesList: response.data.o,
            status: response.data.s,
            candlesTimestampList: response.data.t,
            candlesVolumeDataList: response.data.v
        }
        
        return historicalStockData;
    } catch(error) 
    {
        console.error('Error fetching historical stock data:', error);
        throw error;
    }
}

export {fetchHistoricalStockData}