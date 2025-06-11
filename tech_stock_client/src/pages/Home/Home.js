// src/pages/Home.js
import React, { useEffect, useState } from 'react';
import axios from '../../axios';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState({ name: '' });

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
    } else {
      try {
        setUser(JSON.parse(userData));
      } catch (err) {
        console.error('Error parsing user data:', err);
      }
      fetchProducts();
    }
  }, [navigate]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('/products');
      setProducts(res.data);
    } catch (err) {
      console.error('Failed to load products', err);
    }
  };

  return (
    <div className="home-container">
      <main className="main-content">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">Welcome to TechStock</h1>
            <h2 className="hero-subtitle">Inventory Management System</h2>
            <p className="hero-greeting">Hello, {user.name || 'User'}!</p>
            <div className="hero-stats">
              <div className="stat-card">
                <h3>{products.length}</h3>
                <p>Products in Stock</p>
              </div>
              <div className="stat-card">
                <h3>24/7</h3>
                <p>System Availability</p>
              </div>
              <div className="stat-card">
                <h3>100%</h3>
                <p>Data Security</p>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="about-section">
          <div className="section-header">
            <h2>About TechStock</h2>
            <p className="section-description">
              Your comprehensive solution for modern inventory management
            </p>
          </div>
          
          <div className="about-content">
            <div className="about-text">
              <p>
                TechStock is a comprehensive inventory management system designed
                for technology retailers and distributors. Our platform helps
                businesses track their inventory, manage suppliers, and organize
                products by categories.
              </p>
              <p>
                With TechStock, you can easily add new products, update existing
                inventory, and keep track of stock levels to ensure you never run
                out of popular items.
              </p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="features-section">
          <div className="section-header">
            <h2>Key Features</h2>
            <p className="section-description">
              Everything you need to manage your inventory efficiently
            </p>
          </div>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📦</div>
              <h3>Product Management</h3>
              <p>
                Add, update, and remove products from your inventory with ease.
                Track stock levels and product details in real-time.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🏷️</div>
              <h3>Category Organization</h3>
              <p>
                Organize products by categories for better inventory management.
                Create custom categories that fit your business needs.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🤝</div>
              <h3>Supplier Tracking</h3>
              <p>
                Keep track of your suppliers and their contact information.
                Manage supplier relationships and order history.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Analytics & Reports</h3>
              <p>
                Get insights into your inventory performance with detailed
                analytics and customizable reports.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Secure & Reliable</h3>
              <p>
                Your data is protected with enterprise-grade security.
                Reliable system with 99.9% uptime guarantee.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Mobile Friendly</h3>
              <p>
                Access your inventory from anywhere with our responsive
                design that works on all devices.
              </p>
            </div>
          </div>
        </section>

        {/* Developer Section */}
        <section className="developer-section">
          <div className="section-header">
            <h2>About the Developer</h2>
            <p className="section-description">
              Meet the creator behind TechStock
            </p>
          </div>
          
          <div className="developer-info">
            <div className="developer-card">
              <div className="developer-avatar">👨‍💻</div>
              <h3>Monir Bishara</h3>
              <p className="developer-title">Full-Stack Developer</p>
              <p>
                Experienced developer with expertise in React, Node.js, and
                MySQL. Passionate about creating efficient and user-friendly
                applications.
              </p>
              <p>
                TechStock was created as a comprehensive inventory management
                solution, showcasing modern web development practices.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
