import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login.js';
import Register from './pages/Register';
import Home from './pages/Home';
import AddProduct from './pages/AddProduct';
import Header from './components/Header.js';
import Footer from './components/footer.js';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add-product" element={<AddProduct />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
