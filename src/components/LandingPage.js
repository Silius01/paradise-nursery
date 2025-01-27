import React from 'react';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div
      className="landing-page"
      style={{
        backgroundImage: "url('/background.jpg')",
      }}
    >
      <h1>Paradise Nursery</h1>
      <div className="company-description">
        <p>
          <strong>Paradise Nursery</strong> is dedicated to bringing the beauty of nature into your home. 
          We specialize in a carefully curated selection of houseplants that not only enhance your living spaces but 
          also improve air quality and create a calming environment.
        </p>
        <p>
          Whether you're a seasoned plant enthusiast or just starting your green journey, Paradise Nursery offers 
          plants for every level of expertise. Let us help you transform your space into a vibrant sanctuary filled 
          with life and natural charm.
        </p>
      </div>
      <button onClick={() => (window.location.href = '/products')}>Get Started</button>
    </div>
  );
};

export default LandingPage;
