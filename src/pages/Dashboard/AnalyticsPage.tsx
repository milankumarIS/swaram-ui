// src/pages/Dashboard/AnalyticsPage.tsx
import Layout from "../../components/layout/Layout";
import { TrendingUp, Activity } from "lucide-react";
import "./AnalyticsPage.css";

const AnalyticsPage = () => {
  const stats = [
    { label: "Total Conversations", value: "1,284", change: "+12.5%", icon: <Activity size={20} /> },
    { label: "Average Duration", value: "4m 12s", change: "-2.4%", icon: <Activity size={20} /> },
    { label: "Completion Rate", value: "94.2%", change: "+0.8%", icon: <TrendingUp size={20} /> },
    { label: "Unique Users", value: "412", change: "+5.3%", icon: <Activity size={20} /> },
  ];

  return (
    <Layout>
      <div className="analytics-page">
        <header className="page-header">
          <h1 className="page-title">Analytics</h1>
          <p className="page-subtitle">Deep signal analysis and performance metrics</p>
        </header>

        <div className="analytics-grid">
          {stats.map((stat, i) => (
            <div key={i} className="stat-card">
              <div className="stat-card-header">
                <div className="stat-icon">{stat.icon}</div>
                <span className="stat-change">{stat.change}</span>
              </div>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}

          <div className="chart-placeholder-card full-width">
            <div className="card-header">
              <h3 className="card-title1">Call Volume (24h)</h3>
            </div>
            <div className="mock-chart-container">
              {[...Array(24)].map((_, i) => (
                <div 
                  key={i} 
                  className="mock-chart-bar" 
                  style={{ height: `${20 + Math.random() * 60}%` }}
                ></div>
              ))}
            </div>
            <div className="chart-labels">
              <span>00:00</span>
              <span>12:00</span>
              <span>23:59</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AnalyticsPage;
