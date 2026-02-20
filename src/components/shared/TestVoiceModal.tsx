// src/components/shared/TestVoiceModal.tsx
import { useState, useEffect } from "react";
import { X, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { createPreviewAgent } from "../../services/services";
import type { CreateAgentPayload } from "../../global";
import "./TestVoiceModal.css";

interface TestVoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  agentConfig: Partial<CreateAgentPayload>;
}

const TestVoiceModal = ({
  isOpen,
  onClose,
  agentConfig,
}: TestVoiceModalProps) => {
  const [embedUrl, setEmbedUrl] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setEmbedUrl("");
      setLoading(true);
      setError("");
      return;
    }

    // Create preview agent when modal opens
    const createPreview = async () => {
      try {
        setLoading(true);
        setError("");

        // Create preview agent with current form data
        const response = await createPreviewAgent(
          agentConfig as CreateAgentPayload,
        );
        const { embedUrl: url } = response.data;

        setEmbedUrl(url);
        setLoading(false);

        toast.success("Preview agent created! Auto-deletes in 5 minutes.", {
          duration: 4000,
        });
      } catch (err: any) {
        console.error("Preview agent creation failed:", err);
        setError(
          err?.response?.data?.error || "Failed to create preview agent",
        );
        setLoading(false);
        toast.error("Failed to create preview agent");
      }
    };

    createPreview();
  }, [isOpen, agentConfig]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2 className="modal-title">Test Voice Agent</h2>
            <p className="modal-subtitle">
              Preview your agent configuration (auto-deletes in 5 min)
            </p>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          {loading ? (
            <div className="modal-loading">
              <Loader2 size={32} className="spinner" />
              <p>Creating preview agent...</p>
            </div>
          ) : error ? (
            <div className="modal-error">
              <p>{error}</p>
              <button className="btn-primary" onClick={onClose}>
                Close
              </button>
            </div>
          ) : (
            <div className="modal-embed-container">
              <iframe
                src={embedUrl}
                width="100%"
                height="600"
                allow="microphone"
                style={{
                  border: "none",
                  borderRadius: "12px",
                  background: "var(--bg-primary)",
                }}
                title="Voice Agent Preview"
              />
            </div>
          )}
        </div>

        <div className="modal-footer">
          <p className="modal-footer-note">
            💡 Tip: Edit the system prompt based on how the agent responds, then
            test again to refine behavior.
          </p>
          <button className="btn-secondary" onClick={onClose}>
            Close & Continue Editing
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestVoiceModal;
