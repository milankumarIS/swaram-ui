// src/components/layout/Sidebar.tsx
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LayoutDashboard, Users, MessageSquare, BarChart2, Settings, LogOut } from "lucide-react";
import "./Sidebar.css";

const Sidebar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard size={20} /> },
    { name: "My Agents", path: "/dashboard", icon: <Users size={20} /> }, // Assuming agents list is on dashboard
    { name: "Sessions", path: "/sessions", icon: <MessageSquare size={20} /> },
    { name: "Analytics", path: "/analytics", icon: <BarChart2 size={20} /> },
    { name: "Settings", path: "/settings", icon: <Settings size={20} /> },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <Link to="/" className="sidebar-logo">VOICE AGENT</Link>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`nav-item ${isActive ? "active" : ""}`}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-text">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        {user && (
          <div className="sidebar-user">
            <div className="user-info">
              <span className="user-email truncate">{user.email}</span>
              <span className="user-plan-badge">{user.plan}</span>
            </div>
          </div>
        )}
        <button className="sidebar-logout-btn" onClick={logout}>
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
