// src/pages/Public/LandingPage.tsx
import { Link } from "react-router-dom";
import { useAuth } from "../../components/context/AuthContext";
import { Mic, Sliders, Code2, ArrowRight } from "lucide-react";
import "./LandingPage.css";

const features = [
  {
    icon: <Mic className="feature-icon-svg" />,
    title: "Precision Voice",
    desc: "Real-time voice conversations with sub-500ms latency. Powered by Gemini and Sarvam AI.",
  },
  {
    icon: <Sliders className="feature-icon-svg" />,
    title: "Deep Configuration",
    desc: "Refine every aspect of your agent's personality, from system prompts to voice characteristics.",
  },
  {
    icon: <Code2 className="feature-icon-svg" />,
    title: "Seamless Integration",
    desc: "One iframe snippet. Paste it into any website and let your brand speak for itself.",
  },
];

const LandingPage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="landing">
      {/* Hero Section */}
      <section className="landing-hero animate-in">
        <div className="container">
          <div className="hero-accent-mark"></div>
          <h1 className="hero-title">
            Your website,<br />
            finally able to <span className="italic">speak.</span>
          </h1>
          <p className="hero-subtitle">
            Build a voice AI agent in minutes. Drop an iframe into any website.<br />
            Let your visitors talk to your brand — in their language.
          </p>
          <div className="hero-cta-group">
            <Link to={isAuthenticated ? "/dashboard" : "/register"} className="btn-primary">
              Start Building — Free
            </Link>
            <a href="#how-it-works" className="btn-see-live">
              See it live <ArrowRight size={16} />
            </a>
          </div>
          
          <div className="hero-stats">
            <span>GEMINI · SARVAM · LIVEKIT</span>
            <span>//</span>
            <span>10+ Indian Languages</span>
            <span>//</span>
            <span>&lt;500ms latency</span>
          </div>

          <div className="hero-preview">
            <div className="preview-window">
              <div className="preview-header">
                <div className="preview-dot"></div>
                <span>ACME Portfolio Assistant</span>
              </div>
              <div className="preview-body">
                <div className="waveform">
                  <div className="waveform-bar"></div>
                  <div className="waveform-bar"></div>
                  <div className="waveform-bar"></div>
                  <div className="waveform-bar"></div>
                  <div className="waveform-bar"></div>
                </div>
                <p className="preview-caption">"Hello! How can I help you today?"</p>
              </div>
              <div className="preview-footer">
                <div className="preview-btn">🎙 Start Conversation</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="landing-features">
        <div className="container">
          <div className="grid grid-features">
            {features.map((f, i) => (
              <div key={i} className="card animate-in" style={{ animationDelay: `${(i + 1) * 100}ms` }}>
                <div className="feature-icon-wrapper">{f.icon}</div>
                <h3 className="feature-title">{f.title}</h3>
                <p className="feature-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="landing-steps">
        <div className="container">
          <div className="steps-header">
            <span className="label">Process</span>
            <h2 className="section-title">Silence to <span className="italic">Signal</span></h2>
          </div>
          <div className="steps-container">
            <div className="step-item animate-in">
              <span className="step-num">01</span>
              <div>
                <h3 className="step-title">Register</h3>
                <p className="step-desc">Create your account and get immediate access to the dashboard.</p>
              </div>
            </div>
            <div className="step-item animate-in" style={{ animationDelay: '100ms' }}>
              <span className="step-num">02</span>
              <div>
                <h3 className="step-title">Write your agent's prompt</h3>
                <p className="step-desc">Define instructions, context, and personality in plain text.</p>
              </div>
            </div>
            <div className="step-item animate-in" style={{ animationDelay: '200ms' }}>
              <span className="step-num">03</span>
              <div>
                <h3 className="step-title">Pick voice & language</h3>
                <p className="step-desc">Select from high-quality regional voices and configure STT/TTS.</p>
              </div>
            </div>
            <div className="step-item animate-in" style={{ animationDelay: '300ms' }}>
              <span className="step-num">04</span>
              <div>
                <h3 className="step-title">Copy your iframe code</h3>
                <p className="step-desc">One line of code is all you need to go live on your site.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="landing-pricing">
        <div className="container">
          <div className="pricing-grid">
            <div className="card pricing-card">
              <span className="pricing-plan">Starter</span>
              <div className="pricing-price">$0<span className="price-mo">/mo</span></div>
              <ul className="pricing-features">
                <li>1 Agent</li>
                <li>100 mins/mo</li>
                <li>Community support</li>
              </ul>
              <Link to="/register" className="btn-secondary">Get Started</Link>
            </div>
            <div className="card pricing-card card-accent">
              <span className="pricing-plan">Pro</span>
              <div className="pricing-price">$49<span className="price-mo">/mo</span></div>
              <ul className="pricing-features">
                <li>5 Agents</li>
                <li>Unlimited mins</li>
                <li>Email support</li>
              </ul>
              <Link to="/register" className="btn-primary">Go Pro</Link>
            </div>
            <div className="card pricing-card">
              <span className="pricing-plan">Business</span>
              <div className="pricing-price">$199<span className="price-mo">/mo</span></div>
              <ul className="pricing-features">
                <li>Unlimited Agents</li>
                <li>Priority Latency</li>
                <li>Enterprise SLA</li>
              </ul>
              <Link to="/register" className="btn-secondary">Contact Us</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="container">
          <div className="footer-top">
            <div className="footer-brand">
              <span className="brand-logo">VOICE AGENT</span>
              <p className="brand-tagline">Precision audio meets editorial warmth.</p>
            </div>
            <div className="footer-links">
              <div className="link-group">
                <Link to="/">Home</Link>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/settings">Settings</Link>
              </div>
              <div className="link-group">
                <a href="#">X (Twitter)</a>
                <a href="#">GitHub</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <span className="copyright">© 2024 VOICE AGENT PLATFORM — ALL RIGHTS RESERVED.</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
