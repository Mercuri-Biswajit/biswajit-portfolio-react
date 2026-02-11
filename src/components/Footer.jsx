import { Link } from 'react-router-dom';

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
                  alt="Biswajit Deb Barman"
                  className="footer-logo-img"
                />
              </Link>
            </div>
            <p>Building the future, one structure at a time.</p>
          </div>

          <div className="footer-links">
            <div className="footer-column">
              <h4>Navigation</h4>
              <Link to="/">Home</Link>
              <Link to="/projects">Projects</Link>
              <Link to="/about">About</Link>
            </div>
            <div className="footer-column">
              <h4>Connect</h4>
              <a href="https://www.linkedin.com/in/biswajit-deb-barman/" target="_blank" rel="noreferrer">LinkedIn</a>
              <a href="https://www.facebook.com/profile.php?id=61585030424249" target="_blank" rel="noreferrer">Facebook</a>
              <a href="https://www.instagram.com/biswajit.deb.barman/" target="_blank" rel="noreferrer">Instagram</a>
            </div>
          </div>

        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 Er. Biswajit Deb Barman. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;