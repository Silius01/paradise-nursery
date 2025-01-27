import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} from '../redux/cartSlice';
import './ShopCartPage.css';

const ShopCartPage = () => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total number of plants
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Calculate total cost
  const totalCost = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-container">
      <h1>Shopping Cart</h1>

      {/* Total Items and Total Cost */}
      <h2>Total Items: {totalItems}</h2>
      <h2>Total Cost: ${totalCost.toFixed(2)}</h2>

      {/* Cart Items */}
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <div className="cart-item-details">
                <h3>{item.name}</h3>
                <p>Unit Price: ${item.price}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Total: ${item.price * item.quantity}</p>
              </div>
              <div className="cart-item-actions">
                <button
                  className="increase-btn"
                  onClick={() => dispatch(incrementQuantity(item))}
                >
                  +
                </button>
                <button
                  className="decrease-btn"
                  onClick={() => dispatch(decrementQuantity(item))}
                  disabled={item.quantity === 1}
                >
                  -
                </button>
                <button
                  className="remove-btn"
                  onClick={() => dispatch(removeFromCart(item))}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Buttons */}
      <div className="cart-buttons">
        <button
          onClick={() => (window.location.href = '/products')}
          className="continue-shopping-btn"
        >
          Continue Shopping
        </button>
        <button
          onClick={() => alert('Checkout Coming Soon')}
          className="checkout-btn"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default ShopCartPage;
