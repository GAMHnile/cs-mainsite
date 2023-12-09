import * as React from "react";
import { Link } from "gatsby";
import logo from "../../img/logo.png";
import facebook from "../../img/social/facebook.svg";
import instagram from "../../img/social/instagram.svg";
import tiktok from "../../img/social/tiktok.svg";
import mail from "../../img/social/mail.svg";
import phone from "../../img/social/phone.svg";

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
                  <Link className="navbar-item" to="/booking">
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
            <a title="phone" href="tel:+250793835299">
              <img
                src={phone}
                alt="Phone"
                style={{ width: "1em", height: "1em" }}
              />
            </a>
            <a title="mail" href="mailto:info@thecoolsalon.com">
              <img
                src={mail}
                alt="Email"
                style={{ width: "1em", height: "1em" }}
              />
            </a>
            <a title="facebook" href="https://facebook.com">
              <img
                src={facebook}
                alt="Facebook"
                style={{ width: "1em", height: "1em" }}
              />
            </a>
            <a
              title="tiktok"
              href="https://www.tiktok.com/@thecoolsalonrw?_t=8i2tPK0bhgL&_r=1"
              target="_blank"
              rel="noreferrer"
            >
              <img
                className="fas fa-lg"
                src={tiktok}
                alt="Tik Tok"
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
