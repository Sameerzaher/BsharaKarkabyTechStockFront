import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUser = () => {
      const storedUser = localStorage.getItem('user');
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };

    // Check user on mount
    checkUser();

    // Listen for storage changes
    window.addEventListener('storage', checkUser);
    
    // Custom event listener for same-tab updates
    window.addEventListener('userChanged', checkUser);

    return () => {
      window.removeEventListener('storage', checkUser);
      window.removeEventListener('userChanged', checkUser);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null); // עדכון מצב
    
    // Dispatch custom event to update header
    window.dispatchEvent(new Event('userChanged'));
    
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
