// src/pages/Agents/EditAgentPage.tsx
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Layout from "../../components/layout/Layout";
import Loader from "../../components/shared/Loader";
import { getAgent, updateAgent } from "../../services/services";
import type { Agent } from "../../global";
import "./CreateAgentPage.css"; // Reuse create agent styles

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

const LLM_MODELS = ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-1.5-pro"];
const LANG_CODES = ["en-IN", "hi-IN", "ta-IN", "te-IN", "kn-IN", "bn-IN", "mr-IN"];
const TTS_VOICES = ["meera", "anushka", "riya", "kairav", "arjun", "sonia"];

const EditAgentPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving,  setSaving]  = useState(false);
  const [apiError, setApiError] = useState("");

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

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
      <div style={{ display: "flex", justifyContent: "center", padding: "5rem" }}>
        <Loader size={48} />
      </div>
    </Layout>
  );

  return (
    <Layout>
      <div className="create-agent">
        <div className="create-agent-header">
          <Link to={`/agents/${id}`} className="back-link">← Back to Agent</Link>
          <h1 className="create-agent-title">Edit Agent</h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
            Leave API key fields empty to keep existing keys.
          </p>
        </div>

        {apiError && <div className="ca-error-banner">{apiError}</div>}

        <form className="create-agent-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="ca-panel">
            <div className="form-group">
              <label className="form-label">Agent Name *</label>
              <input className="form-input" {...register("name")} />
              {errors.name && <span className="form-error">{errors.name.message}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">System Prompt *</label>
              <textarea className="form-input" rows={5} {...register("system_prompt")} style={{ resize: "vertical" }} />
              {errors.system_prompt && <span className="form-error">{errors.system_prompt.message}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Welcome Message *</label>
              <input className="form-input" {...register("welcome_message")} />
            </div>

            <div className="form-group">
              <label className="form-label">LLM Model</label>
              <select className="form-input" {...register("llm_model")}>
                {LLM_MODELS.map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Gemini API Key (leave blank to keep existing)</label>
              <input className="form-input" type="password" placeholder="AIzaSy…" {...register("llm_api_key")} />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">STT Language</label>
                <select className="form-input" {...register("stt_language_code")}>
                  {LANG_CODES.map((l) => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">TTS Voice</label>
                <select className="form-input" {...register("tts_voice")}>
                  {TTS_VOICES.map((v) => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Sarvam API Key (leave blank to keep existing)</label>
              <input className="form-input" type="password" placeholder="sk-…" {...register("sarvam_api_key")} />
            </div>

            <div className="form-group">
              <label className="form-label">Max Call Duration (seconds)</label>
              <input className="form-input" type="number" {...register("max_call_duration_sec", { valueAsNumber: true })} />
            </div>

            <div className="form-group">
              <label className="form-label">Allowed Domains</label>
              <input className="form-input" placeholder="mywebsite.com, app.mywebsite.com" {...register("allowed_domains")} />
              <span className="form-hint">Comma-separated. Empty = allow all origins.</span>
            </div>

            <div className="form-group">
              <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer", fontSize: "0.875rem", color: "var(--text-secondary)" }}>
                <input type="checkbox" {...register("is_active")} />
                Agent is active (embed widget works when active)
              </label>
            </div>
          </div>

          <div className="ca-actions">
            <Link to={`/agents/${id}`} className="btn-ghost" style={{ textDecoration: "none" }}>Cancel</Link>
            <button type="submit" className="btn-primary" disabled={saving}>
              {saving ? "Saving…" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default EditAgentPage;
