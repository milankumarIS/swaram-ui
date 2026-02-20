// src/components/layout/Sidebar.tsx
import {
  BarChart2,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  User,
  HelpCircle
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Sidebar.css";

interface NavItem {
  icon: React.ReactNode;
  label: string;
  path: string;
  external?: boolean;
}

const Sidebar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const navItems: NavItem[] = [
    { icon: <LayoutDashboard size={18} />, label: "Dashboard", path: "/dashboard" },
    { icon: <MessageSquare size={18} />, label: "Sessions", path: "/sessions" },
    { icon: <BarChart2 size={18} />, label: "Analytics", path: "/analytics" },
    { icon: <User size={18} />, label: "Profile", path: "/profile" },
    { icon: <HelpCircle size={18} />, label: "Contact Us", path: "/contact" },
  ];

  return (
    <aside className="sidebar">
 

      <nav className="sidebar-nav" style={{marginTop:'2rem'}}>
        {navItems.map((item) => (
          item?.external ? (
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
