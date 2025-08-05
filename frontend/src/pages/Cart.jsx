import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Cart = () => {
  // Load cart from localStorage or empty array if none
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Update localStorage whenever cartItems change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Increase quantity of item
  const increaseQuantity = (id) => {
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
    ));
  };

  // Decrease quantity of item but minimum 1
  const decreaseQuantity = (id) => {
    setCartItems(cartItems.map(item =>
      item.id === id
        ? { ...item, quantity: Math.max(1, (item.quantity || 1) - 1) }
        : item
    ));
  };

  // Remove item from cart
  const removeFromCart = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  // Calculate total price based on quantity
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="container mt-5 text-center">
        <h3>Your cart is empty 🛒</h3>
        <Link to="/" className="btn btn-primary mt-3">
          Shop Products
        </Link>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2>Your Cart</h2>
      <ul className="list-group mb-3">
        {cartItems.map(item => (
          <li
            key={item.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              <h5>{item.name}</h5>
              <p className="mb-1">{item.description}</p>
              <p className="mb-1">
                <strong>Price:</strong> ₹{item.price}
              </p>
              <div className="d-flex align-items-center">
                <button
                  className="btn btn-sm btn-secondary me-2"
                  onClick={() => decreaseQuantity(item.id)}
                >
                  -
                </button>
                <span>{item.quantity || 1}</span>
                <button
                  className="btn btn-sm btn-secondary ms-2"
                  onClick={() => increaseQuantity(item.id)}
                >
                  +
                </button>
              </div>
            </div>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => removeFromCart(item.id)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <h4>Total: ₹{totalPrice.toFixed(2)}</h4>
      <button
        className="btn btn-success"
        onClick={() => alert('Checkout functionality coming soon!')}
      >
        Checkout
      </button>
    </div>
  );
};

export default Cart;
