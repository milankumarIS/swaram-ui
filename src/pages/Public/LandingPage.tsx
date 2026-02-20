// src/pages/Public/LandingPage.tsx
import { Link } from "react-router-dom";
import { useAuth } from "../../components/context/AuthContext";
import { Mic, Code2, ArrowRight, Languages } from "lucide-react";
import { motion } from "framer-motion";
import "./LandingPage.css";

const LandingPage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="landing">
      {/* Hero Section */}
      <motion.section className="landing-hero animate-in">
        <div className="container">
          <div className="hero-accent-mark"></div>
          <h1 className="hero-title">
            Transform Your Website Into A
            <br />
            <span className="italic">Living Conversation</span>
          </h1>
          <p className="hero-subtitle">
            The only voice AI platform that feels truly human. No lag. No
            robotic pauses.
            <br />
            Just seamless, natural conversations that happen in real-time —
            embedded in a single line of code.
          </p>
          <div className="hero-cta-group">
            <Link
              to={isAuthenticated ? "/dashboard" : "/register"}
              className="btn-primary"
            >
              Start Building — Free
            </Link>
            <a href="#how-it-works" className="btn-see-live">
              See it live <ArrowRight size={16} />
            </a>
          </div>

          <div className="hero-stats">
            <span>GEMINI · CLAUDE · GPT-4o</span>
            <span>//</span>
            <span>10+ Indian Languages</span>
            <span>//</span>
            <span>&lt;500ms latency</span>
          </div>

          <div className="hero-preview">
            <div className="preview-label">
              Try it live — Talk to our platform assistant
            </div>
            <div className="preview-embed-container">
              <iframe
                src="https://swaram.varsaka.com/embed/ai-assistant-aEYFhW?token=7e5aa592-f2fc-49b3-b858-d6f75974ac19"
                width="100%"
                height="450"
                allow="microphone"
                style={{
                  border: "none",
                  borderRadius: "16px",
                  background: "var(--bg-card)",
                  // boxShadow: "0 20px 60px rgba(0, 0, 0, 0.4)",
                }}
                title="Swaram Platform Demo"
              />
            </div>
            <p className="preview-note">
              Click "Start Conversation" and ask about features, pricing, or
              how Swaram works!
            </p>
          </div>
        </div>
      </motion.section>

      {/* Trusted By Ticker */}
      <motion.section className="landing-ticker">
        <div className="ticker-wrapper">
          <div className="ticker-content">
            {/* Set 1 */}
            <span>GEMINI 2.0</span>
            <span className="ticker-dot"></span>
            <span>CLAUDE 3.5 SONNET</span>
            <span className="ticker-dot"></span>
            <span>GPT-4o</span>
            <span className="ticker-dot"></span>
            <span>LLAMA 3.1</span>
            <span className="ticker-dot"></span>
            <span>MISTRAL LARGE</span>
            <span className="ticker-dot"></span>
            <span>SARVAM AI</span>
            <span className="ticker-dot"></span>
            <span>ELEVENLABS</span>
            <span className="ticker-dot"></span>
            <span>DEEPGRAM</span>
            <span className="ticker-dot"></span>
            <span>OPENAI TTS</span>
            <span className="ticker-dot"></span>
            {/* Set 2 (Duplicate for infinite loop) */}
            <span>GEMINI 2.0</span>
            <span className="ticker-dot"></span>
            <span>CLAUDE 3.5 SONNET</span>
            <span className="ticker-dot"></span>
            <span>GPT-4o</span>
            <span className="ticker-dot"></span>
            <span>LLAMA 3.1</span>
            <span className="ticker-dot"></span>
            <span>MISTRAL LARGE</span>
            <span className="ticker-dot"></span>
            <span>SARVAM AI</span>
            <span className="ticker-dot"></span>
            <span>ELEVENLABS</span>
            <span className="ticker-dot"></span>
            <span>DEEPGRAM</span>
            <span className="ticker-dot"></span>
            <span>OPENAI TTS</span>
            <span className="ticker-dot"></span>
          </div>
        </div>
      </motion.section>

      {/* Bento Grid Features */}
      <motion.section className="landing-features">
        <div className="container">
          <header className="section-header">
            <span className="section-tag">ENGINEERING EXCELLENCE</span>
            <h2 className="section-title">The Architecture of Trust</h2>
            <p className="section-description">
              We bridge the gap between artificial intelligence and human
              intuition with institutional-grade conversational infrastructure.
            </p>
          </header>

          <div className="bento-grid">
            <div className="bento-item main-feature animate-in">
              <div className="bento-visual">
                <div className="visual-overlay"></div>
                <img
                  src="https://images.unsplash.com/photo-1607723619307-260d7a1e1f12?q=80&w=1129&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="AI Latency"
                  className="bento-bg"
                />
              </div>
              <div className="bento-content">
                <Mic className="bento-icon" />
                <h3>Truly Real-Time Voice</h3>
                <p>
                  Sub-500ms end-to-end latency. Most platforms take 2-3 seconds.
                  We respond before your visitor finishes their thought.
                </p>
              </div>
            </div>

            <div
              className="bento-item secondary-feature identity-forge animate-in"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="bento-visual">
                <div className="forge-orb-container">
                  <div className="forge-orb"></div>
                  <div className="forge-scan-line"></div>
                </div>
              </div>
              <div className="bento-content">
                <Mic size={24} className="feature-icon" />
                <h3>Voice Identity Engineering</h3>
                <p>
                  Deploy agents with consistent, institutional tone and
                  unmatched acoustic clarity.
                </p>
              </div>
            </div>

            <div
              className="bento-item secondary-feature animate-in"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="bento-visual">
                <div className="visual-overlay"></div>
                <img
                  src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1000&auto=format&fit=crop"
                  alt="SDK Integration"
                  className="bento-bg"
                />
              </div>
              <div className="bento-content">
                <Code2 className="bento-icon" />
                <h3>Conversation, Not Commands</h3>
                <p>
                  Natural turn-taking, interruptions, and context awareness. It
                  feels like talking to a person, not a chatbot.
                </p>
              </div>
            </div>

            <div
              className="bento-item wide-feature animate-in"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="bento-visual">
                <div className="visual-overlay"></div>
                <img
                  src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop"
                  alt="Regional Depth"
                  className="bento-bg"
                />
              </div>
              <div className="bento-content">
                <Languages className="bento-icon" />

                <div
                  className="bento-text-group"
                  style={{ marginBottom: "12px" }}
                >
                  <h3>Multilingual Precision</h3>
                  <p>
                    Native support for 10+ regional languages with zero code
                    overhead and perfect phonetic accuracy.
                  </p>
                </div>
                <div className="languages-tag-cloud">
                  <span>नमस्ते</span>
                  <span>வணக்கம்</span>
                  <span>নমস্কার</span>
                  <span>Hello</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Use Cases Section */}
      <motion.section className="landing-use-cases" id="how-it-works">
        <div className="container">
          <div className="use-cases-layout">
            <div className="use-cases-content">
              <span className="section-tag">Use Cases</span>
              <h2 className="use-case-title">
                One platform,
                <br />
                infinite dialogue.
              </h2>

              <div className="use-case-list">
                <div className="use-case-item active">
                  <h4>01 / Customer Support</h4>
                  <p>
                    Resolve inquiries 24/7 without the overhead of a call
                    center.
                  </p>
                </div>
                <div className="use-case-item">
                  <h4>02 / Sales Guidance</h4>
                  <p>
                    Guide customers through complex purchases with
                    conversational ease.
                  </p>
                </div>
                <div className="use-case-item">
                  <h4>03 / Language Education</h4>
                  <p>
                    Interactive practice for learners in a low-pressure
                    environment.
                  </p>
                </div>
              </div>
            </div>

            <div className="use-cases-visual">
              <div className="iphone-mockup">
                <motion.div
                  className="iphone-screen"
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.5 }}
                  variants={{
                    hidden: { opacity: 0 },
                    show: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.8,
                        delayChildren: 0.5,
                      },
                    },
                  }}
                >
                  <motion.div
                    className="chat-bubble bot"
                    variants={{
                      hidden: { opacity: 0, x: -20, scale: 0.9 },
                      show: { opacity: 1, x: 0, scale: 1 },
                    }}
                  >
                    "How can I help you today?"
                  </motion.div>
                  <motion.div
                    className="chat-bubble user"
                    variants={{
                      hidden: { opacity: 0, x: 20, scale: 0.9 },
                      show: { opacity: 1, x: 0, scale: 1 },
                    }}
                  >
                    "I need to track my order."
                  </motion.div>
                  <motion.div
                    className="chat-bubble bot"
                    variants={{
                      hidden: { opacity: 0, x: -20, scale: 0.9 },
                      show: { opacity: 1, x: 0, scale: 1 },
                    }}
                  >
                    "Searching... I've found your delivery."
                  </motion.div>
                  <motion.div
                    className="chat-bubble bot"
                    variants={{
                      hidden: { opacity: 0, x: -20, scale: 0.9 },
                      show: { opacity: 1, x: 0, scale: 1 },
                    }}
                  >
                    "Your order #45821 was shipped yesterday via Express
                    Delivery."
                  </motion.div>
                  <motion.div
                    className="chat-bubble user"
                    variants={{
                      hidden: { opacity: 0, x: 20, scale: 0.9 },
                      show: { opacity: 1, x: 0, scale: 1 },
                    }}
                  >
                    "Can I see the live tracking link?"
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* How It Works */}
      <motion.section className="landing-steps">
        <div className="container">
          <div className="steps-header">
            <span className="label">Process</span>
            <h2 className="section-title">
              Silence to <span className="italic">Signal</span>
            </h2>
          </div>
          <div className="steps-container">
            <div className="step-item animate-in">
              <span className="step-num">01</span>
              <div>
                <h3 className="step-title">Register</h3>
                <p className="step-desc">
                  Create your account and get immediate access to the dashboard.
                </p>
              </div>
            </div>
            <div
              className="step-item animate-in"
              style={{ animationDelay: "100ms" }}
            >
              <span className="step-num">02</span>
              <div>
                <h3 className="step-title">Write your agent's prompt</h3>
                <p className="step-desc">
                  Define instructions, context, and personality in plain text.
                </p>
              </div>
            </div>
            <div
              className="step-item animate-in"
              style={{ animationDelay: "200ms" }}
            >
              <span className="step-num">03</span>
              <div>
                <h3 className="step-title">Pick voice & language</h3>
                <p className="step-desc">
                  Select from high-quality regional voices and configure
                  STT/TTS.
                </p>
              </div>
            </div>
            <div
              className="step-item animate-in"
              style={{ animationDelay: "300ms" }}
            >
              <span className="step-num">04</span>
              <div>
                <h3 className="step-title">Copy your iframe code</h3>
                <p className="step-desc">
                  One line of code is all you need to go live on your site.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Pricing Section */}
      {/* <section className="landing-pricing">
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
      </section> */}

      {/* Pricing section end */}
    </div>
  );
};

export default LandingPage;
