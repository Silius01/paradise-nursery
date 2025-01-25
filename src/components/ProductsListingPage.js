import React from 'react';

const ProductsListingPage = ({ addToCart }) => {
  const products = [
    {
      id: 1,
      name: 'Lavender',
      description: 'Aromatic plant with calming properties.',
      price: 10,
      category: 'Aromatic Plants',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 2,
      name: 'Peppermint',
      description: 'Medicinal plant used for digestion.',
      price: 8,
      category: 'Medicinal Plants',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 3,
      name: 'Basil',
      description: 'Aromatic herb perfect for cooking.',
      price: 6,
      category: 'Aromatic Plants',
      image: 'https://via.placeholder.com/150',
    },
  ];

  const groupedProducts = products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {});

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Our Plants</h1>
      {Object.entries(groupedProducts).map(([category, items]) => (
        <div key={category} style={{ marginBottom: '2rem' }}>
          <h2>{category}</h2>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {items.map((product) => (
              <div
                key={product.id}
                style={{
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  padding: '1rem',
                  width: '200px',
                }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  style={{ width: '100%', borderRadius: '5px' }}
                />
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>Price: ${product.price}</p>
                <button
                  onClick={() => addToCart(product)}
                  style={{
                    padding: '0.5rem',
                    backgroundColor: '#4CAF50',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                  }}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductsListingPage;
