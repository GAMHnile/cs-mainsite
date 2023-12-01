import * as React from "react";
import { Link } from "gatsby";
import logo from "../../img/logo.png";
import facebook from "../../img/social/facebook.svg";
import instagram from "../../img/social/instagram.svg";
import twitter from "../../img/social/twitter.svg";

const Footer = () => {
  return (
    <footer className="footer has-background-black has-text-white-ter">
      <div className="content has-text-centered">
        <img src={logo} alt="Cool Salon" style={{ width: "20em" }} />
      </div>
      <div className="content has-text-centered has-background-black has-text-white-ter columns">
        <div className="footer-content">
          <div className="footer-items">
            <section className="menu">
              <ul className="menu-list footer-items-list">
                <li className="footer-items-list-item">
                  <Link className="footer-items-list-item" to="/">
                    Home
                  </Link>
                </li>
                <li className="footer-items-list-item">
                  <Link className="navbar-item" to="/about">
                    Book a session
                  </Link>
                </li>
                <li className="footer-items-list-item">
                  <Link className="navbar-item" to="/about">
                    About
                  </Link>
                </li>
              </ul>
            </section>
          </div>
          <div className="footer-items">
            <section>
              <ul className="menu-list footer-items-list">
                <li className="footer-items-list-item">
                  <Link className="navbar-item" to="/blog">
                    Blog
                  </Link>
                </li>
                <li className="footer-items-list-item">
                  <Link className="navbar-item" to="/contact">
                    Contact
                  </Link>
                </li>
              </ul>
            </section>
          </div>
        </div>
        <div className="column is-4 social">
          <div>
            <a title="facebook" href="https://facebook.com">
              <img
                src={facebook}
                alt="Facebook"
                style={{ width: "1em", height: "1em" }}
              />
            </a>
            <a title="twitter" href="https://twitter.com">
              <img
                className="fas fa-lg"
                src={twitter}
                alt="Twitter"
                style={{ width: "1em", height: "1em" }}
              />
            </a>
            <a title="instagram" href="https://instagram.com">
              <img
                src={instagram}
                alt="Instagram"
                style={{ width: "1em", height: "1em" }}
              />
            </a>
          </div>
          <p style={{ marginTop: "3rem", fontSize: "13px" }}>
            &#169; GAMHnile Software Services, 2023
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
