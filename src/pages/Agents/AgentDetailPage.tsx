// src/pages/Agents/AgentDetailPage.tsx
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import Loader from "../../components/shared/Loader";
import { getAgent, deleteAgent, getAgentSessions } from "../../services/services";
import type { Agent, AgentSession } from "../../global";
import { ArrowLeft, Edit2, Trash2, Copy, Check, Terminal, Activity, Shield, Hash } from "lucide-react";
import "./AgentDetailPage.css";

const API_BASE = (import.meta as any).env?.VITE_API_URL ?? "http://localhost:4002";

const AgentDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [agent,    setAgent]    = useState<Agent | null>(null);
  const [sessions, setSessions] = useState<AgentSession[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState("");
  const [copiedEmbed, setCopiedEmbed] = useState(false);

  useEffect(() => {
    if (!id) return;
    Promise.all([
      getAgent(id).then((r) => setAgent(r.data)),
      getAgentSessions(id).then((r) => setSessions(r.data)).catch(() => {}),
    ])
      .catch(() => setError("Failed to load agent."))
      .finally(() => setLoading(false));
  }, [id]);

  const handleDeactivate = async () => {
    if (!id || !confirm("Deactivate this agent? The embed widget will stop working.")) return;
    await deleteAgent(id);
    navigate("/dashboard");
  };

  const embedCode = agent
    ? `<iframe\n  src="${API_BASE.replace("4002", "5173")}/embed/${agent.slug}?token=${agent.embed_token}"\n  width="400"\n  height="600"\n  allow="microphone"\n  style="border:none;border-radius:16px;"\n></iframe>`
    : "";

  const copyEmbed = () => {
    navigator.clipboard.writeText(embedCode);
    setCopiedEmbed(true);
    setTimeout(() => setCopiedEmbed(false), 2000);
  };

  if (loading) return (
    <Layout>
      <div className="loader-container">
        <Loader size={48} />
      </div>
    </Layout>
  );

  if (error || !agent) return (
    <Layout>
      <div className="error-container">
        {error || "Agent not found"}
      </div>
    </Layout>
  );

  return (
    <Layout>
      <div className="agent-detail">
        <header className="agent-detail-header">
          <Link to="/dashboard" className="back-link" style={{ marginBottom: '12px' }}>
            <ArrowLeft size={14} /> Back to Dashboard
          </Link>
          <div className="agent-detail-title-row">
            <div>
              <h1 className="agent-detail-name">{agent.name}</h1>
              <div className="agent-detail-slug">
                <Terminal size={12} style={{ marginRight: '6px' }} /> /{agent.slug}
              </div>
            </div>
            <div className="agent-detail-actions">
              <Link to={`/agents/${agent.id}/edit`} className="btn-ghost">
                <Edit2 size={14} /> Edit
              </Link>
              <button className="btn-danger" onClick={handleDeactivate}>
                <Trash2 size={14} /> Deactivate
              </button>
            </div>
          </div>
        </header>

        <div className="agent-detail-grid">
          {/* Config Summary */}
          <div className="detail-card">
            <h2 className="detail-card-title">
              <span>Configuration</span>
              <Shield size={14} />
            </h2>
            <dl className="detail-dl">
              <div>
                <dt>LLM Model</dt>
                <dd>{agent.llm_model}</dd>
              </div>
              <div>
                <dt>Voice Avatar</dt>
                <dd>{agent.tts_voice}</dd>
              </div>
              <div>
                <dt>Language (STT)</dt>
                <dd>{agent.stt_language_code}</dd>
              </div>
              <div>
                <dt>Max Call Duration</dt>
                <dd>{agent.max_call_duration_sec}s</dd>
              </div>
              <div>
                <dt>Status</dt>
                <dd>
                  <span style={{ color: agent.is_active ? 'var(--accent)' : 'var(--text-tertiary)' }}>
                    {agent.is_active ? 'Active' : 'Idle'}
                  </span>
                </dd>
              </div>
            </dl>
          </div>

          {/* Embed Snippet */}
          <div className="detail-card">
            <h2 className="detail-card-title">
              <span>Embed Widget</span>
              <Terminal size={14} />
            </h2>
            <p style={{ fontSize: "12px", color: "var(--text-tertiary)", marginBottom: "16px", lineHeight: 1.5 }}>
              Integrate this agent into your website by pasting the code below.
            </p>
            <pre className="embed-code">{embedCode}</pre>
            <button className="copy-btn" onClick={copyEmbed}>
              {copiedEmbed ? <><Check size={14} /> Copied</> : <><Copy size={14} /> Copy Embed Code</>}
            </button>
          </div>

          {/* System Prompt */}
          <div className="detail-card full-width">
            <h2 className="detail-card-title">
              <span>System Instructions</span>
              <Terminal size={14} />
            </h2>
            <pre className="system-prompt-preview">{agent.system_prompt}</pre>
          </div>

          {/* Session History */}
          <div className="detail-card full-width">
            <h2 className="detail-card-title">
              <span>
                Recent Sessions <span className="session-count">{sessions.length}</span>
              </span>
              <Activity size={14} />
            </h2>
            {sessions.length === 0 ? (
              <p style={{ color: "var(--text-tertiary)", fontSize: "14px", padding: '24px 0' }}>
                No interaction data available yet.
              </p>
            ) : (
              <table className="sessions-table">
                <thead>
                  <tr>
                    <th><Hash size={10} /> Session ID</th>
                    <th>Started</th>
                    <th>Duration</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {sessions.map((s) => (
                    <tr key={s.id}>
                      <td><code style={{ fontSize: "11px", opacity: 0.6 }}>{s.id.slice(0, 12)}...</code></td>
                      <td>{new Date(s.started_at).toLocaleString()}</td>
                      <td>{s.duration_sec != null ? `${s.duration_sec}s` : "–"}</td>
                      <td>
                        <span className={`session-status ${s.ended_at ? "ended" : "active"}`}>
                          {s.ended_at ? "Completed" : "Active"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AgentDetailPage;
