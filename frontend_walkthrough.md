# VoiceAgent — Frontend Walkthrough

This document provides a detailed overview of the frontend architecture, pages, and features of the VoiceAgent platform.

## 🚀 Overview

The frontend is a premium, high-performance web application built with **React 19**, **Vite**, and **TypeScript**. It features a "Premium Dark" aesthetic with glassmorphism effects and indigo-violet gradients.

**Tech Stack:**
- **Framework:** React 19 + Vite
- **Language:** TypeScript
- **Styling:** Vanilla CSS (Design Tokens & Variables)
- **State Management:** React Context (Auth)
- **Form Handling:** React Hook Form + Zod
- **Real-time Voice:** LiveKit Client SDK

---

## 🎨 Design System

The application uses a centralized design system defined in:
- [variables.css](file:///c:/Users/LENOVO/Office/Voice%20Agent/Voice/src/theme/variables.css): CSS variables for colors, spacing, and shadows.
- [color.ts](file:///c:/Users/LENOVO/Office/Voice%20Agent/Voice/src/theme/color.ts): TypeScript theme tokens.

### Key Aesthetics:
- **Background:** Deep obsidian dark (`#0a0a0c`).
- **Accents:** Linear gradients from Indigo (`#6366f1`) to Violet (`#8b5cf6`).
- **Surface:** Glassmorphic cards with subtle borders (`rgba(255, 255, 255, 0.05)`).

---

## 📄 Page Walkthrough

### 1. Landing Page (`/`)
- **Hero Section:** High-impact "Premium" headline with animated gradient text.
- **Features Grid:** 6-card grid showcasing platform capabilities (Gemini 2.0, Low Latency, Multilingual, etc.).
- **CTA:** Dynamic "Get Started" buttons that route to Dashboard if logged in, or Register if guest.

### 2. Authentication (`/login`, `/register`)
- **Login:** Email/Password validation, auto-redirect on success.
- **Register:** Multi-field validation including password confirmation.
- **Persistence:** JWT tokens are stored in `localStorage` and managed via [AuthContext](file:///c:/Users/LENOVO/Office/Voice%20Agent/Voice/src/components/context/AuthContext.tsx).

### 3. Dashboard (`/dashboard`)
- **Agent Grid:** Cards showing all user-created agents.
- **Status Badges:** Visual indicator if an agent is `LIVE`.
- **Quick Actions:** Buttons to View Details, Edit, or copy the Embed Link.
- **Empty State:** Clean CTA to create your first agent if the list is empty.

### 4. Create Agent Wizard (`/agents/new`)
A **5-step wizard** designed for high conversion and ease of use:
1.  **Name & Logo**: Basic identification.
2.  **Personality**: Large textarea for the system prompt.
3.  **AI Config**: Model selection (Gemini) and API Key entry.
4.  **Voice & Language**: Language selection (English, Hindi, etc.) and Voice style.
5.  **Security**: Domain whitelisting for the embed widget.

### 5. Agent Detail & Embed (`/agents/:id`)
- **Config Summary**: Read-only view of all agent settings.
- **Embed Snippet**: A one-click "Copy Code" block containing the `<iframe>` tag for website integration.
- **Session History**: Table showing recent calls with date, duration, and participant IDs.

### 6. Voice Widget (The "Embed" Page)
The `/embed/:slug` page is designed to be highly interactive and lightweight:
- **Welcome View**: Simple branded screen to capture microphone permissions.
- **Aura Visualizer**: A pulsing, glowing "aura" that reacts to the agent's voice.
- **Audio Visualizer**: Animated bars that dance in sync with the audio stream.
- **Real-time Transcript**: Messages appear instantly as the conversation happens.
- **Agent Control Bar**: Pill-shaped bar with Mute toggle, Text Input (for hybrid interactions), and End Call.

---

## 🛠️ Key Components

- [ProtectedRoute.tsx](file:///c:/Users/LENOVO/Office/Voice%20Agent/Voice/src/components/shared/ProtectedRoute.tsx): Guards dashboard routes.
- [Header.tsx](file:///c:/Users/LENOVO/Office/Voice%20Agent/Voice/src/components/layout/Header.tsx): Fixed-top navigation with user profile and logout.
- [Loader.tsx](file:///c:/Users/LENOVO/Office/Voice%20Agent/Voice/src/components/shared/Loader.tsx): Animated spinner used across all loading states.

---

## 📡 API Interaction

The frontend communicates with the backend via a centralized [service layer](file:///c:/Users/LENOVO/Office/Voice%20Agent/Voice/src/services/services.ts).
- **Base URL:** `http://localhost:4003` (Default).
- **Auth:** All requests automatically include the `Authorization: Bearer <token>` header via [axiosClient.ts](file:///c:/Users/LENOVO/Office/Voice%20Agent/Voice/src/services/axiosClient.ts) interceptor.
