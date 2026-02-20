// src/pages/Agents/CreateAgentPage.tsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Layout from "../../components/layout/Layout";
import TestVoiceModal from "../../components/shared/TestVoiceModal";
import { createAgent } from "../../services/services";
import { Mic, ArrowRight, ArrowLeft, Headphones } from "lucide-react";
import "./CreateAgentPage.css";

const schema = z.object({
  name: z.string().min(2, "Agent name must be at least 2 characters"),
  system_prompt: z
    .string()
    .min(10, "System prompt must be at least 10 characters"),
  welcome_message: z.string().min(5, "Welcome message is required"),
  llm_model: z.string(),
  llm_api_key: z.string().min(1, "Gemini API key is required"),
  sarvam_api_key: z.string().min(1, "Sarvam API key is required"),
  stt_language_code: z.string(),
  tts_voice: z.string(),
  tts_language_code: z.string(),
  max_call_duration_sec: z.number().min(30).max(1800),
  allowed_domains: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const LLM_MODELS = ["gemini-2.0-flash", "gemini-1.5-pro"];
const LANG_CODES = [
  "en-IN",
  "hi-IN",
  "ta-IN",
  "te-IN",
  "kn-IN",
  "bn-IN",
  "mr-IN",
];
const TTS_VOICES = ["meera", "anushka", "riya", "kairav", "arjun", "sonia"];

const steps = [
  { id: 1, label: "Identity" },
  { id: 2, label: "Voice" },
  { id: 3, label: "Intelligence" },
  { id: 4, label: "Security" },
];

const CreateAgentPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showTestModal, setShowTestModal] = useState(false);

  const {
    register,
    handleSubmit,
    trigger,
    control,
    getValues,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      llm_model: "gemini-2.0-flash",
      stt_language_code: "en-IN",
      tts_voice: "meera",
      tts_language_code: "en-IN",
      max_call_duration_sec: 300,
      welcome_message: "Hello! How can I help you today?",
    },
  });

  const agentName = useWatch({
    control,
    name: "name",
    defaultValue: "My Agent",
  });
  const ttsVoice = useWatch({
    control,
    name: "tts_voice",
    defaultValue: "meera",
  });
  const welcomeMessage = useWatch({
    control,
    name: "welcome_message",
    defaultValue: "Hello! How can I help you today?",
  });
  const sttLanguage = useWatch({
    control,
    name: "stt_language_code",
    defaultValue: "en-IN",
  });
  const llmApiKey = useWatch({
    control,
    name: "llm_api_key",
    defaultValue: "",
  });
  const sarvamApiKey = useWatch({
    control,
    name: "sarvam_api_key",
    defaultValue: "",
  });

  const nextStep = async () => {
    let fields: (keyof FormData)[] = [];
    if (step === 1) fields = ["name", "system_prompt", "welcome_message"];
    else if (step === 2) fields = ["stt_language_code", "tts_voice"];
    else if (step === 3)
      fields = ["llm_model", "llm_api_key", "sarvam_api_key"];

    const isValid = await trigger(fields);
    if (isValid) setStep((s) => Math.min(s + 1, steps.length));
  };

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setApiError("");
    try {
      const allowedDomains = data.allowed_domains
        ? data.allowed_domains
            .split(",")
            .map((d) => d.trim())
            .filter(Boolean)
        : [];
      await createAgent({ ...data, allowed_domains: allowedDomains });
      navigate("/dashboard");
    } catch (err: any) {
      setApiError(err?.response?.data?.error || "Failed to create agent.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="create-agent">
        <header className="create-agent-header">
          <Link to="/dashboard" className="back-link">
            <ArrowLeft size={14} /> Back to Dashboard
          </Link>
          <h1 className="create-agent-title">New Voice Agent</h1>
        </header>

        <div className="builder-split">
          {/* Left: Form */}
          <div className="builder-main">
            <nav className="steps-nav">
              {steps.map((s) => (
                <div
                  key={s.id}
                  className={`step-nav-item ${step === s.id ? "active" : ""}`}
                  onClick={() => step > s.id && setStep(s.id)}
                >
                  {s.id}. {s.label}
                </div>
              ))}
            </nav>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="ca-panel">
                {apiError && <div className="ca-error-banner">{apiError}</div>}

                {step === 1 && (
                  <div className="form-step animate-in">
                    <header className="form-header">
                      <h2 className="form-step-title">Agent Identity</h2>
                    </header>
                    <div className="form-group">
                      <label className="label">Display Name</label>
                      <input
                        className="input"
                        placeholder="e.g. Support Specialist"
                        {...register("name")}
                      />
                      {errors.name && (
                        <span className="error-text">
                          {errors.name.message}
                        </span>
                      )}
                    </div>
                    <div className="form-group">
                      <label className="label">System Instructions</label>
                      <textarea
                        className="input"
                        rows={6}
                        placeholder="Define the behavior, personality, and knowledge of your agent..."
                        {...register("system_prompt")}
                      />
                      {errors.system_prompt && (
                        <span className="error-text">
                          {errors.system_prompt.message}
                        </span>
                      )}
                    </div>
                    <div className="form-group">
                      <label className="label">Welcome Message</label>
                      <input
                        className="input"
                        placeholder="What the agent says first..."
                        {...register("welcome_message")}
                      />
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="form-step animate-in">
                    <header className="form-header">
                      <h2 className="form-step-title">Voice & Language</h2>
                    </header>
                    <div className="form-row">
                      <div className="form-group">
                        <label className="label">Input Language (STT)</label>
                        <select
                          className="input"
                          {...register("stt_language_code")}
                        >
                          {LANG_CODES.map((l) => (
                            <option key={l} value={l}>
                              {l}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="form-group">
                        <label className="label">Output Language (TTS)</label>
                        <select
                          className="input"
                          {...register("tts_language_code")}
                        >
                          {LANG_CODES.map((l) => (
                            <option key={l} value={l}>
                              {l}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="label">Voice Avatar</label>
                      <select className="input" {...register("tts_voice")}>
                        {TTS_VOICES.map((v) => (
                          <option key={v} value={v}>
                            {v}
                          </option>
                        ))}
                      </select>
                      <span className="form-hint">
                        Sarvam AI high-fidelity neural voices.
                      </span>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="form-step animate-in">
                    <header className="form-header">
                      <p className="wizard-subtitle">
                        Design the intelligence and personality of your Swaram
                        agent.
                      </p>
                    </header>
                    <div className="form-group">
                      <label className="label">Large Language Model</label>
                      <select className="input" {...register("llm_model")}>
                        {LLM_MODELS.map((m) => (
                          <option key={m} value={m}>
                            {m}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="label">Gemini API Key</label>
                      <input
                        className="input"
                        type="password"
                        placeholder="AIzaSy..."
                        {...register("llm_api_key")}
                      />
                    </div>
                    <div className="form-group">
                      <label className="label">Sarvam API Key</label>
                      <input
                        className="input"
                        type="password"
                        placeholder="sk-..."
                        {...register("sarvam_api_key")}
                      />
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div className="form-step animate-in">
                    <header className="form-header">
                      <h2 className="form-step-title">Security & Limits</h2>
                    </header>
                    <div className="form-group">
                      <label className="label">
                        Max Call Duration (Seconds)
                      </label>
                      <input
                        className="input"
                        type="number"
                        {...register("max_call_duration_sec", {
                          valueAsNumber: true,
                        })}
                      />
                    </div>
                    <div className="form-group">
                      <label className="label">Allowed Domains</label>
                      <input
                        className="input"
                        placeholder="domain.com, sub.domain.com"
                        {...register("allowed_domains")}
                      />
                      <span className="form-hint">
                        Comma separated. Empty allows all domains.
                      </span>
                    </div>
                    <div className="ca-summary">
                      <h3>Ready to deploy.</h3>
                      <p>
                        Once created, you'll receive an embed code to place your
                        agent on any website.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="ca-actions">
                <button
                  type="button"
                  className="btn-ghost"
                  disabled={step === 1}
                  onClick={() => setStep((s) => s - 1)}
                >
                  Back
                </button>
                {step < steps.length ? (
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={nextStep}
                    style={{ display: "flex", gap: "4px" }}
                  >
                    Continue <ArrowRight size={16} />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="btn-primary"
                    disabled={loading}
                  >
                    {loading ? "Creating..." : "Deploy Agent"}
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Right: Live Preview */}
          <div className="builder-sidebar">
            <div className="preview-sticky">
              <div className="preview-card">
                <span className="preview-label">Live Preview</span>

                <div className="preview-voice-orb">
                  <div className="preview-orb-inner"></div>
                  <Mic size={32} className="preview-orb-mic" />
                </div>

                <span className="preview-agent-name">
                  {agentName || "Agent Name"}
                </span>
                <span className="preview-agent-status">
                  {llmApiKey && sarvamApiKey
                    ? "Ready to speak"
                    : "Configure API keys"}
                </span>

                {welcomeMessage && (
                  <div
                    style={{
                      marginTop: "16px",
                      padding: "12px",
                      background: "rgba(139, 92, 246, 0.1)",
                      borderRadius: "8px",
                      fontSize: "0.875rem",
                      color: "var(--text-secondary)",
                      fontStyle: "italic",
                      textAlign: "center",
                      border: "1px solid rgba(139, 92, 246, 0.2)",
                    }}
                  >
                    "{welcomeMessage}"
                  </div>
                )}

                <div className="preview-waveform-mock">
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className="mock-bar"
                      style={{
                        height: `${Math.random() * 20 + 10}px`,
                        animationDelay: `${i * 0.1}s`,
                      }}
                    ></div>
                  ))}
                </div>

                <div
                  style={{
                    marginTop: "24px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    fontSize: "0.8125rem",
                    color: "var(--text-muted)",
                  }}
                >
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span>Voice:</span>
                    <span
                      style={{
                        color: "var(--text-secondary)",
                        fontWeight: 500,
                      }}
                    >
                      {ttsVoice}
                    </span>
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span>Language:</span>
                    <span
                      style={{
                        color: "var(--text-secondary)",
                        fontWeight: 500,
                      }}
                    >
                      {sttLanguage}
                    </span>
                  </div>
                </div>

                <div style={{ marginTop: "24px" }}>
                  <button
                    type="button"
                    className="btn-ghost"
                    style={{
                      width: "100%",
                      gap: "12px",
                      display: "flex",
                      justifyContent: "center",
                    }}
                    onClick={() => setShowTestModal(true)}
                    disabled={!llmApiKey || !sarvamApiKey}
                    title={
                      !llmApiKey || !sarvamApiKey
                        ? "Configure API keys to test"
                        : "Test your agent"
                    }
                  >
                    <Headphones size={16} /> Test Voice Agent
                  </button>
                  {!llmApiKey ||
                    (!sarvamApiKey && (
                      <p
                        style={{
                          fontSize: "0.75rem",
                          color: "var(--text-muted)",
                          textAlign: "center",
                          marginTop: "8px",
                        }}
                      >
                        Complete Step 3 to test
                      </p>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Test Voice Modal */}
      <TestVoiceModal
        isOpen={showTestModal}
        onClose={() => setShowTestModal(false)}
        agentConfig={getValues()}
      />
    </Layout>
  );
};

export default CreateAgentPage;
