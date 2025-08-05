import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';


const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  // Fetch products on component mount
  useEffect(() => {
    fetch('http://localhost:8000/products')
      .then(res => res.json())
      .then(data => setProducts(data.products))
      .catch(err => console.error('Error fetching products:', err));
  }, []);

  // Extract unique categories for filter dropdown
  const categories = ['All', ...new Set(products.map(p => p.category))];

  // Filter products based on search term and selected category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (!cart.find(item => item.id === product.id)) {
      cart.push(product);
      localStorage.setItem('cart', JSON.stringify(cart));
      alert(`${product.name} added to cart!`);
    } else {
      alert(`${product.name} is already in your cart.`);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">Welcome to the E-Commerce Store</h1>

      {/* Search bar */}
      <div className="mb-3">
        <input
          type="text"
          placeholder="Search products by name..."
          className="form-control"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Category filter dropdown */}
      <div className="mb-4">
        <select
          className="form-select"
          value={categoryFilter}
          onChange={e => setCategoryFilter(e.target.value)}
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Link to Cart */}
      <div className="text-center mb-4">
        <Link to="/cart" className="btn btn-outline-primary">
          View Cart
        </Link>
      </div>

      {/* Product cards */}
      <div className="row">
        {filteredProducts.length === 0 ? (
          <p className="text-center">No products found.</p>
        ) : (
          filteredProducts.map(product => (
            <div key={product.id} className="col-md-4 mb-3">
              <div className="card p-3 h-100">
                <img
                  src={product.image_url}
                  alt={product.name}
                  style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                />
                <h5 className="mt-2">{product.name}</h5>
                <p>{product.description}</p>
                <p><strong>Price: ₹{product.price}</strong></p>
                <button
                  className="btn btn-primary"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
