// src/components/layout/Layout.tsx
import Sidebar from "./Sidebar";
import PageWrapper from "../shared/PageWrapper";
import "./Layout.css";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="layout-container">
      <Sidebar />
      <main className="layout-content">
        <PageWrapper>
          {children}
        </PageWrapper>
      </main>
    </div>
  );
};

export default Layout;
