// src/services/services.ts — All API call functions
import axiosClient from "./axiosClient";
import type { CreateAgentPayload } from "../global";

// ─── Auth ─────────────────────────────────────────────────────────────────────
export const register = (email: string, password: string) =>
  axiosClient.post("/api/auth/register", { email, password });

export const login = (email: string, password: string) =>
  axiosClient.post("/api/auth/login", { email, password });

export const getMe = () =>
  axiosClient.get("/api/auth/me");

// ─── Agents ───────────────────────────────────────────────────────────────────
export const getAgents = () =>
  axiosClient.get("/api/agents");

export const getAgent = (id: string) =>
  axiosClient.get(`/api/agents/${id}`);

export const createAgent = (data: CreateAgentPayload) =>
  axiosClient.post("/api/agents", data);

export const updateAgent = (id: string, data: Partial<CreateAgentPayload> & { is_active?: boolean }) =>
  axiosClient.patch(`/api/agents/${id}`, data);

export const deleteAgent = (id: string) =>
  axiosClient.delete(`/api/agents/${id}`);

// ─── Sessions ─────────────────────────────────────────────────────────────────
export const getAgentSessions = (agentId: string) =>
  axiosClient.get(`/api/agents/${agentId}/sessions`);

export const getSession = (sessionId: string) =>
  axiosClient.get(`/api/sessions/${sessionId}`);

// ─── Embed ────────────────────────────────────────────────────────────────────
export const getEmbedToken = (embedToken: string) =>
  axiosClient.post("/api/embed/token", { embed_token: embedToken });
