import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById } from '../api';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      const response = await getProductById(id);
      setProduct(response.data);
    };
    fetchProductDetails();
  }, [id]);

  const handleAddToCart = () => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Product added to cart!');
  };

  if (!product) {
    return <div className="container mt-5">Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <h3 className="card-title">{product.name}</h3>
          <p className="card-text"><strong>Description:</strong> {product.description}</p>
          <p className="card-text"><strong>Price:</strong> ₹{product.price}</p>
          <button className="btn btn-success mt-3 me-3" onClick={handleAddToCart}>Add to Cart</button>
          <Link className="btn btn-secondary mt-3" to="/products">← Back to Products</Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
