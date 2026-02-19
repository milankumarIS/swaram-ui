// src/pages/Public/TermsPage.tsx
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import "./LegalPages.css";

const TermsPage = () => {
  return (
    <div className="legal-page animate-in">
      <div className="container-narrow">
        <header className="legal-header">
          <Link to="/" className="back-link">
            <ArrowLeft size={16} /> Back
          </Link>
          <h1 className="legal-title">Terms of Service</h1>
          <p className="legal-subtitle">Last updated: February 2024 — Swaram</p>
        </header>

        <section className="legal-section">
          <h2 className="section-heading">01 AGREEMENT TO TERMS</h2>
          <p>
            By accessing or using Swaram, you agree to be bound by these Terms of Service. 
            If you disagree with any part of the terms, you may not access the service.
          </p>
        </section>

        <section className="legal-section">
          <h2 className="section-heading">02 USE LICENSE</h2>
          <p>
            Permission is granted to temporarily use the Swaram platform for personal 
            or commercial electronic browsing and agent configuration. This is the grant 
            of a license, not a transfer of title, and under this license you may not:
          </p>
          <ul className="legal-list">
            <li>Attempt to decompile or reverse engineer any software contained on Swaram.</li>
            <li>Remove any copyright or other proprietary notations from the materials.</li>
            <li>Use the service for any illegal or unauthorized purpose.</li>
            <li>Bypass any measures we may use to prevent or restrict access to the service.</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2 className="section-heading">03 DISCLAIMER</h2>
          <p>
            The materials on Swaram's website are provided on an 'as is' basis. 
            Swaram makes no warranties, expressed or implied, and hereby disclaims 
            and negates all other warranties including, without limitation, implied 
            warranties or conditions of merchantability, fitness for a particular 
            purpose, or non-infringement of intellectual property or other violation of rights.
          </p>
        </section>

        <section className="legal-section">
          <h2 className="section-heading">04 LIMITATIONS</h2>
          <p>
            In no event shall Swaram or its suppliers be liable for any damages 
            (including, without limitation, damages for loss of data or profit, or 
            due to business interruption) arising out of the use or inability to use 
            the materials on Swaram's website.
          </p>
        </section>

        <footer className="legal-footer">
          <p>© 2024 SWARAM</p>
        </footer>
      </div>
    </div>
  );
};

export default TermsPage;
