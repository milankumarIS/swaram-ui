// src/pages/Dashboard/DashboardPage.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../components/context/AuthContext";
import Layout from "../../components/layout/Layout";
import Loader from "../../components/shared/Loader";
import { getAgents } from "../../services/services";
import type { Agent } from "../../global";
import { Mic, Copy, Edit2, MoreHorizontal, Sparkles } from "lucide-react";
import "./DashboardPage.css";

const DashboardPage = () => {
  const { } = useAuth();
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getAgents()
      .then((res) => setAgents(res.data))
      .catch(() => setError("Failed to load agents."))
      .finally(() => setLoading(false));
  }, []);

  const copyEmbedUrl = (slug: string) => {
    const url = `${window.location.origin}/embed/${slug}`;
    navigator.clipboard.writeText(url);
    // TODO: Add toast notification
  };

  return (
    <Layout>
      <div className="dashboard">
        <header className="dashboard-header">
          <h1 className="page-title">Dashboard</h1>
          <Link to="/agents/new" className="btn-primary">+ New Agent</Link>
        </header>

        {/* Stats Bar */}
        <div className="stats-bar">
          <div className="stat-card">
            <span className="stat-value">{agents.length}</span>
            <span className="stat-label">Agents</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">1,240</span>
            <span className="stat-label">Total Sessions</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">4h 32m</span>
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
                <h2 className="empty-title">Your first agent is one prompt away.</h2>
                <Link to="/agents/new" className="btn-primary">+ Create Agent</Link>
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
                          <span className="agent-lang">{agent.stt_language_code}</span>
                        </td>
                        <td>
                          <span className={`badge ${agent.is_active ? 'badge-active' : 'badge-idle'}`}>
                            {agent.is_active ? 'Active' : 'Idle'}
                          </span>
                        </td>
                        <td>
                          <span className="stat-num">{Math.floor(Math.random() * 500)}</span>
                        </td>
                        <td className="actions-cell">
                          <button className="btn-ghost icon-btn" onClick={() => copyEmbedUrl(agent.slug)}>
                            <Copy size={16} />
                          </button>
                          <Link to={`/agents/${agent.id}/edit`} className="btn-ghost icon-btn">
                            <Edit2 size={16} />
                          </Link>
                          <button className="btn-ghost icon-btn">
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
