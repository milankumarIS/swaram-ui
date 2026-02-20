// src/App.tsx
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./components/context/AuthContext";
import ProtectedRoute from "./components/shared/ProtectedRoute";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import PageWrapper from "./components/shared/PageWrapper";

// Public pages
import LandingPage from "./pages/Public/LandingPage";
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import AboutPage from "./pages/Public/AboutPage";
import TermsPage from "./pages/Public/TermsPage";
import PrivacyPage from "./pages/Public/PrivacyPage";
import SecurityPage from "./pages/Public/SecurityPage";
import ContactPage from "./pages/Public/ContactPage";

// Protected pages
import DashboardPage from "./pages/Dashboard/DashboardPage";
import CreateAgentPage from "./pages/Agents/CreateAgentPage";
import AgentDetailPage from "./pages/Agents/AgentDetailPage";
import EditAgentPage from "./pages/Agents/EditAgentPage";
import SessionsPage from "./pages/Dashboard/SessionsPage";
import AnalyticsPage from "./pages/Dashboard/AnalyticsPage";
import ProfilePage from "./pages/Dashboard/ProfilePage";

// Embed (public — iframe from customer sites)
import EmbedPage from "./pages/Embed/EmbedPage";

import "./App.css";

const AppContent = () => {
  const location = useLocation();
  const isEmbed = location.pathname.startsWith("/embed");
  const [isAtTop, setIsAtTop] = useState(true);
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const atTop = window.scrollY === 0;
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;

      setIsAtTop(atTop);
      setIsAtBottom(atBottom);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Header />
      <div
        className="landing-cover"
        data-at-top={isAtTop}
        data-at-bottom={isAtBottom}
      />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* ── Public ── */}
          <Route path="/"          element={<PageWrapper><LandingPage /></PageWrapper>} />
          <Route path="/login"     element={<PageWrapper><LoginPage /></PageWrapper>} />
          <Route path="/register"  element={<PageWrapper><RegisterPage /></PageWrapper>} />
          <Route path="/about"     element={<PageWrapper><AboutPage /></PageWrapper>} />
          <Route path="/terms"     element={<PageWrapper><TermsPage /></PageWrapper>} />
          <Route path="/privacy"   element={<PageWrapper><PrivacyPage /></PageWrapper>} />
          <Route path="/security"  element={<PageWrapper><SecurityPage /></PageWrapper>} />

          {/* ── Embed widget (public, no auth) ── */}
          <Route path="/embed/:slug" element={<EmbedPage />} />

          {/* ── Protected dashboard routes ── */}
          <Route path="/dashboard" element={
            <ProtectedRoute><DashboardPage /></ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute><ProfilePage /></ProtectedRoute>
          } />
          <Route path="/agents/new" element={
            <ProtectedRoute><CreateAgentPage /></ProtectedRoute>
          } />
          <Route path="/agents/:slug" element={
            <ProtectedRoute><AgentDetailPage /></ProtectedRoute>
          } />
          <Route path="/agents/:slug/edit" element={
            <ProtectedRoute><EditAgentPage /></ProtectedRoute>
          } />
          <Route path="/sessions" element={
            <ProtectedRoute><SessionsPage /></ProtectedRoute>
          } />
          <Route path="/analytics" element={
            <ProtectedRoute><AnalyticsPage /></ProtectedRoute>
          } />
          <Route path="/contact" element={
            <ProtectedRoute><ContactPage /></ProtectedRoute>
          } />
          <Route path="/settings" element={
            <ProtectedRoute>
              <div style={{ color: "var(--text-secondary)", padding: "48px" }}>
                <h1 style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)", marginBottom: "16px" }}>Settings</h1>
                <p>Global account and organization preferences coming soon.</p>
              </div>
            </ProtectedRoute>
          } />

          {/* ── 404 ── */}
          <Route
            path="*"
            element={
              <div
                style={{
                  color: "var(--text-secondary)",
                  textAlign: "center",
                  padding: "5rem",
                  fontSize: "1.125rem",
                }}
              >
                404 — Page not found
              </div>
            }
          />
        </Routes>
      </AnimatePresence>
      {!isEmbed && <Footer />}
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: "var(--bg-card)",
              color: "var(--text-primary)",
              border: "1px solid var(--border-primary)",
              borderRadius: "12px",
              padding: "16px",
              fontSize: "0.9375rem",
              fontFamily: "var(--font-body)",
            },
            success: {
              iconTheme: {
                primary: "var(--accent-primary)",
                secondary: "var(--bg-card)",
              },
            },
            error: {
              iconTheme: {
                primary: "var(--error)",
                secondary: "var(--bg-card)",
              },
            },
          }}
        />
      </Router>
    </AuthProvider>
  );
}

export default App;
