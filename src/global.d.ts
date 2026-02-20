// src/global.d.ts — Global TypeScript type declarations

export interface User {
  id: string;
  email: string;
  plan: "free" | "pro" | "business";
  created_at?: string;
}

export interface Agent {
  id: string;
  user_id: string;
  name: string;
  slug: string;
  llm_provider: string;
  llm_model: string;
  system_prompt: string;
  welcome_message: string;
  stt_language_code: string;
  tts_voice: string;
  tts_language_code: string;
  max_call_duration_sec: number;
  allowed_domains: string[];
  embed_token: string;
  is_active: boolean;
  session_count_30d?: number;
  created_at?: string;
  updated_at?: string;
}

export interface AgentSession {
  id: string;
  agent_id: string;
  livekit_room_name: string;
  visitor_identity?: string;
  started_at: string;
  ended_at?: string;
  duration_sec?: number;
  transcript?: TranscriptEntry[];
}

export interface TranscriptEntry {
  role: "user" | "agent";
  text: string;
  timestamp: string;
}

export interface CreateAgentPayload {
  name: string;
  llm_model: string;
  llm_api_key: string;
  system_prompt: string;
  welcome_message: string;
  sarvam_api_key: string;
  stt_language_code: string;
  tts_voice: string;
  tts_language_code: string;
  max_call_duration_sec: number;
  allowed_domains: string[];
}

export interface AuthTokens {
  accessToken: string;
  refreshToken?: string;
  user: User;
}

export interface EmbedTokenResponse {
  livekitUrl: string;
  livekitToken: string;
  roomName: string;
  sessionId: string;
  welcomeMessage: string;
  agentName: string;
}
