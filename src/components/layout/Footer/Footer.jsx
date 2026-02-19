import { Link } from "react-router-dom";

import { SITE } from "../../../config/constants";

import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="logo">
              <Link to="/">
                <img
                  src="/assets/icons/My__Logo.png"
                  alt={SITE.name}
                  className="footer-logo-img"
                />
              </Link>
            </div>
            <address style={{ fontStyle: "normal" }}>
              <strong>Er. Biswajit Deb Barman</strong>
              <br />
              Civil Engineer &amp; Structural Designer
              <br />
              Chanditala, Raiganj, Uttar Dinajpur,
              <br />
              West Bengal – 733134, India
              <br />
              <a href="tel:+917602120054">+91-7602120054</a>
              <br />
              <a href="mailto:biswajitdebbarman.civil@gmail.com">
                biswajitdebbarman.civil@gmail.com
              </a>
            </address>
          </div>

          <div className="footer-links">
            <div className="footer-column">
              <h4>Navigation</h4>
              <Link to="/">Home</Link>
              <Link to="/projects">Projects</Link>
              <Link to="/about">About</Link>
              <Link to="/calculator">Calculator</Link>
              <Link to="/vastu">Vastu Guide</Link>
            </div>
            <div className="footer-column">
              <h4>Connect</h4>
              <a href={SITE.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <a href={SITE.facebook} target="_blank" rel="noreferrer">
                Facebook
              </a>
              <a href={SITE.instagram} target="_blank" rel="noreferrer">
                Instagram
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 Built by Er. Biswajit Deb Barman | Civil Engineer – Raiganj, Uttar Dinajpur, West Bengal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
