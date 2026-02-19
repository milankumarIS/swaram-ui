// src/pages/Public/AboutPage.tsx
import { Link } from "react-router-dom";
import { ArrowLeft, Mic, Shield, Zap } from "lucide-react";
import "./LegalPages.css";

const AboutPage = () => {
  return (
    <div className="legal-page animate-in">
      <div className="container-narrow">
        <header className="legal-header">
          <Link to="/" className="back-link">
            <ArrowLeft size={16} /> Back
          </Link>
          <h1 className="legal-title">About Swaram</h1>
          <p className="legal-subtitle">Synthesizing the Signal and the Silence.</p>
        </header>

        <div className="legal-section">
          <p>
            Swaram is a precision audio platform built for the next generation of digital interaction. 
            We believe that every brand deserves a voice that is not just heard, but <span className="italic">felt</span>.
          </p>
        </div>

        <section className="legal-section">
          <h2 className="section-heading">01 ORIGIN</h2>
          <h3>Our Philosophy</h3>
          <p>At Swaram, we focus on the space between the notes. Our technology is designed to bridge the gap between human intuition and machine intelligence.</p>
          <p>
            Swaram was born from a simple observation: the internet is too quiet. 
            While LLMs have unlocked incredible text-based intelligence, the warmth, 
            nuance, and efficiency of the human voice stayed locked behind complex APIs 
            and high-latency bridges.
          </p>
          <p>
            We built Swaram to synthesize the "Signal"—the intelligence of modern AI—with 
            the "Silence"—the precision and respect for user experience that professional 
            brands demand.
          </p>
        </section>

        <section className="legal-section">
          <h2 className="section-heading">02 TECHNOLOGY</h2>
          <div className="legal-grid">
            <div className="legal-card">
              <Mic className="legal-icon" />
              <h3>Precision Audio</h3>
              <p>Sub-500ms latency built on enterprise-grade real-time infrastructure.</p>
            </div>
            <div className="legal-card">
              <Shield className="legal-icon" />
              <h3>Global Voice Engine</h3>
              <p>Native support for 10+ Indian languages and global voices via Deepgram, Sarvam, and ElevenLabs.</p>
            </div>
            <div className="legal-card">
              <Zap className="legal-icon" />
              <h3>Adaptive Intelligence</h3>
              <p>Support for Gemini, GPT-4o, Claude, and specialized open-source models.</p>
            </div>
          </div>
        </section>

        <section className="legal-section">
          <h2 className="section-heading">03 MISSION</h2>
          <p>
            Our mission is to democratize high-fidelity voice AI. Whether you're an 
            independent developer or a global enterprise, Swaram provides the 
            tools to make your digital presence speak with authority, empathy, 
            and technical excellence.
          </p>
        </section>

        <footer className="legal-footer">
          <p>© 2024 SWARAM</p>
        </footer>
      </div>
    </div>
  );
};

export default AboutPage;
