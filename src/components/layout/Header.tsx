// src/components/layout/Header.tsx
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Header.css";

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="header">
      <Link to={isAuthenticated ? "/dashboard" : "/"} className="header-logo">
        <span className="header-logo-icon">🎙️</span>
        VoiceAgent
      </Link>

      <div className="header-nav">
        {isAuthenticated && user ? (
          <div className="header-user">
            <span className="header-plan-badge">{user.plan}</span>
            <span className="header-user-email">{user.email}</span>
            <button className="header-logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <Link to="/login" className="header-logout-btn" style={{ textDecoration: "none" }}>
              Login
            </Link>
            <Link
              to="/register"
              style={{
                textDecoration: "none",
                padding: "0.4rem 0.875rem",
                borderRadius: "var(--radius-sm)",
                fontSize: "0.8rem",
                fontWeight: 600,
                background: "var(--accent-gradient)",
                color: "white",
              }}
            >
              Get Started
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
