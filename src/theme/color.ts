// src/theme/color.ts
export const colors = {
  // Background layers
  bg: {
    primary: "#0a0a0f",
    secondary: "#111118",
    tertiary: "#17171f",
    card: "#1c1c26",
    cardHover: "#22222e",
    overlay: "rgba(10, 10, 15, 0.85)",
  },

  // Accent — indigo-violet gradient
  accent: {
    primary: "#6366f1",     // indigo-500
    secondary: "#8b5cf6",   // violet-500
    light: "#a78bfa",       // violet-400
    glow: "rgba(99, 102, 241, 0.25)",
    gradient: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
    gradientHover: "linear-gradient(135deg, #4f52e0 0%, #7c3aed 100%)",
  },

  // Text
  text: {
    primary: "#f1f1f5",
    secondary: "#9999b3",
    muted: "#5c5c7a",
    inverse: "#0a0a0f",
  },

  // State colors
  success: "#22c55e",
  error: "#ef4444",
  warning: "#f59e0b",
  info: "#3b82f6",

  // Borders
  border: {
    subtle: "rgba(255, 255, 255, 0.06)",
    default: "rgba(255, 255, 255, 0.10)",
    focused: "rgba(99, 102, 241, 0.5)",
  },
} as const;

export type Colors = typeof colors;
