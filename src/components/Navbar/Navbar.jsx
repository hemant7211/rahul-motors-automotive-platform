
import "./Navbar.css";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useCart } from "../../context/CartContext";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const { cartCount } = useCart();

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav>
      {/* Brand Logo */}
      <div className="brand">
        <img src="/logo.webp" alt="Rahul Motors Logo" />
      </div>

      {/* Navigation Links */}
      <ul className={isOpen ? "nav-links active" : "nav-links"}>
        <li>
          <NavLink to="/" end onClick={closeMenu}>
            HOME
          </NavLink>
        </li>

        <li>
          <NavLink to="/services" onClick={closeMenu}>
            SERVICES
          </NavLink>
        </li>

        <li>
          <NavLink to="/washing" onClick={closeMenu}>
            BUY CARS
          </NavLink>
        </li>

        <li>
          <NavLink to="/spare-parts" onClick={closeMenu}>
            SPARE PARTS
          </NavLink>
        </li>

        <li>
          <NavLink to="/rental-cars" onClick={closeMenu}>
            RENT CARS
          </NavLink>
        </li>

        <li>
          <NavLink to="/used-cars" onClick={closeMenu}>
            USED CARS
          </NavLink>
        </li>

        <li>
          <NavLink to="/modification" onClick={closeMenu}>
            MODIFICATION
          </NavLink>
        </li>
      </ul>

      {/* Cart */}
      <NavLink
        to="/cart"
        className="navbar-cart"
        onClick={closeMenu}
        aria-label={`Shopping cart, ${cartCount} items`}
      >
        <span className="navbar-cart-icon">🛒</span>
        <span>Cart</span>

        {cartCount > 0 && (
          <span className="navbar-cart-count">
            {cartCount}
          </span>
        )}
      </NavLink>

      {/* Login */}
      <NavLink
        to="/login"
        className="login-btn"
        onClick={closeMenu}
      >
        Login
      </NavLink>

      {/* Mobile Menu Button */}
      <button
        type="button"
        className="menu-toggle"
        onClick={() => setIsOpen((previous) => !previous)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
      >
        {isOpen ? "✕" : "☰"}
      </button>
    </nav>
  );
}

export default Navbar;
