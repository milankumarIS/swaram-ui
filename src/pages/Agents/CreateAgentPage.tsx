// src/pages/Agents/CreateAgentPage.tsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Layout from "../../components/layout/Layout";
import { createAgent } from "../../services/services";
import "./CreateAgentPage.css";

const schema = z.object({
  name:                 z.string().min(2, "Agent name must be at least 2 characters"),
  system_prompt:        z.string().min(10, "System prompt must be at least 10 characters"),
  welcome_message:      z.string().min(5, "Welcome message is required"),
  llm_model:            z.string(),
  llm_api_key:          z.string().min(1, "Gemini API key is required"),
  sarvam_api_key:       z.string().min(1, "Sarvam API key is required"),
  stt_language_code:    z.string(),
  tts_voice:            z.string(),
  tts_language_code:    z.string(),
  max_call_duration_sec: z.number().min(30).max(1800),
  allowed_domains:      z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const LLM_MODELS  = ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-1.5-pro"];
const LANG_CODES  = ["en-IN", "hi-IN", "ta-IN", "te-IN", "kn-IN", "bn-IN", "mr-IN"];
const TTS_VOICES  = ["meera", "anushka", "riya", "kairav", "arjun", "sonia"];

const steps = [
  { id: 1, label: "Name & Identity" },
  { id: 2, label: "Personality" },
  { id: 3, label: "AI Config" },
  { id: 4, label: "Voice & Language" },
  { id: 5, label: "Security" },
];

const CreateAgentPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      llm_model: "gemini-2.5-flash",
      stt_language_code: "en-IN",
      tts_voice: "meera",
      tts_language_code: "en-IN",
      max_call_duration_sec: 300,
      welcome_message: "Hello! How can I help you today?",
    },
  });

  const { register, handleSubmit, trigger, formState: { errors } } = form;

  const nextStep = async () => {
    let valid = false;
    if (step === 1) valid = await trigger(["name"]);
    else if (step === 2) valid = await trigger(["system_prompt", "welcome_message"]);
    else if (step === 3) valid = await trigger(["llm_model", "llm_api_key"]);
    else if (step === 4) valid = await trigger(["sarvam_api_key", "stt_language_code", "tts_voice"]);
    else valid = true;
    if (valid) setStep((s) => Math.min(s + 1, steps.length));
  };

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setApiError("");
    try {
      const allowedDomains = data.allowed_domains
        ? data.allowed_domains.split(",").map((d) => d.trim()).filter(Boolean)
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
        <div className="create-agent-header">
          <Link to="/dashboard" className="back-link">← Dashboard</Link>
          <h1 className="create-agent-title">Create Voice Agent</h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
            Step {step} of {steps.length} — {steps[step - 1].label}
          </p>
        </div>

        {/* Step progress bar */}
        <div className="steps-progress">
          {steps.map((s) => (
            <div key={s.id} className={`step-dot ${s.id <= step ? "active" : ""} ${s.id < step ? "done" : ""}`}>
              {s.id < step ? "✓" : s.id}
            </div>
          ))}
        </div>

        {apiError && (
          <div className="ca-error-banner">{apiError}</div>
        )}

        <form className="create-agent-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="ca-panel">
            {/* STEP 1 — Name */}
            {step === 1 && (
              <>
                <div className="form-group">
                  <label className="form-label">Agent Name *</label>
                  <input className="form-input" placeholder='e.g. "Customer Support Bot"' {...register("name")} />
                  {errors.name && <span className="form-error">{errors.name.message}</span>}
                </div>
              </>
            )}

            {/* STEP 2 — Personality */}
            {step === 2 && (
              <>
                <div className="form-group">
                  <label className="form-label">System Prompt *</label>
                  <textarea
                    className="form-input"
                    rows={6}
                    placeholder="You are a helpful customer support agent for Acme Corp. Be friendly, concise, and professional..."
                    {...register("system_prompt")}
                    style={{ resize: "vertical" }}
                  />
                  {errors.system_prompt && <span className="form-error">{errors.system_prompt.message}</span>}
                </div>
                <div className="form-group">
                  <label className="form-label">Welcome Message *</label>
                  <input className="form-input" placeholder='e.g. "Hi! How can I help you today?"' {...register("welcome_message")} />
                  {errors.welcome_message && <span className="form-error">{errors.welcome_message.message}</span>}
                </div>
              </>
            )}

            {/* STEP 3 — AI Config */}
            {step === 3 && (
              <>
                <div className="form-group">
                  <label className="form-label">LLM Model</label>
                  <select className="form-input" {...register("llm_model")}>
                    {LLM_MODELS.map((m) => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Google Gemini API Key *</label>
                  <input className="form-input" type="password" placeholder="AIzaSy..." {...register("llm_api_key")} />
                  <span className="form-hint">Encrypted with AES-256-GCM before storage.</span>
                  {errors.llm_api_key && <span className="form-error">{errors.llm_api_key.message}</span>}
                </div>
              </>
            )}

            {/* STEP 4 — Voice & Language */}
            {step === 4 && (
              <>
                <div className="form-group">
                  <label className="form-label">Sarvam AI API Key *</label>
                  <input className="form-input" type="password" placeholder="sk-..." {...register("sarvam_api_key")} />
                  <span className="form-hint">Used for STT (speech-to-text) and TTS (text-to-speech).</span>
                  {errors.sarvam_api_key && <span className="form-error">{errors.sarvam_api_key.message}</span>}
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">STT Language</label>
                    <select className="form-input" {...register("stt_language_code")}>
                      {LANG_CODES.map((l) => <option key={l} value={l}>{l}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">TTS Language</label>
                    <select className="form-input" {...register("tts_language_code")}>
                      {LANG_CODES.map((l) => <option key={l} value={l}>{l}</option>)}
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">TTS Voice</label>
                  <select className="form-input" {...register("tts_voice")}>
                    {TTS_VOICES.map((v) => <option key={v} value={v}>{v}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Max Call Duration (seconds)</label>
                  <input
                    className="form-input"
                    type="number"
                    min={30}
                    max={1800}
                    {...register("max_call_duration_sec", { valueAsNumber: true })}
                  />
                </div>
              </>
            )}

            {/* STEP 5 — Security */}
            {step === 5 && (
              <>
                <div className="form-group">
                  <label className="form-label">Allowed Domains (optional)</label>
                  <input
                    className="form-input"
                    placeholder="mywebsite.com, app.mywebsite.com"
                    {...register("allowed_domains")}
                  />
                  <span className="form-hint">
                    Comma-separated domains. Leave empty to allow all origins (development only).
                  </span>
                </div>
                <div className="ca-summary">
                  <h3>Ready to create your agent!</h3>
                  <p>Your agent will be created with the settings you configured. You can edit it anytime from the dashboard.</p>
                </div>
              </>
            )}
          </div>

          {/* Navigation buttons */}
          <div className="ca-actions">
            {step > 1 && (
              <button type="button" className="btn-ghost" onClick={() => setStep((s) => s - 1)}>
                ← Back
              </button>
            )}
            {step < steps.length ? (
              <button type="button" className="btn-primary" onClick={nextStep}>
                Continue →
              </button>
            ) : (
              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? "Creating…" : "Create Agent 🎙️"}
              </button>
            )}
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default CreateAgentPage;
