// src/pages/Dashboard/DashboardPage.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../components/context/AuthContext";
import Layout from "../../components/layout/Layout";
import Loader from "../../components/shared/Loader";
import { getAgents } from "../../services/services";
import type { Agent } from "../../global";
import "./DashboardPage.css";

const DashboardPage = () => {
  const { user } = useAuth();
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getAgents()
      .then((res) => setAgents(res.data))
      .catch(() => setError("Failed to load agents."))
      .finally(() => setLoading(false));
  }, []);

  const firstName = user?.email?.split("@")[0] ?? "there";

  return (
    <Layout>
      <div className="dashboard">
        <div className="dashboard-top">
          <div>
            <h1 className="dashboard-greeting">
              Hello, <span>{firstName}</span> 👋
            </h1>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginTop: "0.25rem" }}>
              Manage your voice AI agents below
            </p>
          </div>
          <Link to="/agents/new" className="create-agent-btn">
            + New Agent
          </Link>
        </div>

        <iframe
  src="http://localhost:5173/embed/jnana-UdTRRx?token=5c31cac0-8522-49dc-94d0-f354326bf10d"
  width="400"
  height="600"
  allow="microphone"
  // style="border:none;border-radius:16px;"
></iframe>

        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", padding: "4rem" }}>
            <Loader size={48} />
          </div>
        ) : error ? (
          <p style={{ color: "var(--error)", textAlign: "center", padding: "2rem" }}>{error}</p>
        ) : (
          <div className="agents-grid">
            {agents.length === 0 ? (
              <div className="agents-empty">
                <div className="agents-empty-icon">🎙️</div>
                <h3>No agents yet</h3>
                <p>Create your first voice AI agent and embed it anywhere.</p>
                <Link to="/agents/new" className="create-agent-btn">
                  Create Your First Agent
                </Link>
              </div>
            ) : (
              agents.map((agent) => (
                <Link key={agent.id} to={`/agents/${agent.id}`} className="agent-card">
                  <div className="agent-card-header">
                    <div>
                      <div className="agent-card-name">{agent.name}</div>
                      <div className="agent-card-slug">/{agent.slug}</div>
                    </div>
                    <span className={`agent-status-badge ${agent.is_active ? "active" : "inactive"}`}>
                      {agent.is_active ? "Active" : "Inactive"}
                    </span>
                  </div>
                  <p style={{ fontSize: "0.825rem", color: "var(--text-secondary)", lineHeight: 1.5, marginBottom: "0.5rem" }}>
                    {agent.system_prompt.length > 80
                      ? agent.system_prompt.slice(0, 80) + "…"
                      : agent.system_prompt}
                  </p>
                  <div className="agent-card-meta">
                    <span className="agent-meta-tag">🤖 {agent.llm_model}</span>
                    <span className="agent-meta-tag">🗣️ {agent.tts_voice}</span>
                    <span className="agent-meta-tag">🌐 {agent.stt_language_code}</span>
                  </div>
                </Link>
              ))
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default DashboardPage;
