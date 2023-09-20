import React from 'react';
import '../styles/navbar.css';
import { Search, Menu, Notification } from './';

const Navbar = () => {
  return (
    <div className='navbar'>
      <Menu />
      <Search />
      <Notification />
    </div>
  );
};

export { Navbar };
