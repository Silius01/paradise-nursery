import React from 'react';

const LandingPage = () => {
  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>Welcome to Paradise Nursery</h1>
      <p>Explore our variety of houseplants and bring life to your home.</p>
      <button
        onClick={() => window.location.href = '/products'}
        style={{
          padding: '1rem 2rem',
          backgroundColor: '#4CAF50',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Get Started
      </button>
    </div>
  );
};

export default LandingPage;