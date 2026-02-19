// src/components/layout/Layout.tsx
// Dashboard layout wrapper — Header + main content area
import Header from "./Header";
import "./Layout.css";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="layout">
      <Header />
      <main className="layout-main">
        {children}
      </main>
    </div>
  );
};

export default Layout;
