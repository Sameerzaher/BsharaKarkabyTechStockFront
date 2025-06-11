import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    setUser(storedUser ? JSON.parse(storedUser) : null);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null); // עדכון מצב
    navigate('/login');
  };

  return (
    <header className="header">
      <h1>TechStock</h1>
      <nav>
        <Link to="/">Home</Link>
        {user && (
          <>
            <Link to="/products">Manage Products</Link>
          </>
        )}
        {!user ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        )}
      </nav>
    </header>
  );
};

export default Header;
