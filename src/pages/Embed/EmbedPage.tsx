// src/pages/Embed/EmbedPage.tsx
// The LiveKit-powered voice widget — appears inside an iframe on customer websites.
// Mirrors KTX patterns: WelcomeView → SessionView (AudioVisualizer + Transcript + AgentControlBar)
import { useState, useRef, useEffect, useCallback } from "react";
import { useSearchParams, useParams } from "react-router-dom";
import {
  Room,
  RoomEvent,
  ParticipantEvent,
  RemoteParticipant,
  type RemoteTrackPublication,
  type RemoteTrack,
  Track,
  TrackEvent,
} from "livekit-client";
import { getEmbedToken } from "../../services/services";
import type { EmbedTokenResponse, TranscriptEntry } from "../../global";
import "./EmbedPage.css";

// ─── AudioVisualizer component ─────────────────────────────────────────────────
const AuraVisualizer = ({ speaking }: { speaking: boolean }) => (
  <div className={`viz-aura ${speaking ? "speaking" : ""}`}>🎙️</div>
);

// ─── Main EmbedPage ────────────────────────────────────────────────────────────
type Phase = "welcome" | "connecting" | "session" | "ended";

const EmbedPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();
  const embedToken = searchParams.get("token") || "";

  const [phase, setPhase] = useState<Phase>("welcome");
  const [error, setError] = useState("");
  const [agentName, setAgentName] = useState("Voice Agent");
  const [welcomeMsg, setWelcomeMsg] = useState(
    "Hi! Click the button below to start talking.",
  );
  const [agentSpeaking, setAgentSpeaking] = useState(false);
  const [micMuted, setMicMuted] = useState(false);
  const [transcript, setTranscript] = useState<TranscriptEntry[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [lastSpoken, setLastSpoken] = useState("");

  const roomRef = useRef<Room | null>(null);
  const transcriptRef = useRef<HTMLDivElement>(null);

  // Auto-scroll transcript
  useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
    }
  }, [transcript]);

  // ── Start call ──────────────────────────────────────────────
  const startCall = useCallback(async () => {
    if (!embedToken) {
      setError("No embed token found in URL.");
      return;
    }
    setPhase("connecting");
    setError("");

    try {
      const res = await getEmbedToken(embedToken);
      const data: EmbedTokenResponse = res.data;
      setAgentName(data.agentName || slug || "Voice Agent");
      setWelcomeMsg(data.welcomeMessage || welcomeMsg);

      const room = new Room({
        adaptiveStream: true,
        dynacast: true,
      });
      roomRef.current = room;

      // ── Room events ────────────────────────────────────────
      room.on(RoomEvent.Connected, async () => {
        setPhase("session");
        // Enable microphone
        await room.localParticipant.setMicrophoneEnabled(true);
      });

      room.on(RoomEvent.Disconnected, () => {
        setPhase("ended");
      });

      // ── Track subscribed — play agent audio ────────────────
      room.on(
        RoomEvent.TrackSubscribed,
        (
          track: RemoteTrack,
          _pub: RemoteTrackPublication,
          _participant: RemoteParticipant,
        ) => {
          if (track.kind === Track.Kind.Audio) {
            track.attach();
            track.on(TrackEvent.AudioSilenceDetected, () =>
              setAgentSpeaking(false),
            );

            // Basic speaking detection via audio track
            const mediaStream = new MediaStream([track.mediaStreamTrack]);
            const audioCtx = new AudioContext();
            const source = audioCtx.createMediaStreamSource(mediaStream);
            const analyser = audioCtx.createAnalyser();
            analyser.fftSize = 256;
            source.connect(analyser);
            const data = new Uint8Array(analyser.frequencyBinCount);

            const detectSpeech = () => {
              analyser.getByteFrequencyData(data);
              const avg = data.reduce((a, b) => a + b, 0) / data.length;
              setAgentSpeaking(avg > 12);
              requestAnimationFrame(detectSpeech);
            };
            detectSpeech();
          }
        },
      );

      // ── Data messages from agent (transcript entries) ───────
      room.on(RoomEvent.DataReceived, (payload: Uint8Array) => {
        try {
          const text = new TextDecoder().decode(payload);
          const msg = JSON.parse(text);
          if (msg.type === "transcript") {
            const entry: TranscriptEntry = {
              role: msg.role as "user" | "agent",
              text: msg.text,
              timestamp: new Date().toISOString(),
            };
            setTranscript((prev) => [...prev, entry]);
            if (msg.role === "agent") setLastSpoken(msg.text);
          }
        } catch {
          // Non-JSON data packets are ignored
        }
      });

      // ── Local speaking state ────────────────────────────────
      room.localParticipant.on(
        ParticipantEvent.IsSpeakingChanged,
        (_speaking: boolean) => {
          // Could be used for local mic indicator
        },
      );

      // Connect to LiveKit room
      await room.connect(data.livekitUrl, data.livekitToken);
    } catch (err: any) {
      setError(
        err?.response?.data?.error || err?.message || "Failed to start call.",
      );
      setPhase("welcome");
    }
  }, [embedToken, slug]);

  // ── Toggle mic ──────────────────────────────────────────────
  const toggleMic = async () => {
    if (!roomRef.current) return;
    const enabled = !micMuted;
    await roomRef.current.localParticipant.setMicrophoneEnabled(enabled);
    setMicMuted(!enabled);
  };

  // ── Send text message to agent ──────────────────────────────
  const sendText = async () => {
    const text = chatInput.trim();
    if (!text || !roomRef.current) return;
    setChatInput("");

    // Add to local transcript
    setTranscript((prev) => [
      ...prev,
      {
        role: "user",
        text,
        timestamp: new Date().toISOString(),
      },
    ]);

    // Send via LiveKit data channel to the Python agent
    const encoder = new TextEncoder();
    const payload = encoder.encode(
      JSON.stringify({ type: "chat_input", text }),
    );
    await roomRef.current.localParticipant.publishData(payload, {
      reliable: true,
      destinationIdentities: [],
    });
  };

  // ── End call ────────────────────────────────────────────────
  const endCall = async () => {
    if (roomRef.current) {
      await roomRef.current.disconnect();
    }
    setPhase("ended");
  };

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="embed-page">
      {/* ── WELCOME VIEW ──────────────────────────────────── */}
      {(phase === "welcome" || phase === "connecting") && (
        <div className="embed-welcome">
          <div className="embed-logo">🎙️</div>
          <div className="embed-agent-name">{agentName}</div>
          <p className="embed-welcome-msg">{welcomeMsg}</p>

          {error && <p className="embed-error">{error}</p>}

          <button
            id="embed-start-call"
            className="embed-start-btn"
            onClick={startCall}
            disabled={phase === "connecting"}
          >
            {phase === "connecting" ? (
              "Connecting…"
            ) : (
              <>
                <span className="pulse-ring" />
                🎙️ Start Talking
              </>
            )}
          </button>

          <div className="embed-powered">
            Powered by VoiceAgent · LiveKit · Gemini
          </div>
        </div>
      )}

      {/* ── SESSION VIEW ──────────────────────────────────── */}
      {phase === "session" && (
        <div className="embed-session">
          {/* Header */}
          <div className="embed-session-header">
            <span className="embed-session-title">{agentName}</span>
            <span className="embed-live-dot">LIVE</span>
          </div>

          {/* Audio Visualizer */}
          <div className="audio-visualizer-container">
            <AuraVisualizer speaking={agentSpeaking} />
          </div>

          {/* Last spoken by agent */}
          <p className="agent-spoken-text">{agentSpeaking ? lastSpoken : ""}</p>

          {/* Transcript */}
          <div className="embed-transcript" ref={transcriptRef}>
            {transcript.map((msg, idx) => (
              <div key={idx} className={`transcript-msg ${msg.role}`}>
                <div className="transcript-bubble">{msg.text}</div>
              </div>
            ))}
          </div>

          {/* Controls */}
          <div className="embed-controls">
            {/* Chat input row */}
            <div className="embed-chat-row">
              <textarea
                id="embed-chat-input"
                className="embed-chat-input"
                rows={1}
                placeholder="Type a message…"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendText();
                  }
                }}
              />
              <button
                id="embed-send-btn"
                className="embed-send-btn"
                onClick={sendText}
                disabled={!chatInput.trim()}
                title="Send message"
              >
                ↑
              </button>
            </div>

            {/* Action buttons */}
            <div className="embed-action-row">
              <button
                id="embed-mic-btn"
                className={`embed-mic-btn ${micMuted ? "muted" : ""}`}
                onClick={toggleMic}
              >
                {micMuted ? "🔇 Unmute" : "🎙️ Mute"}
              </button>
              <button
                id="embed-end-btn"
                className="embed-end-btn"
                onClick={endCall}
              >
                📵 End Call
              </button>
            </div>

            <div className="embed-powered">Powered by VoiceAgent</div>
          </div>
        </div>
      )}

      {/* ── ENDED VIEW ────────────────────────────────────── */}
      {phase === "ended" && (
        <div className="embed-welcome">
          <div style={{ fontSize: "3rem" }}>✅</div>
          <div className="embed-agent-name">Call Ended</div>
          <p className="embed-welcome-msg" style={{ marginBottom: "1.5rem" }}>
            Thank you for using VoiceAgent!
          </p>
          <button
            className="embed-start-btn"
            onClick={() => {
              setPhase("welcome");
              setTranscript([]);
              setLastSpoken("");
              setAgentSpeaking(false);
              setMicMuted(false);
            }}
          >
            Start New Call
          </button>
        </div>
      )}
    </div>
  );
};

export default EmbedPage;
