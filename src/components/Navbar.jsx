import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Close menu whenever route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  // Navbar scroll effect — same as your initNavbarScroll()
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close on ESC key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  const isActive = (path) => location.pathname === path ? 'nav-link active' : 'nav-link';

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">

        <div className="logo">
          <Link to="/">
            <img
              src="/assets/icons/My__Logo.png"
              alt="Biswajit Deb Barman"
              className="logo-img"
            />
          </Link>
        </div>

        <div className={`nav-menu ${menuOpen ? 'active' : ''}`}>
          <Link to="/"           className={isActive('/')}>HOME</Link>
          <Link to="/projects"   className={isActive('/projects')}>PROJECTS</Link>
          <Link to="/about"      className={isActive('/about')}>ABOUT</Link>
          <Link to="/calculator" className={isActive('/calculator')}>CALCULATORS</Link>
        </div>

        <a
          href="/assets/files/Biswajit_Deb_Barman__CV.pdf"
          download
          className="btn-nav-cta"
        >
          DOWNLOAD RESUME
        </a>

        <button
          className={`hamburger ${menuOpen ? 'active' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

      </div>
    </nav>
  );
}

export default Navbar;