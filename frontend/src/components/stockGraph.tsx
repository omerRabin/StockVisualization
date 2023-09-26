import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Ranges } from '../enums';
import { BasicLineChart } from './';
import { historicalStockData } from '../types';
import { useQuery } from 'react-query';
import axios from 'axios';

const SERVER_API = 'http://localhost:4567/api';

const getStockData = async (symbol: string, range: Ranges) => {
  const response = await axios.get(`${SERVER_API}/data/graph?symbol=${symbol}&range=${range}`);
  return response.data as historicalStockData[];
};

const StockGraph = () => {
  const { symbol = '' } = useParams(); // Provide a default value for symbol
  const [range, setRange] = useState(Ranges.WEEK);

  const { data: stockData = [], isLoading } = useQuery(
    ['stockData', symbol, range],
    () => getStockData(symbol, range),
    { enabled: false }
  );

  const labels = ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5'];

  const handleRangeChange = (newRange: Ranges) => {
    setRange(newRange);
  };

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h2 style={{ color: 'white' }}>{symbol} Stock Graph</h2>
          <div>
            <button onClick={() => handleRangeChange(Ranges.DAY)}>1 Day</button>
            <button onClick={() => handleRangeChange(Ranges.WEEK)}>1 Week</button>
            <button onClick={() => handleRangeChange(Ranges.MONTH)}>1 Month</button>
            <button onClick={() => handleRangeChange(Ranges.QUARTER_YEAR)}>3 Month</button>
            <button onClick={() => handleRangeChange(Ranges.HALF_YEAR)}>6 Month</button>
            <button onClick={() => handleRangeChange(Ranges.YEAR)}>1 Year</button>
          </div>
          {stockData && (
            <BasicLineChart
              data={[1, 2, 3]} // Replace with your stockData
              labels={labels}
              datasetLabel={`${symbol} Data`}
              canvasBackgroundColor='black'
            />
          )}
        </div>
      )}
    </>
  );
};

export { StockGraph };
