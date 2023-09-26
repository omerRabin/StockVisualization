import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Ranges } from '../enums';
import { BasicLineChart } from './';
import { historicalStockData } from '../types';
import { useQuery } from 'react-query';
import '../styles/stockGraph.css';
import axios from 'axios';

const SERVER_API = 'http://localhost:4567/api';

const getStockData = async (symbol: string, range: Ranges) => {
  const response = await axios.get(`${SERVER_API}/data/graph?symbol=${symbol}&range=${range}`);
  return response.data as historicalStockData[];
};

const StockGraph = () => {
  const { symbol = '' } = useParams();
  const [range, setRange] = useState(Ranges.WEEK);

  const { data: stockData = [], isLoading } = useQuery(
    ['stockData', symbol, range],
    () => getStockData(symbol, range),
    { enabled: false }
  );

  const labels = ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label5'];

  const handleRangeChange = (newRange: Ranges) => {
    setRange(newRange);
  };

  return (
    <div className='temp-column'>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className='stock-graph-container'>
          <h2 className='stock-graph-title'>{symbol} Stock Graph</h2>
          {stockData && (
            <BasicLineChart
              data={[1, 2, 3]} // Replace with your stockData
              labels={labels}
              datasetLabel={`${symbol} Data`}
              canvasBackgroundColor='black'
            />
          )}
          <div className='range-selection-containter'>
            <button className='range-selection' onClick={() => handleRangeChange(Ranges.DAY)}>
              1 Day
            </button>
            <button className='range-selection' onClick={() => handleRangeChange(Ranges.WEEK)}>
              1 Week
            </button>
            <button className='range-selection' onClick={() => handleRangeChange(Ranges.MONTH)}>
              1 Month
            </button>
            <button className='range-selection' onClick={() => handleRangeChange(Ranges.QUARTER_YEAR)}>
              3 Month
            </button>
            <button className='range-selection' onClick={() => handleRangeChange(Ranges.HALF_YEAR)}>
              6 Month
            </button>
            <button className='range-selection' onClick={() => handleRangeChange(Ranges.YEAR)}>
              1 Year
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export { StockGraph };
