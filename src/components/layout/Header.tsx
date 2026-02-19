// src/components/layout/Header.tsx
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { User as UserIcon } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import "./Header.css";

const Header = () => {
  const { logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Hide header on embed page
  if (location.pathname.startsWith("/embed")) return null;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <motion.div
      className="header-wrapper"
      initial={{ y: -100, x: "-50%", opacity: 0 }}
      animate={{ y: 0, x: "-50%", opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1], delay: 0.2 }}
    >
      <header className="header">
        <Link to="/" className="header-logo">
          SWARAM
        </Link>

        <nav className="header-nav">
          <div className="header-links">
            <Link to="/about" className="header-link">
              About
            </Link>
            <Link to="/security" className="header-link">
              Security
            </Link>
            {isAuthenticated && (
              <Link to="/dashboard" className="header-link">
                Dashboard
              </Link>
            )}
          </div>

          <div className="header-auth-group">
            {isAuthenticated ? (
              <div className="header-user-wrapper">
                <Link
                  to="/profile"
                  className="header-profile-icon-btn"
                  title="Your Profile"
                >
                  <UserIcon size={18} />
                </Link>
                <button className="header-btn-logout" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            ) : (
              <div className="header-user-wrapper">
                <Link
                  to="/login"
                  className="header-link"
                  style={{ marginRight: "16px" }}
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="btn-primary"
                  style={{ padding: "8px 20px", fontSize: "12px" }}
                >
                  Join Free
                </Link>
              </div>
            )}
          </div>
        </nav>
      </header>
    </motion.div>
  );
};

export default Header;
