import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import './ProductsListingPage.css'; // Import the CSS file

const ProductsListingPage = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);

  const products = [
    {
      id: 1,
      name: 'Lavender',
      price: 10,
      category: 'Aromatic Plants',
      image: '/thumbnails/plant1.svg',
    },
    {
      id: 2,
      name: 'Peppermint',
      price: 8,
      category: 'Medicinal Plants',
      image: '/thumbnails/plant2.png',
    },
    {
      id: 3,
      name: 'Basil',
      price: 6,
      category: 'Aromatic Plants',
      image: '/thumbnails/plant1.svg',
    },
    {
      id: 4,
      name: 'Snake Plant',
      price: 15,
      category: 'Decorative Plants',
      image: '/thumbnails/plant3.png',
    },
    {
      id: 5,
      name: 'Aloe Vera',
      price: 12,
      category: 'Medicinal Plants',
      image: '/thumbnails/plant2.png',
    },
    {
      id: 6,
      name: 'Spider Plant',
      price: 9,
      category: 'Decorative Plants',
      image: '/thumbnails/plant3.png',
    },
  ];

  // Group products by category
  const groupedProducts = products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {});

  return (
    <div className="products-container">
      {Object.entries(groupedProducts).map(([category, items]) => (
        <div key={category} style={{ marginBottom: '2rem', width: '100%' }}>
          <h2>{category}</h2>
          <div className="products-container">
            {items.map((product) => (
              <div key={product.id} className="product-card">
                <img src={product.image} alt={product.name} />
                <h3>{product.name}</h3>
                <p>Price: ${product.price}</p>
                <button
                  onClick={() => dispatch(addToCart(product))}
                  disabled={cart.some((item) => item.id === product.id)}
                >
                  {cart.some((item) => item.id === product.id)
                    ? 'Added to Cart'
                    : 'Add to Cart'}
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
