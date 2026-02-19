// src/components/layout/Sidebar.tsx
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  BarChart2,
  LayoutDashboard,
  MessageSquare,
  LogOut,
  User,
  HelpCircle
} from "lucide-react";
import "./Sidebar.css";

const Sidebar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const navItems = [
    { icon: <LayoutDashboard size={18} />, label: "Dashboard", path: "/dashboard" },
    // { icon: <Users size={18} />, label: "My Agents", path: "/dashboard" }, // In this simple version, same as dashboard
    { icon: <MessageSquare size={18} />, label: "Sessions", path: "/sessions" },
    { icon: <BarChart2 size={18} />, label: "Analytics", path: "/analytics" },
    { icon: <User size={18} />, label: "Profile", path: "/profile" },
    // { icon: <Settings size={18} />, label: "Settings", path: "/settings" },
    { icon: <HelpCircle size={18} />, label: "Documentation", path: "https://github.com", external: true },
  ];

  return (
    <aside className="sidebar">
 

      <nav className="sidebar-nav" style={{marginTop:'2rem'}}>
        {navItems.map((item) => (
          item.external ? (
            <a
              key={item.label}
              href={item.path}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-item"
            >
              <span className="nav-icon">{item.icon}</span>
              {item.label}
            </a>
          ) : (
            <Link
              key={item.label}
              to={item.path}
              className={`nav-item ${location.pathname === item.path ? "active" : ""}`}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.label}
            </Link>
          )
        ))}
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
