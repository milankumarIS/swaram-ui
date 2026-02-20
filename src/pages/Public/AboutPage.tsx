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
          <h1 className="legal-title">Architecting Voice Intelligence</h1>
          <p className="legal-subtitle">
            Synthesizing the Signal and the Silence.
          </p>
        </header>

        <div className="legal-section">
          <p>
            Swaram is a high-precision audio platform engineered for the next 
            generation of digital orchestration. We believe that professional 
            institutions deserve a voice that is not just heard, but 
            commanding in its authority and warmth.
          </p>
          <p>
            Traditional voice AI platforms act as fragmented middleware—resulting 
            in critical latency, robotic cadence, and degraded user trust. We 
            have engineered an integrated, low-latency pipeline from the 
            foundation, optimized for the milliseconds that define human connection.
          </p>
        </div>

        <section className="legal-section">
          <h2 className="section-heading">01 GENESIS</h2>
          <h3>Our Engineering Philosophy</h3>
          <p>
            At Swaram, we focus on the space between the notes. Our technology 
            is designed to bridge the chasm between artificial intelligence and 
            human intuition.
          </p>
          <p>
            The project began with a fundamental observation: the digital world 
            suffers from a systemic lack of audio presence. While LLMs have 
            unlocked a new era of intelligence, that intelligence remains 
            trapped behind high-latency bridges and robotic delivery.
          </p>
          <p>
            We founded Swaram to build the missing conversational infrastructure. 
            We synthesize the "Signal"—the core intelligence of modern AI—with 
            the "Silence"—the precision, respect, and UX depth required for 
            institutional-grade applications.
          </p>
        </section>

        <section className="legal-section">
          <h2 className="section-heading">02 TECHNOLOGY</h2>
          <div className="legal-grid">
            <div className="legal-card">
              <Mic className="legal-icon" />
              <h3>Precision Audio</h3>
              <p>
                Sub-500ms latency built on enterprise-grade real-time
                infrastructure.
              </p>
            </div>
            <div className="legal-card">
              <Shield className="legal-icon" />
              <h3>Global Voice Engine</h3>
              <p>
                Native support for 10+ Indian languages and global voices via
                Deepgram, Sarvam, and ElevenLabs.
              </p>
            </div>
            <div className="legal-card">
              <Zap className="legal-icon" />
              <h3>Adaptive Intelligence</h3>
              <p>
                Support for Gemini, GPT-4o, Claude, and specialized open-source
                models.
              </p>
            </div>
          </div>
        </section>

        <section className="legal-section">
          <h2 className="section-heading">03 MISSION</h2>
          <p>
            Our mission is to democratize high-fidelity voice AI. Whether you're
            an independent developer or a global enterprise, Swaram provides the
            tools to make your digital presence speak with authority, empathy,
            and technical excellence.
          </p>
        </section>

        <section className="legal-section">
          <h2 className="section-heading">04 WHAT'S NEXT</h2>
          <div className="future-card">
            <h3> Our Own Voice Engine (Coming Soon)</h3>
            <p>
              We're building proprietary STT and TTS engines optimized
              specifically for conversational AI. This will deliver:
            </p>
            <ul className="legal-list">
              <li>70% lower costs compared to current third-party solutions</li>
              <li>Sub-200ms latency for true real-time feel</li>
              <li>Deeper language support with better accent handling</li>
              <li>
                Complete data sovereignty—your conversations never touch
                external APIs
              </li>
            </ul>
            <p style={{ marginTop: "24px" }}>
              <strong>Why this matters:</strong> Right now, you bring your own
              API keys for voice services. Soon, you won't need them. We'll
              handle everything end-to-end at a fraction of the cost, with
              performance that makes current solutions feel ancient.
            </p>
          </div>
        </section>

     
      </div>
    </div>
  );
};

export default AboutPage;
