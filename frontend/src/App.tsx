import React from 'react';
import { Navbar } from './components';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { StockGraph, HomePage } from './components';
import './styles/app.css';

function App() {
  return (
    <Router>
      <div>
        <header>
          <center>
            <Navbar />
          </center>
        </header>
      </div>
      <Routes>
        <Route path='/markets/:symbol' element={<StockGraph />} />
        <Route path='/home' element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
