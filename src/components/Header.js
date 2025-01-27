import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Header.css';

const Header = () => {
  const cart = useSelector((state) => state.cart.items);

  // Calculate the total number of items in the cart
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="header">
      <nav className="nav">
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/cart">Cart</Link>
        </div>
        <div className="cart-icon">
          🛒 Cart ({totalItems})
        </div>
      </nav>
    </header>
  );
};

export default Header;
