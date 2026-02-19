// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/context/AuthContext";
import ProtectedRoute from "./components/shared/ProtectedRoute";

// Public pages
import LandingPage    from "./pages/Public/LandingPage";
import LoginPage      from "./pages/Auth/LoginPage";
import RegisterPage   from "./pages/Auth/RegisterPage";

// Protected pages
import DashboardPage  from "./pages/Dashboard/DashboardPage";
import CreateAgentPage from "./pages/Agents/CreateAgentPage";
import AgentDetailPage from "./pages/Agents/AgentDetailPage";
import EditAgentPage  from "./pages/Agents/EditAgentPage";

// Embed (public — iframe from customer sites)
import EmbedPage      from "./pages/Embed/EmbedPage";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* ── Public ── */}
          <Route path="/"          element={<LandingPage />} />
          <Route path="/login"     element={<LoginPage />} />
          <Route path="/register"  element={<RegisterPage />} />

          {/* ── Embed widget (public, no auth) ── */}
          <Route path="/embed/:slug" element={<EmbedPage />} />

          {/* ── Protected dashboard routes ── */}
          <Route path="/dashboard" element={
            <ProtectedRoute><DashboardPage /></ProtectedRoute>
          } />
          <Route path="/agents/new" element={
            <ProtectedRoute><CreateAgentPage /></ProtectedRoute>
          } />
          <Route path="/agents/:id" element={
            <ProtectedRoute><AgentDetailPage /></ProtectedRoute>
          } />
          <Route path="/agents/:id/edit" element={
            <ProtectedRoute><EditAgentPage /></ProtectedRoute>
          } />

          {/* ── 404 ── */}
          <Route path="*" element={
            <div style={{ color: "var(--text-secondary)", textAlign: "center", padding: "5rem", fontSize: "1.125rem" }}>
              404 — Page not found
            </div>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
