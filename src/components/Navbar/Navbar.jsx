import "./Navbar.css";
import { useState } from "react";
import { NavLink } from "react-router-dom";
// import logo from "../../assets/logo (2).png";
function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
  return (
    <nav>
    <div className="brand">
  <img src="logo.webp" alt="logo"/>
 
</div>
     <ul className={isOpen ? "nav-links active" : "nav-links"}>

  <li>
    <NavLink to="/" end onClick={() => setIsOpen(false)}>
      HOME
    </NavLink>
  </li>

  <li>
    <NavLink to="/services" onClick={() => setIsOpen(false)}>
   SERVICES
    </NavLink>
  </li>

  <li>
    <NavLink to="/washing" onClick={() => setIsOpen(false)}>
      BUY CARS
    </NavLink>
  </li>

  <li>
    <NavLink to="/spare-parts" onClick={() => setIsOpen(false)}>
      SPARE PARTS 
         </NavLink>
  </li>

  <li>
    <NavLink to="/rental-cars" onClick={() => setIsOpen(false)}>
      RENT CARS
    </NavLink>
  </li>
  <li>
    <NavLink to="/modification" onClick={() => setIsOpen(false)}>
      MODIFICATION
    </NavLink>
  </li>

</ul>
     <button
  className="menu-toggle"
  onClick={() => setIsOpen(!isOpen)}
>
  {isOpen ? "✕" : "☰"}
</button>
     <button className="login-btn">Login</button>
     
    </nav>
  );
}
export default Navbar;