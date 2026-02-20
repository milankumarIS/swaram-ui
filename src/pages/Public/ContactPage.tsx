// src/pages/Public/ContactPage.tsx
import { Link } from "react-router-dom";
import { ArrowLeft, Mail, Globe } from "lucide-react";
import Layout from "../../components/layout/Layout";
import "./LegalPages.css";

const ContactPage = () => {
  return (
    <Layout>
      <div className="legal-page animate-in" style={{ padding: '2rem' }}>
        <div className="container-narrow">
          <header className="legal-header">
            <Link to="/dashboard" className="back-link">
              <ArrowLeft size={16} /> Back to Dashboard
            </Link>
            <h1 className="legal-title">Contact Us</h1>
            <p className="legal-subtitle">We're here to help you find your voice.</p>
          </header>

          <section className="legal-section">
            <div className="legal-grid" style={{gridTemplateColumns:'repeat(2, 1fr)'}}>
              <div className="legal-card">
                <Mail className="legal-icon" />
                <h3>Email Us</h3>
                <p>For support or inquiries, reach out to:</p>
                <a href="mailto:info@varsaka.com"  style={{ color: 'var(--accent-primary)', textDecoration: 'none', fontWeight: '500' }}>
                  info@varsaka.com
                </a>
              </div>
              <div className="legal-card">
                <Globe className="legal-icon" />
                <h3>Company</h3>
                <p>Powered by</p>
                <a href="https://varsaka.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontWeight: 'bold' }}>
                  Varsaka Pvt Ltd 
                </a>
              </div>
            </div>
          </section>

          <section className="legal-section">
            <h2 className="section-heading">GET IN TOUCH</h2>
            <p>
              Whether you have questions about our voice AI agents, pricing, or 
              technical integration, our team is ready to assist you. 
              We typically respond to all inquiries within 24 hours.
            </p>
          </section>

          <footer className="legal-footer">
            <p>© 2026 SWARAM · VARSAKA PVT LTD</p>
          </footer>
        </div>
      </div>
    </Layout>
  );
};

export default ContactPage;
