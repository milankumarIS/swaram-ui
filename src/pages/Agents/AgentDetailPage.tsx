// src/pages/Agents/AgentDetailPage.tsx
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import Loader from "../../components/shared/Loader";
import { getAgent, deleteAgent, getAgentSessions } from "../../services/services";
import type { Agent, AgentSession } from "../../global";
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
      <div style={{ display: "flex", justifyContent: "center", padding: "5rem" }}>
        <Loader size={48} />
      </div>
    </Layout>
  );

  if (error || !agent) return (
    <Layout>
      <div style={{ color: "var(--error)", textAlign: "center", padding: "3rem" }}>
        {error || "Agent not found"}
      </div>
    </Layout>
  );

  return (
    <Layout>
      <div className="agent-detail">
        <div className="agent-detail-header">
          <Link to="/dashboard" className="back-link">← Dashboard</Link>
          <div className="agent-detail-title-row">
            <div>
              <h1 className="agent-detail-name">{agent.name}</h1>
              <code className="agent-detail-slug">/{agent.slug}</code>
            </div>
            <div className="agent-detail-actions">
              <Link to={`/agents/${agent.id}/edit`} className="btn-ghost">Edit</Link>
              <button className="btn-danger" onClick={handleDeactivate}>Deactivate</button>
            </div>
          </div>
        </div>

        <div className="agent-detail-grid">
          {/* Config Summary */}
          <div className="detail-card">
            <h2 className="detail-card-title">Configuration</h2>
            <dl className="detail-dl">
              <div>
                <dt>LLM Model</dt>
                <dd><code>{agent.llm_model}</code></dd>
              </div>
              <div>
                <dt>TTS Voice</dt>
                <dd>{agent.tts_voice} ({agent.tts_language_code})</dd>
              </div>
              <div>
                <dt>STT Language</dt>
                <dd>{agent.stt_language_code}</dd>
              </div>
              <div>
                <dt>Max Duration</dt>
                <dd>{agent.max_call_duration_sec}s</dd>
              </div>
              <div>
                <dt>Welcome Message</dt>
                <dd>"{agent.welcome_message}"</dd>
              </div>
              <div>
                <dt>Allowed Domains</dt>
                <dd>{agent.allowed_domains.length > 0 ? agent.allowed_domains.join(", ") : "All (development)"}</dd>
              </div>
            </dl>
          </div>

          {/* Embed Snippet */}
          <div className="detail-card">
            <h2 className="detail-card-title">Embed Widget</h2>
            <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "1rem" }}>
              Paste this iframe into any website to add the voice chat widget.
            </p>
            <pre className="embed-code">{embedCode}</pre>
            <button className="copy-btn" onClick={copyEmbed}>
              {copiedEmbed ? "✓ Copied!" : "Copy Embed Code"}
            </button>
          </div>

          {/* System Prompt */}
          <div className="detail-card full-width">
            <h2 className="detail-card-title">System Prompt</h2>
            <pre className="system-prompt-preview">{agent.system_prompt}</pre>
          </div>

          {/* Session History */}
          <div className="detail-card full-width">
            <h2 className="detail-card-title">
              Recent Sessions
              <span className="session-count">{sessions.length}</span>
            </h2>
            {sessions.length === 0 ? (
              <p style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>
                No sessions yet. Share the embed widget to start receiving calls.
              </p>
            ) : (
              <table className="sessions-table">
                <thead>
                  <tr>
                    <th>Session ID</th>
                    <th>Started</th>
                    <th>Duration</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {sessions.map((s) => (
                    <tr key={s.id}>
                      <td><code style={{ fontSize: "0.75rem" }}>{s.id.slice(0, 8)}…</code></td>
                      <td>{new Date(s.started_at).toLocaleString()}</td>
                      <td>{s.duration_sec != null ? `${s.duration_sec}s` : "–"}</td>
                      <td>
                        <span className={`session-status ${s.ended_at ? "ended" : "active"}`}>
                          {s.ended_at ? "Ended" : "Active"}
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
