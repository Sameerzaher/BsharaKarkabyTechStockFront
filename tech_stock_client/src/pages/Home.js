// src/pages/Home.js
import React, { useEffect, useState } from 'react';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/login');
    } else {
      // נטען מוצרים רק אם המשתמש קיים
      fetchProducts();
    }
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('/products');
      setProducts(res.data);
    } catch (err) {
      console.error('Failed to load products', err);
    }
  };

  return (
    <div className="product-list">
      <h2>Available Products</h2>
      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <div className="products">
          {products.map((product) => (
            <div className="product-card" key={product.id}>
              {product.image && (
                <img
                  src={`http://localhost:5000/${product.image}`}
                  alt={product.name}
                  style={{ maxHeight: '200px', objectFit: 'cover', marginBottom: '0.5rem' }}
                />
              )}
              <h4 style={{ fontWeight: 'normal', color: '#666' }}>{product.name}</h4>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p><strong>${product.price}</strong></p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
