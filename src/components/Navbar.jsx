import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSizeClick = (size) => {
    navigate(`/filtered/${size}`);
    setSidebarOpen(false); // close sidebar on link click
  };

  const handleNavClick = (path) => {
    navigate(path);
    setSidebarOpen(false); // close sidebar on link click
  };

  return (
    <div className="nav">
      {/* Hamburger icon for mobile */}
      {windowWidth < 768 && (
        <button className="hamburger" onClick={() => setSidebarOpen(true)} aria-label="Open navigation menu">
          <span className="hamburger-bar"></span>
          <span className="hamburger-bar"></span>
          <span className="hamburger-bar"></span>
        </button>
      )}
      {/* Sidebar for mobile */}
      {windowWidth < 768 && (
        <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
          <button className="close-btn" onClick={() => setSidebarOpen(false)} aria-label="Close navigation menu">&times;</button>
          <div className="sidebar-links">
            <p onClick={() => handleNavClick("/")}>HOME</p>
            <p onClick={() => handleNavClick("/About")}>ABOUT</p>
            <p onClick={() => handleNavClick("/contact")}>CONTACT</p>
            <div className="dropdown">
              <p className="dropdown-toggle">TILES</p>
              <div className="dropdown-menu">
                <p onClick={() => handleSizeClick("4 x 4")}>4 x 4</p>
                <p onClick={() => handleSizeClick("2 x 2")}>2 x 2</p>
                <p onClick={() => handleSizeClick("18 x 12")}>18 x 12</p>
                <p onClick={() => handleSizeClick("16 x 16")}>16 x 16</p>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Normal nav links for desktop */}
      {windowWidth >= 768 && (
        <div className="nav-links">
          <p onClick={() => navigate("/")}>HOME</p>
          <p onClick={() => navigate("/About")}>ABOUT</p>
          <p onClick={() => navigate("/contact")}>CONTACT</p>
          <div className="dropdown">
            <p className="dropdown-toggle">TILES</p>
            <div className="dropdown-menu">
              <p onClick={() => handleSizeClick("4 x 4")}>4 x 4</p>
              <p onClick={() => handleSizeClick("2 x 2")}>2 x 2</p>
              <p onClick={() => handleSizeClick("18 x 12")}>18 x 12</p>
              <p onClick={() => handleSizeClick("16 x 16")}>16 x 16</p>
            </div>
          </div>
        </div>
      )}
      <h1 className="logo">SHIVAM</h1>
    </div>
  );
};

export default Navbar;
