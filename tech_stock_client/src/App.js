import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login/login.js';
import Register from './pages/Register/Register.js';
import Home from './pages/Home/Home.js';

import Header from './components/Header.js';
import Footer from './components/footer.js';
import ProductManagement from './pages/ProductManagment/ProductManagement.js';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/products" element={<ProductManagement />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
