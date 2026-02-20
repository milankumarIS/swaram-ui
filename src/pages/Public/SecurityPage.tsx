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
          <h2 className="section-heading">01 DATA SOVEREIGNTY & CREDENTIAL SECURITY</h2>
          <p
            style={{
              fontSize: "17px",
              color: "var(--text-primary)",
              marginBottom: "24px",
              lineHeight: "1.6"
            }}
          >
            We operate on a zero-trust architecture. Your sensitive credentials, 
            including Gemini and Sarvam API keys, are treated with maximum 
            cryptographic rigor.
          </p>
          <div className="security-promise">
            <div className="promise-item">
              <Lock className="legal-icon" size={28} />
              <div>
                <h3>AES-256-GCM Hardware Encryption</h3>
                <p>
                  Credentials are encrypted using industry-standard AES-256-GCM 
                  before storage. This process occurs at the application layer, 
                  ensuring that raw keys never touch our persistent storage 
                  mechanisms in cleartext.
                </p>
              </div>
            </div>
            <div className="promise-item">
              <Globe className="legal-icon" size={28} />
              <div>
                <h3>Stateless Execution Environment</h3>
                <p>
                  Our worker architecture is fundamentally stateless. Decryption 
                  only occurs within volatile memory during active session orchestration. 
                  Once a session terminates, the ephemeral memory is cleared, 
                  leaving no residual footprint of your secrets.
                </p>
              </div>
            </div>
            <div className="promise-item">
              <Lock className="legal-icon" size={28} />
              <div>
                <h3>Cryptographic Compartmentalization</h3>
                <p>
                  Every agent configuration utilizes unique initialization 
                  vectors for encryption. This architecture ensures total 
                  isolation; an anomaly in one environment has zero horizontal 
                  impact on the security posture of another.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="legal-section">
          <h2 className="section-heading">02 INFRASTRUCTURE & ORCHESTRATION</h2>
          <p>
            <strong>High-Availability Real-Time Mesh:</strong> Swaram's 
            audio-pipeline is built on dedicated high-performance clusters. 
            We utilize optimized WebRTC stacks to ensure that every millisecond 
            of voice data is channeled through secure, low-latency tunnels.
          </p>
          <p>
            <strong>Virtual Private Cloud Isolation:</strong> All compute 
            resources are deployed within strictly defined VPCs. We implement 
            granular network policies and ingress/egress filtering to prevent 
            unauthorized lateral movement or data exfiltration.
          </p>
          <p>
            <strong>Auditability & Logging:</strong> While we maintain 
            comprehensive system logs for performance monitoring, conversation 
            audio is never persisted. We prioritize the "Silence" as much as 
            the "Signal"—ensuring your users' privacy is respected by default.
          </p>
        </section>

        <section className="legal-section">
          <h2 className="section-heading">03 COMPLIANCE & GOVERNANCE</h2>
          <p>
            <strong>GDPR & International Standards:</strong> We adhere to the 
            principles of Privacy by Design and Privacy by Default. Our platform 
            provides the necessary primitives for data portability and the 
            Right to Erasure across all conversational data points.
          </p>
          <p>
            <strong>Application-Layer Protection:</strong> We provide mandatory 
            Origin Validation for all embedded agents. This cryptographic binding 
            ensures your agents only execute on domains you have explicitly 
            authorized, mitigating credential theft and unauthorized usage.
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
            Institutional Trust & Reliability
          </h2>
          <p style={{ marginBottom: "16px", lineHeight: "1.7" }}>
            The foundation of Swaram is built on the belief that conversational 
            AI must be as secure as it is intelligent. We have engineered our 
            pipeline to remove human intervention from the credential-handling 
            lifecycle.
          </p>
          <p style={{ lineHeight: "1.7" }}>
            <strong>Our Commitment:</strong> Your credentials are encrypted 
            immediately upon ingestion, isolated during execution, and protected 
            by the most advanced cryptographic standards available. We act as 
            the sterile bridge between your intelligence and your users' ears.
          </p>
          <p
            style={{
              marginTop: "24px",
              fontSize: "14px",
              color: "var(--text-secondary)",
            }}
          >
            For deep-dive technical security documentation or institutional 
            inquiries, contact{" "}
            <a
              href="mailto:info@varsaka.com"
              style={{ color: "var(--accent)", textDecoration: "underline" }}
            >
              info@varsaka.com
            </a>
            .
          </p>
        </section>

    
      </div>
    </div>
  );
};

export default SecurityPage;
