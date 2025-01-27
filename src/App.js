import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import ProductsListingPage from './components/ProductsListingPage';
import ShopCartPage from './components/ShopCartPage';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/products" element={<ProductsListingPage />} />
        <Route path="/cart" element={<ShopCartPage />} />
      </Routes>
    </Router>
  );
};

export default App;
