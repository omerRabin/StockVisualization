import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { stockDetails } from './../types';
import { useQuery } from 'react-query';
import axios from 'axios';
import '../styles/search.css';

const SERVER_API = 'http://localhost:4567/api';

const getStockDetails = async () => {
  const response = await axios.get(`${SERVER_API}/data/stockDetails/stockData`);
  return response.data as stockDetails[];
};

const Search = () => {
  const [userInput, setUserInput] = useState<string>('');
  const navigate = useNavigate();

  const {
    data: fetchedStockDetails = [],
    isLoading,
    refetch,
  } = useQuery('stockDetails', getStockDetails, { enabled: false });

  const filteredOptions = useMemo(() => {
    if (userInput.trim() === '') {
      return [];
    }

    refetch();

    return fetchedStockDetails
      .filter((stock) => stock.symbol.toLowerCase().startsWith(userInput.toLowerCase()))
      .slice(0, 4);
  }, [userInput, fetchedStockDetails]);

  const handleOptionClick = (option: stockDetails) => {
    setUserInput('');
    navigate(`/markets/${option.symbol}`);
  };

  return (
    <div className='search'>
      <input
        type='text'
        placeholder='Search...'
        className='search-input'
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
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
