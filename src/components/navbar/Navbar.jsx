import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.scss';

const Navbar = ({ user, setUser }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate('/');
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to="/" onClick={closeMenu}>
            <h2>TradeWheelz</h2>
          </Link>
        </div>

        <div className={`navbar-menu ${isMenuOpen ? 'is-active' : ''}`}>
          <div className="navbar-nav">
            <Link to="/cars" className="navbar-item" onClick={closeMenu}>
              Cars
            </Link>
            <Link to="/sell" className="navbar-item" onClick={closeMenu}>
              Sell Car
            </Link>
            <div className="navbar-item">About</div>
          </div>

          <div className="navbar-auth">
            {user ? (
              <>
                <Link to="/profile" className="navbar-item" onClick={closeMenu}>
                  Profile
                </Link>
                <button className="navbar-item btn-logout" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="navbar-item" onClick={closeMenu}>
                  Login
                </Link>
                <Link to="/signup" className="btn btn-primary" onClick={closeMenu}>
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="navbar-burger" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;