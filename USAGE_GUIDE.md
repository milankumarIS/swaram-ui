# Swaram — Developer Usage Guide

Welcome to Swaram. This guide will help you build, configure, and deploy your first AI voice agent in minutes.

---

## 🧭 Site Directory (URLs)

| Page | URL | Description |
| :--- | :--- | :--- |
| **Landing** | `/` | The main visionary entry point. |
| **Dashboard** | `/dashboard` | Central management for all agents. |
| **Agent Builder** | `/agents/new` | Multi-step configuration wizard. |
| **Sessions** | `/sessions` | Global call history and logs. |
| **Analytics** | `/analytics` | Performance metrics and signal analysis. |
| **Profile** | `/profile` | User settings and API key management. |
| **About Us** | `/about` | Brand story and mission. |
| **Terms** | `/terms` | Legal terms of service. |
| **Privacy** | `/privacy` | Data usage and privacy policy. |
| **Security** | `/security` | Compliance and infrastructure details. |

---

## 01 — Getting Started

### 1. Account Setup
Register on the [Swaram Dashboard](http://localhost:5173/register). Once authenticated, you will be redirected to your **Dashboard**, where you can manage all your active agents.
- **Agents**: The core entities you create in Swaram.

### 2. The Dashboard
Your dashboard provides a high-level view of:
- **Active Agents**: Total number of configured agents.
- **Sessions**: Historical call data from the last 30 days.
- **Talk Time**: Cumulative duration of all conversations.

---

## 02 — Building an Agent

Click **+ New Agent** to enter the Agent Builder.

### Step 1: Identity
- **Name**: Internal name for your agent.
- **Slug**: The public URL identifier (e.g., `/my-agent`).
- **Greeting**: The first message the agent speaks when a user connects.

### Step 2: Intelligence
- **Prompt**: The "brain" of your agent. Define who the agent is, what they know, and how they should behave.
- **Model**: Choose between Gemini 1.5 Flash (standard) or Pro (complex reasoning).

### Step 3: Voice & Language
- **Language**: Select from 10+ regional Indian languages or English.
- **Voice ID**: Pick a voice profile (e.g., Male/Female, Warm/Professional).

---

## 03 — Deployment

Every agent comes with a ready-to-use **Embed Widget**.

### 1. Get the URL
On your Dashboard, click the **Copy** icon next to any agent to copy its public embed URL.

### 2. Integration
Paste the following code into your website's HTML:

```html
<iframe 
  src="https://swaram.io/embed/your-agent-slug" 
  width="400" 
  height="600" 
  frameborder="0"
></iframe>
```

---

## 04 — Analytics & Monitoring

- **Sessions Page**: View detailed logs for every conversation, including start time, duration, and status.
- **Analytics Page**: Deep-dive into performance metrics like completion rates and unique user engagement.

---

## 05 — Advanced Developer Access

Visit your **Profile** page to retrieve your **API Key**. This key allows you to interact with the Swaram API programmatically for custom integrations or data exporting.

---

### Support
For technical issues or enterprise inquiries, please visit our **Security** or **About** pages for contact information.

© 2024 SWARAM — SIGNAL & SILENCE
