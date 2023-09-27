import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Ranges } from '../enums';
import { BasicLineChart } from './';
import '../styles/stockGraph.css';
import axios from 'axios';
import { useQuery, useQueryClient } from 'react-query';

const SERVER_API = 'http://localhost:4567/api';

const rangeOptions = [
  { value: Ranges.DAY, label: '1 Day' },
  { value: Ranges.WEEK, label: '1 Week' },
  { value: Ranges.MONTH, label: '1 Month' },
  { value: Ranges.QUARTER_YEAR, label: '3 Month' },
  { value: Ranges.HALF_YEAR, label: '6 Month' },
  { value: Ranges.YEAR, label: '1 Year' },
];

const fetchStockData = async (symbol: string, selectedRange: Ranges) => {
  const response = await axios.get(`${SERVER_API}/data/graph?symbol=${symbol}&range=${selectedRange}`);
  return response.data;
};

const StockGraph = () => {
  const { symbol = '' } = useParams();
  const [selectedRange, setSelectedRange] = useState<Ranges>(Ranges.WEEK); // Specify the type of selectedRange

  const labels = ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5'];

  const queryClient = useQueryClient(); // Get the query client

  const {
    data: stockData,
    isLoading,
    isError,
  } = useQuery(['stockData', symbol, selectedRange], () => fetchStockData(symbol, selectedRange), {
    initialData: queryClient.getQueryData(['stockData', symbol, selectedRange]),
  });

  const handleRangeChange = (newRange: Ranges) => {
    // Specify the type of newRange
    setSelectedRange(newRange);
    queryClient.invalidateQueries(['stockData', symbol, newRange]);
  };

  return (
    <div className='temp-column'>
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Error fetching stock data</p>
      ) : (
        <div className='stock-graph-container'>
          <h2 className='stock-graph-title'>{symbol} Stock Graph</h2>
          {stockData && (
            <BasicLineChart
              data={stockData.candlesClosedPricesList}
              labels={labels}
              datasetLabel={`${symbol} Data`}
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
