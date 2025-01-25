import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import ProductsListingPage from './components/ProductsListingPage';
import ShopCartPage from './components/ShopCartPage';

const App = () => {
  // State to manage the cart
  const [cart, setCart] = useState([]);

  // Function to add an item to the cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/products"
          element={<ProductsListingPage addToCart={addToCart} />}
        />
        <Route path="/cart" element={<ShopCartPage cart={cart} />} />
      </Routes>
    </Router>
  );
};

export default App;
