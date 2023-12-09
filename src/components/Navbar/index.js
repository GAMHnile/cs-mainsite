import React, { useState } from "react";
import { Link } from "gatsby";
import logo from "../../img/logo.png";

const Navbar = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <nav className="navbar" role="navigation" aria-label="main-navigation">
      <div className="container">
        <div className="navbar-brand" style={{ padding: 0 }}>
          <Link
            to="/"
            className="navbar-item"
            title="Logo"
            style={{ padding: 0 }}
          >
            <img src={logo} alt="Cool Salon" className="navbar-img" />
          </Link>
          {/* Hamburger menu */}
          <button
            className={`navbar-burger burger ${isActive && "is-active"}`}
            aria-expanded={isActive}
            onClick={() => setIsActive(!isActive)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
        <ul
          id="navMenu"
          className={`navbar-start has-text-centered navbar-menu ${
            isActive && "is-active"
          }`}
        >
          <li className="navbar-item" style={{ padding: "0px" }}>
            <Link className="navbar-item" to="/booking">
              Book a session
            </Link>
          </li>
          <li className="navbar-item" style={{ padding: "0px" }}>
            <Link className="navbar-item" to="/about">
              About
            </Link>
          </li>
          <li className="navbar-item" style={{ padding: "0px" }}>
            <Link className="navbar-item" to="/blog">
              Blog
            </Link>
          </li>
          <li className="navbar-item" style={{ padding: "0px" }}>
            <Link className="navbar-item" to="/contact">
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
