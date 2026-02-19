// src/pages/Public/LandingPage.tsx
import { Link } from "react-router-dom";
import { useAuth } from "../../components/context/AuthContext";
import "./LandingPage.css";

const features = [
  {
    icon: "🎙️",
    title: "Conversational Voice AI",
    desc: "Real-time voice conversations powered by Sarvam STT/TTS and Google Gemini with sub-second latency.",
  },
  {
    icon: "🌐",
    title: "1-Click Embed",
    desc: "Get an iframe snippet after creating your agent. Paste it on any website — done.",
  },
  {
    icon: "🔒",
    title: "Secure by Design",
    desc: "API keys encrypted with AES-256-GCM. Domain whitelisting protects your embed token.",
  },
  {
    icon: "🗣️",
    title: "Multi-Language Support",
    desc: "Supports English, Hindi, Tamil, Telugu, Kannada, Bengali, Marathi, and more Indian languages.",
  },
  {
    icon: "📊",
    title: "Session Analytics",
    desc: "Every call is logged with full transcript. Review conversations from your dashboard.",
  },
  {
    icon: "⚡",
    title: "LiveKit Powered",
    desc: "Enterprise-grade WebRTC via self-hosted LiveKit. Low latency, scalable to thousands of users.",
  },
];

const LandingPage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="landing">
      {/* Hero */}
      <section className="landing-hero">
        <div className="landing-hero-bg" />
        <div className="landing-hero-content">
          <div className="landing-badge">
            <span>✨</span> Powered by LiveKit · Gemini · Sarvam AI
          </div>
          <h1 className="landing-h1">
            Deploy Voice AI Agents<br />
            <span className="gradient-text">in Minutes</span>
          </h1>
          <p className="landing-subtitle">
            Create conversational AI voice bots, customize them with your own system prompt, and embed them
            anywhere with a single iframe. No backend needed — yours is already running.
          </p>
          <div className="landing-cta-group">
            {isAuthenticated ? (
              <Link to="/dashboard" className="btn-primary">Go to Dashboard →</Link>
            ) : (
              <>
                <Link to="/register" className="btn-primary">Start for Free →</Link>
                <Link to="/login" className="btn-ghost">Sign In</Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="landing-features">
        <p className="section-label">What You Get</p>
        <h2 className="section-title">Everything to build voice agents</h2>
        <p className="section-subtitle">
          A fully managed platform so you focus on crafting the perfect AI personality — not the infrastructure.
        </p>
        <div className="features-grid">
          {features.map((f) => (
            <div key={f.title} className="feature-card">
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="landing-cta-section">
        <p className="section-label">Ready to launch?</p>
        <h2 className="section-title">Build your first voice agent today</h2>
        <p className="section-subtitle" style={{ margin: "0.75rem auto 2rem" }}>
          Free plan includes 2 concurrent sessions. Upgrade anytime.
        </p>
        <Link to={isAuthenticated ? "/agents/new" : "/register"} className="btn-primary">
          Create Your Agent →
        </Link>
      </section>
    </div>
  );
};

export default LandingPage;
