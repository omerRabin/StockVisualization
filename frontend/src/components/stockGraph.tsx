import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Ranges } from '../enums';
import { BasicLineChart } from './';
import { historicalStockData } from '../types';

const SERVER_API = 'http://localhost:4567/api';

const StockGraph = () => {
  const { symbol } = useParams();
  const [stockData, setStockData] = useState<historicalStockData[]>([]);
  const [range, setRange] = useState(Ranges.WEEK);

  useEffect(() => {
    // Fetch stock data for the symbol and range here
    const fetchStockData = async () => {
      try {
        debugger;
        const response = await axios.get(`${SERVER_API}/data/graph?symbol=${symbol}&range=${range}`);
        setStockData(response.data);
      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
    };

    fetchStockData();
  }, [symbol, range]);

  const labels = ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5'];

  // Handle range change
  const handleRangeChange = (newRange: Ranges | ((prevState: Ranges) => Ranges)) => {
    setRange(newRange);
  };

  return (
    <div>
      <h2>{symbol} Stock Graph</h2>
      <div>
        {/* Add controls to change the range */}
        <button onClick={() => handleRangeChange(Ranges.DAY)}>1 Day</button>
        <button onClick={() => handleRangeChange(Ranges.WEEK)}>1 Week</button>
        <button onClick={() => handleRangeChange(Ranges.MONTH)}>1 Month</button>
        <button onClick={() => handleRangeChange(Ranges.QUARTER_YEAR)}>3 Month</button>
        <button onClick={() => handleRangeChange(Ranges.HALF_YEAR)}>6 Month</button>
        <button onClick={() => handleRangeChange(Ranges.YEAR)}>1 Year</button>
      </div>
      <BasicLineChart
        data={[1, 2, 3]} // choose how to take the array of points from stockData state
        labels={labels}
        datasetLabel={`${symbol} Data`}
        canvasBackgroundColor='#ffffff'
      />
    </div>
  );
};

export { StockGraph };
