// src/services/axiosConfig.ts
export const API_BASE_URL =
  (import.meta as any).env?.VITE_API_URL ?? "http://localhost:4003";

export const TOKEN_KEY = "va_access_token";
export const REFRESH_KEY = "va_refresh_token";
