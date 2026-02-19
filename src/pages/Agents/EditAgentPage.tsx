// src/pages/Agents/EditAgentPage.tsx
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Layout from "../../components/layout/Layout";
import Loader from "../../components/shared/Loader";
import { getAgent, updateAgent } from "../../services/services";
import type { Agent } from "../../global";
import { Mic, ArrowLeft, Save, Headphones } from "lucide-react";
import "./CreateAgentPage.css"; 

const schema = z.object({
  name:                 z.string().min(2),
  system_prompt:        z.string().min(10),
  welcome_message:      z.string().min(5),
  llm_model:            z.string(),
  llm_api_key:          z.string().optional(),
  sarvam_api_key:       z.string().optional(),
  stt_language_code:    z.string(),
  tts_voice:            z.string(),
  tts_language_code:    z.string(),
  max_call_duration_sec: z.number().min(30).max(1800),
  allowed_domains:      z.string().optional(),
  is_active:            z.boolean(),
});

type FormData = z.infer<typeof schema>;

const LLM_MODELS = ["gemini-2.0-flash", "gemini-1.5-pro"];
const LANG_CODES = ["en-IN", "hi-IN", "ta-IN", "te-IN", "kn-IN", "bn-IN", "mr-IN"];
const TTS_VOICES = ["meera", "anushka", "riya", "kairav", "arjun", "sonia"];

const EditAgentPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving,  setSaving]  = useState(false);
  const [apiError, setApiError] = useState("");

  const { register, handleSubmit, reset, control } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const agentName = useWatch({ control, name: "name", defaultValue: "Agent" });
  const ttsVoice = useWatch({ control, name: "tts_voice", defaultValue: "meera" });
  const isActive = useWatch({ control, name: "is_active" });

  useEffect(() => {
    if (!id) return;
    getAgent(id)
      .then((res) => {
        const a: Agent = res.data;
        reset({
          name: a.name,
          system_prompt: a.system_prompt,
          welcome_message: a.welcome_message,
          llm_model: a.llm_model,
          stt_language_code: a.stt_language_code,
          tts_voice: a.tts_voice,
          tts_language_code: a.tts_language_code,
          max_call_duration_sec: a.max_call_duration_sec,
          allowed_domains: a.allowed_domains.join(", "),
          is_active: a.is_active,
        });
      })
      .catch(() => setApiError("Failed to load agent."))
      .finally(() => setLoading(false));
  }, [id, reset]);

  const onSubmit = async (data: FormData) => {
    if (!id) return;
    setSaving(true);
    setApiError("");
    try {
      const allowed_domains = data.allowed_domains
        ? data.allowed_domains.split(",").map((d) => d.trim()).filter(Boolean)
        : [];
      const payload: any = { ...data, allowed_domains };
      if (!payload.llm_api_key) delete payload.llm_api_key;
      if (!payload.sarvam_api_key) delete payload.sarvam_api_key;
      await updateAgent(id, payload);
      navigate(`/agents/${id}`);
    } catch (err: any) {
      setApiError(err?.response?.data?.error || "Failed to update agent.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <Layout>
      <div className="loader-container">
        <Loader size={48} />
      </div>
    </Layout>
  );

  return (
    <Layout>
      <div className="create-agent">
        <header className="create-agent-header">
          <Link to={`/agents/${id}`} className="back-link">
            <ArrowLeft size={14} /> Back to Agent
          </Link>
          <h1 className="create-agent-title">Edit Configuration</h1>
        </header>

        <div className="builder-split">
          <div className="builder-main">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="ca-panel">
                {apiError && <div className="ca-error-banner">{apiError}</div>}
                
                <section className="form-section">
                  <div className="form-group">
                    <label className="label">Agent Name</label>
                    <input className="input" {...register("name")} />
                  </div>
                  <div className="form-group">
                    <label className="label">Instructions</label>
                    <textarea className="input" rows={6} {...register("system_prompt")} />
                  </div>
                  <div className="form-group">
                    <label className="label">Welcome Message</label>
                    <input className="input" {...register("welcome_message")} />
                  </div>
                </section>

                <div className="form-row">
                  <div className="form-group">
                    <label className="label">LLM Model</label>
                    <select className="input" {...register("llm_model")}>
                      {LLM_MODELS.map((m) => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="label">Input Language</label>
                    <select className="input" {...register("stt_language_code")}>
                      {LANG_CODES.map((l) => <option key={l} value={l}>{l}</option>)}
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="label">Voice Avatar</label>
                    <select className="input" {...register("tts_voice")}>
                      {TTS_VOICES.map((v) => <option key={v} value={v}>{v}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="label">Max Duration (s)</label>
                    <input className="input" type="number" {...register("max_call_duration_sec", { valueAsNumber: true })} />
                  </div>
                </div>

                <div className="form-group">
                  <label className="label">Gemini API Key (optional)</label>
                  <input className="input" type="password" placeholder="••••••••••••" {...register("llm_api_key")} />
                  <span className="form-hint">Leave blank to keep existing key.</span>
                </div>

                <div className="form-group">
                  <label style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" }}>
                    <input type="checkbox" {...register("is_active")} style={{ width: "16px", height: "16px" }} />
                    <span style={{ fontSize: "14px", color: "var(--text-primary)" }}>Agent is active</span>
                  </label>
                </div>
              </div>

              <div className="ca-actions">
                <Link to={`/agents/${id}`} className="btn-ghost" style={{ textDecoration: "none" }}>Cancel</Link>
                <button type="submit" className="btn-primary" disabled={saving}>
                  {saving ? "Saving..." : "Save Changes"} <Save size={16} />
                </button>
              </div>
            </form>
          </div>

          <div className="builder-sidebar">
            <div className="preview-sticky">
              <div className="preview-card">
                <span className="preview-label">Live Preview</span>
                
                <div className="preview-voice-orb">
                  <div className="preview-orb-inner" style={{ animationPlayState: isActive ? 'running' : 'paused' }}></div>
                  <Mic size={32} className="preview-orb-mic" style={{ opacity: isActive ? 1 : 0.3 }} />
                </div>

                <span className="preview-agent-name">{agentName}</span>
                <span className="preview-agent-status" style={{ color: isActive ? 'var(--accent)' : 'var(--text-tertiary)' }}>
                  {isActive ? 'Ready to speak' : 'Deactivated'}
                </span>

                <div className="preview-waveform-mock">
                  {[...Array(12)].map((_, i) => (
                    <div 
                      key={i} 
                      className="mock-bar" 
                      style={{ 
                        height: isActive ? `${Math.random() * 20 + 10}px` : '4px',
                        animationDelay: `${i * 0.1}s`,
                        opacity: isActive ? 0.4 : 0.1
                      }}
                    ></div>
                  ))}
                </div>

                <div style={{ marginTop: "40px" }}>
                  <button className="btn-ghost" style={{ width: "100%", gap: "12px" }} disabled={!isActive}>
                    <Headphones size={16} /> Test Voice: {ttsVoice}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EditAgentPage;
