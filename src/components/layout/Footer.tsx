// src/components/layout/Footer.tsx
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="global-footer">
      <div className="footer-content">
        <div className="footer-top">
          <div className="footer-brand">
            <span className="footer-logo">SWARAM</span>
            <p className="footer-tagline">
              Precision audio meeting editorial warmth. Synthesizing the Signal
              and the Silence.
            </p>
          </div>

          <div className="footer-links">
            <div className="footer-link-group">
              <span className="footer-label">Product</span>
              <Link to="/profile" className="footer-link">
                Profile
              </Link>
              <Link to="/about" className="footer-link">
                About Us
              </Link>
              <Link to="/dashboard" className="footer-link">
                Dashboard
              </Link>
              {/* <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="footer-link">Documentation</a> */}
            </div>

            <div className="footer-link-group">
              <span className="footer-label">Legal</span>
              <Link to="/terms" className="footer-link">
                Terms
              </Link>
              <Link to="/privacy" className="footer-link">
                Privacy
              </Link>
              <Link to="/security" className="footer-link">
                Security
              </Link>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-copyright-group">
            <span className="footer-copyright">
              © 2026 SWARAM — ALL RIGHTS RESERVED.
            </span>
            <span className="footer-powered-by">
              Powered by{" "}
              <a
                href="https://varsaka.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Varsaka Pvt Ltd{" "}
              </a>
            </span>
          </div>
          {/* <div className="footer-socials">
            <Link to="/contact" className="footer-social-link">Contact Us</Link>
            <a href="#" className="footer-social-link">X (Twitter)</a>
            <a href="#" className="footer-social-link">GitHub</a>
            <a href="#" className="footer-social-link">LinkedIn</a>
          </div> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
