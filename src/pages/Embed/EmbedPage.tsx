// src/pages/Embed/EmbedPage.tsx
import { useState, useRef, useEffect, useCallback } from "react";
import { useSearchParams, useParams, Link } from "react-router-dom";
import { Room, RoomEvent, type RemoteTrack, Track } from "livekit-client";
import { getEmbedToken } from "../../services/services";
import type { EmbedTokenResponse, TranscriptEntry } from "../../global";
import {
  Mic,
  MicOff,
  PhoneOff,
  ArrowRight,
  Activity,
  Terminal,
} from "lucide-react";
import "./EmbedPage.css";

// ─── Visualizer Waveform ───────────────────────────────────────────────────────
const WaveformVisualizer = ({ speaking }: { speaking: boolean }) => (
  <div className="visualizer-bars">
    {Array.from({ length: 8 }).map((_, i) => (
      <div
        key={i}
        className="v-bar"
        style={{
          height: speaking ? `${Math.random() * 60 + 20}px` : "4px",
          opacity: speaking ? 1 : 0.3,
          transition: "height 0.1s ease",
        }}
      />
    ))}
  </div>
);

type Phase = "welcome" | "connecting" | "session" | "ended";

const EmbedPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();
  const embedToken = searchParams.get("token") || "";

  const [phase, setPhase] = useState<Phase>("welcome");
  const [error, setError] = useState("");
  const [agentName, setAgentName] = useState("Voice Agent");
  const [welcomeMsg, setWelcomeMsg] = useState("Connecting the signal...");
  const [agentSpeaking, setAgentSpeaking] = useState(false);
  const [micMuted, setMicMuted] = useState(false);
  const [transcript, setTranscript] = useState<TranscriptEntry[]>([]);

  const roomRef = useRef<Room | null>(null);
  const transcriptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
    }
  }, [transcript]);

  const startCall = useCallback(async () => {
    if (!embedToken) {
      setError("Authorization required.");
      return;
    }
    setPhase("connecting");
    setError("");

    try {
      const res = await getEmbedToken(embedToken);
      const data: EmbedTokenResponse = res.data;
      setAgentName(data.agentName || slug || "Agent");
      setWelcomeMsg(data.welcomeMessage || "Ready to assist.");

      const room = new Room({ adaptiveStream: true });
      roomRef.current = room;

      room.on(RoomEvent.Connected, async () => {
        setPhase("session");
        await room.localParticipant.setMicrophoneEnabled(true);
      });

      room.on(RoomEvent.Disconnected, () => setPhase("ended"));

      room.on(RoomEvent.TrackSubscribed, (track: RemoteTrack) => {
        if (track.kind === Track.Kind.Audio) {
          track.attach();
          const mediaStream = new MediaStream([track.mediaStreamTrack]);
          const audioCtx = new AudioContext();
          const source = audioCtx.createMediaStreamSource(mediaStream);
          const analyser = audioCtx.createAnalyser();
          analyser.fftSize = 256;
          source.connect(analyser);
          const freqData = new Uint8Array(analyser.frequencyBinCount);

          const detect = () => {
            analyser.getByteFrequencyData(freqData);
            const avg = freqData.reduce((a, b) => a + b, 0) / freqData.length;
            setAgentSpeaking(avg > 15);
            if (roomRef.current) requestAnimationFrame(detect);
          };
          detect();
        }
      });

      room.on(RoomEvent.DataReceived, (payload: Uint8Array) => {
        try {
          const msg = JSON.parse(new TextDecoder().decode(payload));
          if (msg.type === "transcript") {
            setTranscript((prev) => [
              ...prev,
              {
                role: msg.role,
                text: msg.text,
                timestamp: new Date().toISOString(),
              },
            ]);
          }
        } catch {}
      });

      await room.connect(data.livekitUrl, data.livekitToken);
    } catch (err: any) {
      setError("Failed to establish signal.");
      setPhase("welcome");
    }
  }, [embedToken, slug]);

  const toggleMic = async () => {
    if (!roomRef.current) return;
    const enabled = !micMuted;
    await roomRef.current.localParticipant.setMicrophoneEnabled(enabled);
    setMicMuted(!enabled);
  };

  const endCall = async () => {
    if (roomRef.current) await roomRef.current.disconnect();
    setPhase("ended");
  };

  return (
    <div className="embed-page">
      {/* ── Welcome View ── */}
      {(phase === "welcome" || phase === "connecting") && (
        <div className="embed-welcome">
          <div className="embed-logo-container">
            <Activity size={40} color="var(--accent)" />
          </div>
          <h1 className="embed-agent-name">{agentName}</h1>
          <p className="embed-welcome-msg">{welcomeMsg}</p>
          {error && (
            <p
              style={{
                color: "#ef4444",
                fontSize: "12px",
                marginBottom: "20px",
              }}
            >
              {error}
            </p>
          )}
          <button
            className="embed-start-btn"
            onClick={startCall}
            disabled={phase === "connecting"}
          >
            {phase === "connecting" ? "Establishing..." : "Start Signal"}{" "}
            <ArrowRight size={14} />
          </button>
        </div>
      )}

      {/* ── Session View ── */}
      {phase === "session" && (
        <div className="embed-session">
          <header className="embed-session-header">
            <span className="embed-session-title">{agentName}</span>
            <div className="status-indicator">
              <div className="status-dot"></div> SIGNAL ACTIVE
            </div>
          </header>

          <main className="visualizer-stage">
            <div className="waveform-ring">
              <WaveformVisualizer speaking={agentSpeaking} />
            </div>
          </main>

          <footer className="embed-transcript" ref={transcriptRef}>
            {transcript.slice(-3).map((msg, i) => (
              <div key={i} className={`transcript-bubble ${msg.role}-bubble`}>
                {msg.text}
              </div>
            ))}
          </footer>

          <div className="embed-controls">
            <div className="controls-row">
              <button
                className={`control-btn ${micMuted ? "muted" : ""}`}
                onClick={toggleMic}
              >
                {micMuted ? (
                  <>
                    <MicOff size={14} /> Unmute
                  </>
                ) : (
                  <>
                    <Mic size={14} /> Mute
                  </>
                )}
              </button>
              <button className="control-btn end" onClick={endCall}>
                <PhoneOff size={14} /> End Session
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Ended View ── */}
      {phase === "ended" && (
        <div className="embed-welcome">
          <div className="embed-logo-container">
            <Terminal size={40} color="var(--accent)" />
          </div>
          <div className="embed-footer-brand">
            Powered by{" "}
            <Link to="/" target="_blank">
              Swaram
            </Link>
          </div>
          <h1 className="embed-agent-name">Session Ended</h1>
          <p className="embed-welcome-msg">
            The signal has been cleanly terminated.
          </p>
          <button
            className="embed-start-btn"
            onClick={() => {
              setPhase("welcome");
              setTranscript([]);
            }}
          >
            Re-establish Signal
          </button>
        </div>
      )}
    </div>
  );
};

export default EmbedPage;
