// src/pages/Dashboard/DashboardPage.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../components/context/AuthContext";
import Layout from "../../components/layout/Layout";
import Loader from "../../components/shared/Loader";
import { getAgents, getDashboardStats } from "../../services/services";
import type { Agent } from "../../global";
import { Mic, Copy, Edit2, MoreHorizontal, Sparkles } from "lucide-react";
import "./DashboardPage.css";

const DashboardPage = () => {
  const {} = useAuth();
  const [agents, setAgents] = useState<Agent[]>([]);
  const [stats, setStats] = useState({
    totalSessions: 0,
    totalTalkTime: "0m",
    agentCount: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([getAgents(), getDashboardStats()])
      .then(([agentsRes, statsRes]) => {
        setAgents(agentsRes.data);
        setStats(statsRes.data);
      })
      .catch(() => setError("Failed to load dashboard data."))
      .finally(() => setLoading(false));
  }, []);

  const copyEmbedCode = (agent: Agent) => {
    const embedUrl = import.meta.env.VITE_EMBED_URL || window.location.origin;
    const iframeCode = `<iframe
  src="${embedUrl}/embed/${agent.slug}?token=${agent.embed_token}"
  width="400"
  height="600"
  allow="microphone"
  style="border:none;border-radius:16px;"
></iframe>`;

    navigator.clipboard
      .writeText(iframeCode)
      .then(() => {
        toast.success("Embed code copied to clipboard!");
      })
      .catch(() => {
        toast.error("Failed to copy embed code");
      });
  };

  return (
    <Layout>
      <div className="dashboard">
        <header className="dashboard-header">
          <h1 className="page-title">Dashboard</h1>
          <Link to="/agents/new" className="btn-primary">
            + New Agent
          </Link>
        </header>

        {/* Stats Bar */}
        <div className="stats-bar">
          <div className="stat-card">
            <span className="stat-value">{stats.agentCount}</span>
            <span className="stat-label">Agents</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">
              {stats.totalSessions.toLocaleString()}
            </span>
            <span className="stat-label">Total Sessions</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{stats.totalTalkTime}</span>
            <span className="stat-label">Talk Time</span>
          </div>
        </div>

        {loading ? (
          <div className="loader-container">
            <Loader size={48} />
          </div>
        ) : error ? (
          <div className="error-container">
            <p>{error}</p>
          </div>
        ) : (
          <div className="agents-container">
            {agents.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon-wrapper">
                  <Mic size={32} />
                  <div className="empty-circle"></div>
                </div>
                <h2 className="empty-title">
                  Your first agent is one prompt away.
                </h2>
                <Link to="/agents/new" className="btn-primary">
                  + Create Agent
                </Link>
              </div>
            ) : (
              <div className="table-wrapper">
                <table className="agents-table">
                  <thead>
                    <tr>
                      <th>Agent Name</th>
                      <th>Model</th>
                      <th>Language</th>
                      <th>Status</th>
                      <th>Sessions (30d)</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {agents.map((agent) => (
                      <tr key={agent.id}>
                        <td>
                          <div className="agent-identity">
                            <span className="agent-name">{agent.name}</span>
                            <span className="agent-slug">/{agent.slug}</span>
                          </div>
                        </td>
                        <td>
                          <div className="agent-model">
                            <Sparkles size={14} />
                            <span>{agent.llm_model}</span>
                          </div>
                        </td>
                        <td>
                          <span className="agent-lang">
                            {agent.stt_language_code}
                          </span>
                        </td>
                        <td>
                          <span
                            className={`badge ${agent.is_active ? "badge-active" : "badge-idle"}`}
                          >
                            {agent.is_active ? "Active" : "Idle"}
                          </span>
                        </td>
                        <td>
                          <span className="stat-num">
                            {agent.session_count_30d || 0}
                          </span>
                        </td>
                        <td className="actions-cell">
                          <button
                            className="btn-ghost icon-btn"
                            onClick={() => copyEmbedCode(agent)}
                            title="Copy embed code"
                          >
                            <Copy size={16} />
                          </button>
                          <Link
                            to={`/agents/${agent.id}/edit`}
                            className="btn-ghost icon-btn"
                            title="Edit agent"
                          >
                            <Edit2 size={16} />
                          </Link>
                          <button
                            className="btn-ghost icon-btn"
                            title="More options"
                          >
                            <MoreHorizontal size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default DashboardPage;
