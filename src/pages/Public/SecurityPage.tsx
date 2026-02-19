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
          <p className="legal-subtitle">Enterprise-grade protection for your conversations.</p>
        </header>

        <section className="legal-section">
          <h2 className="section-heading">01 DATA ENCRYPTION</h2>
          <div className="legal-grid">
            <div className="legal-card">
              <Lock className="legal-icon" />
              <h3>At Rest</h3>
              <p>All sensitive information is encrypted using AES-256 standard at Swaram.</p>
            </div>
            <div className="legal-card">
              <Globe className="legal-icon" />
              <h3>In Transit</h3>
              <p>Communication between your site and our servers is secured via TLS 1.3.</p>
            </div>
          </div>
        </section>

        <section className="legal-section">
          <h2 className="section-heading">02 INFRASTRUCTURE</h2>
          <p>
            Our platform is built on top of world-class infrastructure providers. 
            We utilize multi-tenant data isolation to ensure that your agent configuration 
            and session data are never accessible to other customers.
          </p>
        </section>

        <section className="legal-section">
          <h2 className="section-heading">03 COMPLIANCE</h2>
          <p>
            We are committed to helping our customers meet their regulatory requirements. 
            Our platform supports configurations designed to be GDPR and HIPAA-aligned.
          </p>
        </section>

        <footer className="legal-footer">
          <p>© 2024 SWARAM</p>
        </footer>
      </div>
    </div>
  );
};

export default SecurityPage;
