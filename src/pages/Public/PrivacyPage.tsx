// src/pages/Public/PrivacyPage.tsx
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import "./LegalPages.css";

const PrivacyPage = () => {
  return (
    <div className="legal-page animate-in">
      <div className="container-narrow">
        <header className="legal-header">
          <Link to="/" className="back-link">
            <ArrowLeft size={16} /> Back
          </Link>
          <h1 className="legal-title">Privacy Policy</h1>
          <p className="legal-subtitle">Version 1.0 — Swaram</p>
          <p>
            This Privacy Policy describes how Swaram ("we", "us", or "our")
            collects, uses, and shares your personal information when you use our services.
          </p>
        </header>

        <section className="legal-section">
          <h2 className="section-heading">01 INFORMATION COLLECTION</h2>
          <p>
            By using Swaram, you agree to the collection and use of information in
            accordance with this policy. We collect information that you provide directly to us when you create an
            account, such as your name, email address, and billing information.
            Additionally, we gather "Communications Data" which includes audio
            transcripts, recordings (if enabled), and call metadata.
          </p>
        </section>

        <section className="legal-section">
          <h2 className="section-heading">02 DATA USAGE</h2>
          <p>We use the information we collect to:</p>
          <ul className="legal-list">
            <li>Provide, maintain, and improve our services.</li>
            <li>Process transactions and send related information.</li>
            <li>Send technical notices, updates, and security alerts.</li>
            <li>Develop new features and optimize low-latency voice models.</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2 className="section-heading">03 DATA SHARING</h2>
          <p>
            We do not sell your personal data. We may share information with trusted 
            infrastructure partners and model providers (like Gemini and OpenAI) for 
            the sole purpose of providing the voice service, or as required by law 
            to comply with legal obligations.
          </p>
        </section>

        <section className="legal-section">
          <h2 className="section-heading">04 DATA SECURITY</h2>
          <p>
            We implement commercially reasonable safeguards to protect your information 
            from unauthorized access, use, or disclosure. All data is encrypted 
            both at rest and in transit.
          </p>
        </section>

    
      </div>
    </div>
  );
};

export default PrivacyPage;
