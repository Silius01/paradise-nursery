import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { incrementQuantity, decrementQuantity, removeFromCart } from '../redux/cartSlice';

import { Link } from 'react-router-dom';
import './ShopCartPage.css';

const ShopCartPage = () => {

  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalCost = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="cart-container">
      <h1>Shopping Cart</h1>
      <h2>Total Items: {totalItems}</h2>
      <h2>Total Cost: ${totalCost.toFixed(2)}</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cart.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.name} />
            <div>
              <h3>{item.name}</h3>
              <p>Price: ${item.price}</p>
              <p>Quantity: {item.quantity}</p>
              <button onClick={() => dispatch(incrementQuantity(item))}>+</button>
              <button
                onClick={() => dispatch(decrementQuantity(item))}
                disabled={item.quantity === 1}
              >
                -
              </button>
              <button onClick={() => dispatch(removeFromCart(item))}>Remove</button>
            </div>
          </div>
        ))
      )}
      <div className="cart-buttons">
  <Link to="/products" className="continue-shopping-btn">
    Continue Shopping
  </Link>
  <button
    className="checkout-btn"
    onClick={() => alert('Checkout Coming Soon')}
  >
    Checkout
  </button>
</div>
    </div>
  );
};

export default ShopCartPage;
