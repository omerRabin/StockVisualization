import React from 'react';
import { Navbar } from './components';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { StockGraph, HomePage } from './components';
import './styles/app.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import ReactDOM from 'react-dom';

// Create a new instance of QueryClient
const queryClient = new QueryClient();

function App() {
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
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
      </QueryClientProvider>
    </Router>
  );
}

// If you want to use the React Query Devtools in development mode
if (process.env.NODE_ENV === 'development') {
  ReactDOM.render(<ReactQueryDevtools />, document.getElementById('root'));
}

export default App;
