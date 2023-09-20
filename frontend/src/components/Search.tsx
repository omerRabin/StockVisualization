import React, { useState, useEffect } from 'react';
import '../styles/search.css';
import axios from 'axios';
import { stockDetails } from './../types';

const SERVER_API = 'http://localhost:4567/api';

const Search = () => {
  const [userInput, setUserInput] = useState<string>('');
  const [fetchedStockDetails, setFetchedStockDetails] = useState<stockDetails[]>([]);
  const [filteredOptions, setFilteredOptions] = useState<stockDetails[]>([]);

  useEffect(() => {
    const getStockDetails = async () => {
      try {
        const response = await axios.get(`${SERVER_API}/data/stockDetails/stockData`);
        return response.data as stockDetails[];
      } catch (error) {
        // Handle errors here
        console.error('Error fetching stock details:', error);
        return [];
      }
    };

    const fetchData = async () => {
      const stockDetailsData = await getStockDetails();
      setFetchedStockDetails(stockDetailsData);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (userInput.trim() === '') {
      // If the input is empty or contains only whitespace, clear options
      setFilteredOptions([]);
      return;
    }

    // Filter the fetched stock details based on user input
    const filteredStockDetails = fetchedStockDetails.filter((stock) =>
      stock.symbol.toLowerCase().startsWith(userInput.toLowerCase())
    );

    // Display up to 4 filtered options
    const limitedOptions = filteredStockDetails.slice(0, 4);

    setFilteredOptions(limitedOptions);
  }, [userInput, fetchedStockDetails]);

  // Handle user input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  // Handle option selection
  const handleOptionClick = (option: stockDetails) => {
    setUserInput(option.symbol);
    setFilteredOptions([]);
  };

  return (
    <div className='search'>
      <input
        type='text'
        placeholder='Search...'
        className='search-input'
        value={userInput}
        onChange={handleInputChange}
      />
      <i className='fas fa-search search-icon'></i>
      {filteredOptions.length > 0 && (
        <div className='options-container'>
          {filteredOptions.map((option, index) => (
            <div key={index} onClick={() => handleOptionClick(option)} className='option-item'>
              <div className='symbol'> {option.symbol} </div>
              <div className='company-name'> {option.companyName} </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export { Search };
