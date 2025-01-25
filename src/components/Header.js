import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header style={{ padding: '1rem', backgroundColor: '#f5f5f5' }}>
      <nav>
        <Link to="/" style={{ margin: '0 1rem' }}>Home</Link>
        <Link to="/products" style={{ margin: '0 1rem' }}>Products</Link>
        <Link to="/cart" style={{ margin: '0 1rem' }}>Cart</Link>
      </nav>
    </header>
  );
};

export default Header;
