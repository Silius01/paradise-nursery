import React from 'react';

const ShopCartPage = ({ cart }) => {
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div
              key={item.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '1rem',
                border: '1px solid #ccc',
                borderRadius: '5px',
                padding: '1rem',
              }}
            >
              <img
                src={item.image}
                alt={item.name}
                style={{ width: '100px', marginRight: '1rem' }}
              />
              <div style={{ flex: 1 }}>
                <h3>{item.name}</h3>
                <p>Unit Price: ${item.price}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Total: ${item.price * item.quantity}</p>
              </div>
            </div>
          ))}
          <h2>Total Price: ${totalPrice}</h2>
        </div>
      )}
    </div>
  );
};

export default ShopCartPage;
