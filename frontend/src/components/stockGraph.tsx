import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Ranges } from '../enums';
import { BasicLineChart } from '.';
import '../styles/stockGraph.css';
import axios from 'axios';
import { io } from 'socket.io-client';
import { useQuery, useQueryClient } from 'react-query';

const SERVER_URL = 'http://localhost:4567';

const rangeOptions = [
  { value: Ranges.DAY, label: '1 Day' },
  { value: Ranges.WEEK, label: '1 Week' },
  { value: Ranges.MONTH, label: '1 Month' },
  { value: Ranges.QUARTER_YEAR, label: '3 Month' },
  { value: Ranges.HALF_YEAR, label: '6 Month' },
  { value: Ranges.YEAR, label: '1 Year' },
];

const fetchStockData = async (symbol: string, selectedRange: Ranges) => {
  const response = await axios.get(`${SERVER_URL}/api/data/graph?symbol=${symbol}&range=${selectedRange}`);
  return response.data;
};

const StockGraph = () => {
  const { symbol = '' } = useParams();
  const queryClient = useQueryClient();
  const [selectedRange, setSelectedRange] = useState<Ranges>(Ranges.WEEK);
  const [currentPrice, setCurrentPrice] = useState(Number || null);

  const socket = io(SERVER_URL, { path: '/socket.io', query: { symbol } });

  useEffect(() => {
    const handleRealTimeStockData = (newPrice: number) => {
      setCurrentPrice(newPrice);
    };
    socket.on('realTimeStockData', handleRealTimeStockData);
    return () => {
      socket.off('realTimeStockData', handleRealTimeStockData);
    };
  }, [symbol]);

  const {
    data: stockData,
    isLoading,
    isError,
  } = useQuery(['stockData', symbol, selectedRange], () => fetchStockData(symbol, selectedRange), {
    initialData: queryClient.getQueryData(['stockData', symbol, selectedRange]),
  });

  const handleRangeChange = (newRange: Ranges) => {
    setSelectedRange(newRange);
    queryClient.invalidateQueries(['stockData', symbol, newRange]);
  };

  useEffect(() => {
    setSelectedRange(Ranges.WEEK);
  }, [symbol]);

  return (
    <div className='temp-column'>
      {isLoading ? (
        <p className='loading'>Loading...</p>
      ) : isError ? (
        <p>Error fetching stock data</p>
      ) : (
        <div className='stock-graph-container'>
          <h2 className='stock-graph-title'>{symbol} Stock Graph</h2>
          <div className='stock-info'>
            <div className='current-price-label'>{currentPrice}</div>
          </div>
          {stockData && (
            <BasicLineChart
              data={stockData.candlesOpenPricesList}
              labels={stockData.candlesTimestampList}
              datasetLabel={`${symbol}`}
              canvasBackgroundColor='black'
            />
          )}
          <div className='range-selection-container'>
            {rangeOptions.map((option) => (
              <button
                key={option.value}
                className={`range-selection ${selectedRange === option.value ? 'selected' : ''}`}
                onClick={() => handleRangeChange(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export { StockGraph };
