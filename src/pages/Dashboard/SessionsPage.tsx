// src/pages/Dashboard/SessionsPage.tsx
import { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import Loader from "../../components/shared/Loader";
import { getAgents, getAgentSessions } from "../../services/services";
import type { Agent, AgentSession } from "../../global";
import { MessageSquare } from "lucide-react";
import "./SessionsPage.css";

const SessionsPage = () => {
  const [sessions, setSessions] = useState<(AgentSession & { agentName: string })[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch all agents, then their sessions. 
    // Ideally the backend should have a global sessions endpoint, but we work with what we have.
    getAgents().then(async (res) => {
      const agents: Agent[] = res.data;
      const allSessions: any[] = [];
      
      for (const agent of agents) {
        try {
          const sRes = await getAgentSessions(agent.id);
          const sData = sRes.data.map((s: any) => ({ ...s, agentName: agent.name }));
          allSessions.push(...sData);
        } catch (e) {}
      }
      
      // Sort by date desc
      allSessions.sort((a, b) => new Date(b.started_at).getTime() - new Date(a.started_at).getTime());
      setSessions(allSessions);
      setLoading(false);
    });
  }, []);

  return (
    <Layout>
      <div className="sessions-page">
        <header className="page-header">
          <h1 className="page-title">Global Sessions</h1>
          <p className="page-subtitle">Historical call data across all active agents</p>
        </header>

        {loading ? (
          <div className="loader-container">
            <Loader size={48} />
          </div>
        ) : (
          <div className="sessions-list">
            {sessions.length === 0 ? (
              <div className="empty-state">
                <MessageSquare size={48} strokeWidth={1} />
                <h3>No sessions detected</h3>
                <p>Calls will appear here once users interact with your agents.</p>
              </div>
            ) : (
              <table className="sessions-table">
                <thead>
                  <tr>
                    <th>Agent</th>
                    <th>Started</th>
                    <th>Duration</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {sessions.map((s) => (
                    <tr key={s.id}>
                      <td className="agent-col">{s.agentName}</td>
                      <td>{new Date(s.started_at).toLocaleString()}</td>
                      <td>{s.duration_sec ? `${s.duration_sec}s` : "–"}</td>
                      <td>
                        <span className={`session-status ${s.ended_at ? 'ended' : 'active'}`}>
                          {s.ended_at ? 'Completed' : 'Active'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SessionsPage;
