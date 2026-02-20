// src/pages/Public/SecurityPage.tsx
import { Link } from "react-router-dom";
import { ArrowLeft, Lock, Globe } from "lucide-react";
import "./LegalPages.css";

const SecurityPage = () => {
  return (
    <div className="legal-page animate-in">
      <div className="container-narrow">
        <header className="legal-header">
          <Link to="/" className="back-link">
            <ArrowLeft size={16} /> Back
          </Link>
          <h1 className="legal-title">Security at Swaram</h1>
          <p className="legal-subtitle">
            Enterprise-grade protection for your conversations.
          </p>
        </header>

        <section className="legal-section">
          <h2 className="section-heading">01 YOUR API KEYS ARE YOURS ALONE</h2>
          <p
            style={{
              fontSize: "17px",
              color: "var(--text-primary)",
              marginBottom: "24px",
            }}
          >
            We understand you're trusting us with sensitive credentials. Here's
            exactly how we protect them:
          </p>
          <div className="security-promise">
            <div className="promise-item">
              <Lock className="legal-icon" size={28} />
              <div>
                <h3>Military-Grade Encryption</h3>
                <p>
                  Your Gemini and Sarvam API keys are encrypted with AES-256-GCM
                  before hitting our database. This is the same encryption
                  standard used by governments and banks. Even if someone gained
                  access to our servers, your keys would be mathematically
                  impossible to decrypt without our master key.
                </p>
              </div>
            </div>
            <div className="promise-item">
              <Globe className="legal-icon" size={28} />
              <div>
                <h3>Zero-Knowledge Architecture</h3>
                <p>
                  Your API keys are <strong>never</strong> accessible to our
                  team, our support staff, or our database admins. They're only
                  decrypted in-memory by the worker process handling your
                  agent's conversation—and immediately discarded after. We
                  literally cannot see your keys, even if we wanted to.
                </p>
              </div>
            </div>
            <div className="promise-item">
              <Lock className="legal-icon" size={28} />
              <div>
                <h3>Isolated Per-Agent Storage</h3>
                <p>
                  Each agent's credentials are stored separately with unique
                  encryption vectors. A breach of one agent's data doesn't
                  expose any others. Complete compartmentalization.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="legal-section">
          <h2 className="section-heading">02 INFRASTRUCTURE</h2>
          <p>
            <strong>Self-Hosted Real-Time Layer:</strong> Our voice
            infrastructure runs on dedicated servers we control, not shared
            cloud instances. Your conversations flow through isolated channels
            with enterprise-grade WebRTC technology optimized for low-latency
            audio streaming.
          </p>
          <p>
            <strong>Multi-Tenant Isolation:</strong> Every user's data lives in
            a completely separate namespace. Your agents, sessions, and
            transcripts are cryptographically isolated from other customers.
            There's no way for data to leak between accounts.
          </p>
          <p>
            <strong>Minimal Data Retention:</strong> We only store what you need
            for analytics (session transcripts, duration). Audio streams are
            never recorded or logged. Once your conversation ends, the voice
            data is gone forever.
          </p>
        </section>

        <section className="legal-section">
          <h2 className="section-heading">03 COMPLIANCE & TRANSPARENCY</h2>
          <p>
            <strong>GDPR-Ready:</strong> We provide data export, deletion, and
            portability tools. Your users can request their conversation data at
            any time, and you can delete it permanently.
          </p>
          <p>
            <strong>Domain Whitelisting:</strong> You control exactly which
            websites can embed your agents. If someone tries to use your embed
            code on an unauthorized domain, we reject the request. No
            exceptions.
          </p>
          <p>
            <strong>Audit Logs (Coming Soon):</strong> Track every API key
            access, every configuration change, and every session start. Full
            visibility into who accessed what, when.
          </p>
        </section>

        <section
          className="legal-section"
          style={{
            background: "var(--bg-surface)",
            border: "1px solid var(--border-dim)",
            borderRadius: "12px",
            padding: "32px",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "20px",
              marginBottom: "16px",
              color: "var(--text-primary)",
            }}
          >
            Why You Can Trust Us
          </h2>
          <p style={{ marginBottom: "16px" }}>
            We built Swaram because we were frustrated with clunky, insecure
            voice platforms. We wouldn't trust them with our API keys—so we
            built something we would trust.
          </p>
          <p>
            <strong>Our promise:</strong> Your credentials are encrypted with
            bank-level security, accessible only to the systems that need them
            (your agents), and never visible to humans—including us. If we ever
            change this policy, we'll give you 90 days notice and a full data
            export.
          </p>
          <p
            style={{
              marginTop: "24px",
              fontSize: "14px",
              color: "var(--text-secondary)",
            }}
          >
            Questions about security? Email us at{" "}
            <a
              href="mailto:info@varsaka.com"
              style={{ color: "var(--accent)", textDecoration: "underline" }}
            >
              info@varsaka.com
            </a>
            . We'll respond within 24 hours.
          </p>
        </section>

    
      </div>
    </div>
  );
};

export default SecurityPage;
