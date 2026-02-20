# Swaram Voice Agent Platform - Features & Functionalities Documentation

> **Last Updated:** February 20, 2026

## 📋 Table of Contents

- [Application Overview](#-application-overview)
- [Technology Stack](#-technology-stack)
- [User-Facing Features](#-user-facing-features)
  - [Public Pages](#public-pages)
  - [Authentication](#authentication)
  - [Dashboard Features](#dashboard-features)
  - [Embed Widget](#embed-widget)
- [Backend API](#-backend-api)
- [Core Services](#-core-services)
- [Data Models](#-data-models)
- [Security Features](#-security-features)
- [Third-Party Integrations](#-third-party-integrations)
- [Agent Capabilities](#-agent-capabilities)

---

## 🎯 Application Overview

**Swaram** (also known as Resona Voice Agent Platform) is a **multi-tenant SaaS platform** that enables users to create, configure, and deploy AI-powered voice agents that can be embedded in websites via iframe. The platform provides a complete solution for businesses to add conversational AI capabilities to their digital presence with minimal technical implementation.

### Core Value Proposition

- **Custom Voice Agents**: Create personalized AI assistants with specific personalities, knowledge bases, and behavior patterns
- **Real-Time Interaction**: Support for both voice and text input with sub-500ms latency
- **Multi-Language Support**: 10+ Indian regional languages including Hindi, Tamil, Telugu, Kannada, Bengali, Marathi, plus English
- **Simple Integration**: One-line iframe embed code for instant deployment
- **Enterprise Ready**: Security features including encryption, domain whitelisting, and rate limiting

### Primary Use Cases

- Portfolio and personal website bots
- FAQ assistants for business websites
- Interactive survey and data collection
- Lead capture and qualification
- Customer support automation
- Event registration (originally built for KTX Global 2026 - Kerala Technology Expo)

---

## 🛠️ Technology Stack

### Frontend Layer (swaram-ui)

**Core Framework & Language**

- React 19 - Modern UI library with latest features
- TypeScript - Type-safe development
- Vite - Lightning-fast build tool and dev server

**Routing & Navigation**

- React Router DOM v7 - Client-side routing with latest features

**Styling & Design**

- Vanilla CSS with CSS Variables - Custom design system without framework dependencies
- Premium dark aesthetic with glassmorphism effects
- Design tokens centralized in [variables.css](src/theme/variables.css) and [color.ts](src/theme/color.ts)
- Color palette: Obsidian dark backgrounds with indigo-violet gradients

**State Management**

- React Context API - Lightweight state via [AuthContext.tsx](src/components/context/AuthContext.tsx)
- No external state library dependencies

**Form Handling & Validation**

- React Hook Form - Performant form management
- Zod - TypeScript-first schema validation

**HTTP Communication**

- Axios - Configured client in [axiosClient.ts](src/services/axiosClient.ts)

**Real-Time Voice**

- WebRTC Client SDK - Real-time audio communication with sub-500ms latency
- Web Audio API - Speech visualization and audio processing

**UI Enhancements**

- Framer Motion v12 - Smooth page transitions and animations
- Lucide React - Modern icon library

### Backend Layer (swaram-service)

**Runtime & Framework**

- Node.js 18+ - JavaScript runtime
- Express.js - Web application framework

**Database & ORM**

- PostgreSQL - Primary relational database
- Sequelize - ORM for database operations
- Schema: `voiceagent` with 3 tables (users, agents, agent_sessions)

**Caching Layer**

- Redis - Optional caching for performance optimization
- Can be disabled via `DISABLE_REDIS=1` environment variable

**Real-Time Infrastructure**

- WebRTC Server Infrastructure - Self-hosted room management and agent dispatch
- Dedicated real-time servers at `wss://testbr.beyondresume.io`

**Authentication & Security**

- jsonwebtoken - JWT token generation and verification
- bcryptjs - Password hashing with configurable rounds

**Encryption**

- AES-256-GCM - API key encryption in database
- AES-256-CBC - Request/response body encryption

**Additional Utilities**

- express-rate-limit - Rate limiting middleware
- Helmet - Security headers
- CORS - Cross-origin resource sharing
- Winston - Logging framework
- UUID v4 & nanoid - Unique identifier generation

### Agent Worker Layer (swaram-agent-worker)

**Language & Framework**

- Python 3.11+ - Worker runtime
- Real-Time Agents Framework - Voice pipeline orchestration and WebRTC integration

**AI & Language Models**

- Google Gemini Integration
  - gemini-2.5-flash (default, optimized for speed)
  - gemini-1.5-pro (advanced capabilities)

**Speech Services**

- Sarvam AI integration
  - STT: Saarika v2.5 (Speech-to-Text)
  - TTS: Bulbul v2 (Text-to-Speech)

**Voice Processing**

- Silero - Voice Activity Detection (VAD)
- MultilingualModel - Turn detection for conversation flow

**HTTP Client**

- httpx - Async HTTP requests for config fetching

**Package Management**

- uv - Fast Python package installer

---

## 👥 User-Facing Features

### Public Pages

These pages are accessible without authentication and serve as the public face of the platform.

#### 1. Landing Page

**Location:** [LandingPage.tsx](src/pages/Public/LandingPage.tsx)

**Purpose:** Marketing homepage showcasing platform capabilities

**Features:**

- **Hero Section**: Premium branding with call-to-action buttons
  - "Start Building" - Directs to registration
  - "See Live Demo" - Shows platform in action
- **Hero Stats Display**: Real-time platform metrics
- **Feature Grid**: Bento-style layout highlighting key capabilities
  - Low latency performance (<500ms response time)
  - Multi-language support showcase
  - SDK integration capabilities
  - Agent identity customization
- **AI Model Ticker**: Animated horizontal scroll displaying supported models
  - Google Gemini (2.5 Flash, 1.5 Pro)
  - Claude (Anthropic)
  - GPT-4o (OpenAI)
  - Llama (Meta)
  - And more
- **Responsive Design**: Optimized for all screen sizes

#### 2. About Page

**Location:** [AboutPage.tsx](src/pages/Public/AboutPage.tsx)

**Purpose:** Company information and mission statement

**Features:**

- Brand story and vision
- Platform evolution narrative
- Team information
- Company values

#### 3. Legal & Compliance Pages

**Terms of Service** - [TermsPage.tsx](src/pages/Public/TermsPage.tsx)

- User agreements and conditions
- Service limitations and responsibilities
- Usage policies

**Privacy Policy** - [PrivacyPage.tsx](src/pages/Public/PrivacyPage.tsx)

- Data collection practices
- User data handling
- Privacy commitments

**Security Documentation** - [SecurityPage.tsx](src/pages/Public/SecurityPage.tsx)

- Infrastructure security details
- Compliance information
- Data protection measures

#### 4. Contact Page

**Location:** [ContactPage.tsx](src/pages/Public/ContactPage.tsx)

**Purpose:** Support channels and communication

**Features:**

- Contact information
- Support channels
- Inquiry submission

---

### Authentication

#### 5. Login Page

**Location:** [LoginPage.tsx](src/pages/Auth/LoginPage.tsx)

**Purpose:** User authentication and session management

**Features:**

- **Email/Password Login**: Secure credential validation
- **Form Validation**: Real-time input validation
- **Error Handling**: Clear error messages for failed attempts
- **Auto-Redirect**: Automatic navigation to dashboard on success
- **Token Management**: JWT stored in localStorage for session persistence
- **Registration Link**: Quick access to sign-up page

**User Flow:**

1. User enters email and password
2. Credentials validated against backend
3. JWT token issued and stored
4. User redirected to dashboard
5. AuthContext updated with user information

#### 6. Register Page

**Location:** [RegisterPage.tsx](src/pages/Auth/RegisterPage.tsx)

**Purpose:** New user account creation

**Features:**

- **User Registration Form**:
  - Email address (unique validation)
  - Password (strength requirements)
  - Password confirmation (match validation)
- **Form Validation**: Multi-step validation with clear feedback
- **Auto-Login**: Automatic authentication after successful registration
- **Default Plan Assignment**: New users start on Free plan
- **Login Redirect**: Link to login page for existing users

**User Flow:**

1. User provides email and password
2. Password strength and match validation
3. Account created in database
4. User automatically logged in
5. Redirected to dashboard to create first agent

---

### Dashboard Features

All dashboard features require authentication and are protected by JWT validation.

#### 7. Main Dashboard

**Location:** [DashboardPage.tsx](src/pages/Dashboard/DashboardPage.tsx)

**Purpose:** Central hub for agent management and overview

**Features:**

**Stats Bar** - Quick metrics overview

- Total Agents: Count of user's active agents
- Total Sessions: Placeholder showing 1,240 sessions
- Total Talk Time: Placeholder showing 4h 32m

**Agents Table** - Comprehensive agent listing with columns:

- **Agent Information**:
  - Name: Display name of the agent
  - Slug: URL-friendly identifier
- **Configuration**:
  - LLM Model: Visual indicator (Gemini icon) showing AI model
  - Language: STT (Speech-to-Text) language code (e.g., en-IN, hi-IN)
- **Status**:
  - Active/Idle badge indicating agent state
- **Performance**:
  - Session Count: Number of sessions in last 30 days
- **Actions**:
  - Copy Embed URL: One-click clipboard copy of iframe code
  - Edit: Navigate to agent editor
  - More Options: Additional agent operations

**Empty State**

- Displayed when user has no agents
- "Create First Agent" call-to-action button
- Guidance for getting started

**Header Actions**

- "+ New Agent" button for creating new voice agents

**User Flow:**

1. User logs in and lands on dashboard
2. Views all created agents with status
3. Can quickly copy embed code for any agent
4. Navigate to create new agent or edit existing ones
5. Monitor session activity at a glance

#### 8. Create Agent Wizard

**Location:** [CreateAgentPage.tsx](src/pages/Agents/CreateAgentPage.tsx)

**Purpose:** Multi-step guided agent creation process

**Features:**

**Step 1: Identity Configuration**

- **Display Name**: Public-facing agent name
- **System Instructions**: Personality and behavior prompt
  - Defines agent's role, tone, and expertise
  - Guides conversational style
  - Sets boundaries and capabilities
- **Welcome Message**: Initial greeting spoken to visitors
  - First thing users hear when connecting
  - Sets the tone for interaction

**Step 2: Voice & Language Settings**

- **Input Language (STT)**: Speech recognition language
  - English (IN) - en-IN
  - Hindi - hi-IN
  - Tamil - ta-IN
  - Telugu - te-IN
  - Kannada - kn-IN
  - Bengali - bn-IN
  - Marathi - mr-IN
- **Output Language (TTS)**: Speech synthesis language
  - Same options as input language
  - Can differ from input for translation scenarios
- **Voice Avatar Selection**: Neural voice personality
  - Female voices: meera, anushka, riya, sonia
  - Male voices: kairav, arjun
  - Each with distinct characteristics

**Step 3: Intelligence Configuration**

- **LLM Model Selection**:
  - Gemini 2.0 Flash: Fast responses, cost-effective
  - Gemini 1.5 Pro: Advanced reasoning, complex tasks
- **Gemini API Key**: User's Google AI API key
  - Encrypted before storage
  - Password field for security
  - Required for LLM functionality
- **Sarvam API Key**: Indian language voice services
  - Powers STT and TTS
  - Encrypted before storage
  - Required for voice processing

**Step 4: Security & Limits**

- **Max Call Duration**: Session timeout in seconds
  - Range: 30 to 1800 seconds (0.5 to 30 minutes)
  - Prevents runaway sessions
  - Controls resource usage
- **Allowed Domains**: CSV list of authorized domains
  - iframe security whitelist
  - Origin validation for embed requests
  - Leave empty for development (allows all origins)

**Additional Features:**

- **Visual Progress Indicator**: Shows current step (1/4, 2/4, etc.)
- **Step-by-Step Navigation**: Previous/Next buttons
- **Form Validation**: Required fields enforced per step
- **Preview Panel**: (Planned) Live agent configuration preview
- **Save Draft**: (Planned) Resume creation later

**User Flow:**

1. User clicks "New Agent" from dashboard
2. Completes Step 1 (Identity) and validates
3. Proceeds to Step 2 (Voice & Language)
4. Configures Step 3 (Intelligence) with API keys
5. Sets Step 4 (Security & Limits)
6. Reviews configuration
7. Submits to create agent
8. Receives embed token and redirect to agent detail

#### 9. Agent Detail Page

**Location:** [AgentDetailPage.tsx](src/pages/Agents/AgentDetailPage.tsx)

**Purpose:** Complete view of individual agent configuration

**Features:**

**Agent Configuration Display (Read-Only)**

- All settings from creation wizard
- Current status indicator
- Creation timestamp
- Last updated timestamp

**Embed Integration Section**

- **Embed Code Snippet**: Ready-to-use iframe HTML
- **One-Click Copy**: Clipboard copy functionality
- **Usage Instructions**: How to integrate on websites
- **Embed Token**: Unique identifier for this agent

**Session History Table**

- Sessions specific to this agent
- Start date and time
- Duration in seconds
- Status (Active/Completed)
- Sorted chronologically

**Action Buttons**

- Edit Agent: Navigate to editor
- Agent Settings: Additional configurations
- Delete Agent: Soft delete (deactivation)

**User Flow:**

1. User clicks agent from dashboard
2. Views complete configuration
3. Copies embed code to clipboard
4. Reviews recent session activity
5. Can edit or manage agent settings

#### 10. Edit Agent Page

**Location:** [EditAgentPage.tsx](src/pages/Agents/EditAgentPage.tsx)

**Purpose:** Modify existing agent configuration

**Features:**

**Pre-populated Form**

- All current agent settings loaded
- Same structure as Create Agent wizard
- All four steps editable

**Partial Update Support**

- Only modified fields sent to backend
- API uses PATCH method for efficiency

**API Key Handling**

- Encrypted keys not displayed (security)
- Shows placeholder if key exists
- Can update by providing new key
- Empty field leaves existing key unchanged

**Validation**

- Same validation rules as creation
- Ensures configuration integrity

**User Flow:**

1. User navigates from dashboard or detail page
2. Views current configuration
3. Modifies desired fields
4. Saves changes
5. Configuration updated in database
6. Active sessions use new config on next connection

#### 11. Sessions Page

**Location:** [SessionsPage.tsx](src/pages/Dashboard/SessionsPage.tsx)

**Purpose:** Global call history across all user agents

**Features:**

**Session List Table**

- **Agent Name**: Which agent handled the session
- **Start Date/Time**: When session began (formatted timestamp)
- **Duration**: Session length in seconds
- **Status**:
  - Active: Currently in progress
  - Completed: Ended normally

**Filtering & Sorting**

- Default: Sorted by date descending (newest first)
- (Future) Filter by agent, date range, status

**Empty State**

- Displayed when no sessions exist
- Encourages creating first agent
- Guidance on generating sessions

**User Flow:**

1. User navigates from sidebar
2. Views chronological session history
3. Monitors agent usage patterns
4. Identifies traffic trends

#### 12. Analytics Page

**Location:** [AnalyticsPage.tsx](src/pages/Dashboard/AnalyticsPage.tsx)

**Purpose:** Performance metrics and insights dashboard

**Features:**

**Key Metrics Cards**

- **Total Conversations**: 1,284 (placeholder)
  - Change indicator: +12.5% vs previous period
- **Average Duration**: 4m 12s (placeholder)
  - Change indicator: +8.2%
- **Completion Rate**: 94.2% (placeholder)
  - Sessions completed vs abandoned
  - Change indicator: +2.1%
- **Unique Users**: 412 (placeholder)
  - Distinct visitor identities
  - Change indicator: +18.7%

**Call Volume Visualization**

- 24-hour activity chart (mock data)
- Time period labels
- Visual representation of usage patterns

**Future Enhancements** (Planned)

- Real data integration from AgentSession model
- Custom date range selection
- Agent-specific analytics
- Geographic distribution
- Language usage breakdown
- Conversation quality metrics

**User Flow:**

1. User navigates from sidebar
2. Reviews high-level metrics
3. Analyzes trends with visualizations
4. Identifies optimization opportunities

#### 13. Profile Page

**Location:** [ProfilePage.tsx](src/pages/Dashboard/ProfilePage.tsx)

**Purpose:** User account settings and subscription management

**Features:**

**Account Information**

- Email address display
- Account creation date
- Last login timestamp

**Subscription Plan**

- Current plan display (Free/Pro/Business)
- Plan limits and features
- Upgrade/downgrade options

**API Key Management**

- View personal API keys
- Generate new keys
- Revoke existing keys

**Security Settings**

- Password change functionality
- Two-factor authentication (planned)
- Active sessions management

**User Flow:**

1. User navigates from sidebar or profile menu
2. Views account details
3. Manages subscription if needed
4. Updates security settings

---

### Embed Widget

#### 14. Embed Page (Voice Agent Interface)

**Location:** [EmbedPage.tsx](src/pages/Embed/EmbedPage.tsx)

**Purpose:** The actual voice agent interface embedded in customer websites

**Access:** Public (no authentication required), accessed via iframe

**Flow Phases:**

**Phase 1: Welcome View (Initial State)**

- **Agent Branding**: Logo or avatar display
- **Agent Name**: Display name from configuration
- **Welcome Message**: Configured greeting text
- **Start Button**: "Start Signal" call-to-action
- **Error Display**: Shows connection or configuration errors if any

**Phase 2: Connecting View (Transition)**

- **Loading State**: "Establishing..." indicator
- **WebSocket Connection**: Connecting to real-time voice room
- **Token Exchange**: Validating embed credentials

**Phase 3: Active Session View (Main Interface)**

**Header Section:**

- Agent name display
- "SIGNAL ACTIVE" status indicator
- Session timer (optional)

**Visualizer Stage:**

- **Animated Waveform**: 8 vertical bars
- **Real-Time Visualization**: Reacts to agent speech
- **Web Audio API Integration**: Analyzes audio frequency data
- **Smooth Animations**: Visual feedback during conversation

**Transcript Panel:**

- **Message Bubbles**: Conversation history
  - User messages: Styled differently (right-aligned)
  - Agent messages: Left-aligned with agent avatar
- **Last 3 Messages**: Rolling display to save space
- **Auto-Scroll**: Keeps latest message visible
- **Timestamp Display**: (Optional) Message timing

**Control Bar:**

- **Microphone Toggle**: Mute/unmute user audio
  - Visual indicator when muted
  - Red icon when disabled
- **End Call Button**: Terminate session
  - Confirmation prompt to prevent accidents
- **Volume Control**: (Optional) Adjust agent volume

**Phase 4: Ended View (Completion)**

- Session terminated message
- Thank you note
- Feedback prompt (optional)
- "Start New Session" option

**Technical Features:**

**Real-Time Infrastructure Integration**

- Secure room connection with JWT token authentication
- WebRTC peer-to-peer connection for low-latency audio
- Audio track subscription and management
- Automatic reconnection handling

**Real-Time Audio**

- Bidirectional audio streaming
- Echo cancellation
- Noise suppression
- Adaptive bitrate

**Data Channel**

- Transcript streaming separate from audio
- Low-latency text updates
- Structured JSON messages

**Speech Visualization**

- Web Audio API analyzer node
- Frequency data extraction
- Smoothed animation for visual appeal
- Performance optimized (requestAnimationFrame)

**Responsive Design**

- Works on desktop and mobile
- Touch-friendly controls
- Adaptive layout for iframe size

**User Flow:**

1. Visitor lands on webpage with embedded iframe
2. Sees welcome screen with agent name
3. Clicks "Start Signal" to begin
4. Connects to real-time voice room
5. Python worker dispatched and joins room
6. Audio streaming begins
7. Visitor speaks, agent responds
8. Transcript updates in real-time
9. Visualizer reacts to agent speech
10. Visitor ends call when finished
11. Session logged in database

---

## 🔌 Backend API

### Authentication Routes

**Base Path:** `/api/auth`  
**File:** [authRoutes.js](../swaram-service/routes/authRoutes.js)  
**Controller:** [authController.js](../swaram-service/controllers/authController.js)

#### POST /api/auth/register

**Purpose:** Create new user account

**Request Body:**

- email (string, required, unique)
- password (string, required, min 6 characters)

**Response:**

- user object (id, email, plan, timestamps)
- JWT token for immediate authentication

**Process:**

1. Validate email format and uniqueness
2. Hash password with bcrypt (12 rounds)
3. Create user record with default "free" plan
4. Generate JWT token
5. Return user data and token

#### POST /api/auth/login

**Purpose:** Authenticate existing user

**Request Body:**

- email (string, required)
- password (string, required)

**Response:**

- user object
- JWT token

**Process:**

1. Find user by email
2. Compare password with bcrypt
3. Generate JWT token with user payload
4. Return user and token

#### GET /api/auth/me

**Purpose:** Get current authenticated user profile

**Authentication:** Required (JWT in Authorization header)

**Response:**

- user object with all profile data

---

### Agent Management Routes

**Base Path:** `/api/agents`  
**File:** [agentRoutes.js](../swaram-service/routes/agentRoutes.js)  
**Controller:** [agentController.js](../swaram-service/controllers/agentController.js)  
**Authentication:** All routes require valid JWT

#### POST /api/agents

**Purpose:** Create new voice agent

**Request Body:**

- name (string, required)
- llmModel (string: gemini-2.5-flash | gemini-1.5-pro)
- llmApiKey (string, required) - Will be encrypted
- systemPrompt (text)
- welcomeMessage (text)
- sarvamApiKey (string, required) - Will be encrypted
- sttLanguageCode (string: en-IN, hi-IN, etc.)
- ttsVoice (string: meera, anushka, etc.)
- ttsLanguageCode (string)
- maxCallDurationSec (integer, 30-1800)
- allowedDomains (array of strings)

**Response:**

- Created agent object with embedToken

**Process:**

1. Validate all required fields
2. Generate unique slug from name
3. Encrypt API keys with AES-256-GCM
4. Generate unique embed token (UUID)
5. Create agent record in database
6. Invalidate user's agents cache (Redis)
7. Return agent data

#### GET /api/agents

**Purpose:** List all agents for authenticated user

**Response:**

- Array of agent objects (API keys excluded)

**Caching:**

- Redis cache key: `agents:user:{userId}`
- TTL: Configurable
- Invalidated on create/update/delete

#### GET /api/agents/:id

**Purpose:** Get single agent details

**Authentication:** Required, ownership verified

**Response:**

- Agent object with all fields except encrypted keys

**Caching:**

- Redis cache key: `agents:{agentId}`

#### PATCH /api/agents/:id

**Purpose:** Update existing agent configuration

**Request Body:** Partial agent fields (only send changed fields)

**Process:**

1. Verify ownership
2. If new API keys provided, encrypt them
3. Update only provided fields
4. Invalidate relevant caches
5. Return updated agent

#### DELETE /api/agents/:id

**Purpose:** Deactivate agent (soft delete)

**Process:**

1. Verify ownership
2. Set is_active = false
3. Invalidate caches
4. Sessions remain in database for historical records

---

### Embed Routes

**Base Path:** `/api/embed`  
**File:** [embedRoutes.js](../swaram-service/routes/embedRoutes.js)  
**Controller:** [embedController.js](../swaram-service/controllers/embedController.js)

#### POST /api/embed/token

**Purpose:** Exchange embed token for real-time voice session credentials

**Authentication:** None (public endpoint for iframe)

**Rate Limiting:** 10 requests per minute per IP

**Request Body:**

- embedToken (UUID, required) - Agent's unique embed identifier
- origin (string, optional) - Website domain requesting access

**Response:**

- rtcUrl (Real-time WebSocket URL)
- token (JWT for secure room access)
- agentName (for UI display)
- welcomeMessage (initial greeting)

**Process:**

1. Find agent by embedToken
2. Verify agent is active
3. Validate origin against allowedDomains (production only)
4. Check concurrent session quota for user's plan
5. Generate unique room name (nanoid)
6. Create real-time voice room with metadata: `{agentId, sessionId}`
7. Dispatch Python worker by name "my-agent"
8. Generate visitor JWT token for secure access
9. Create AgentSession record in database (started_at)
10. Return connection credentials

**Security Checks:**

- Origin header validation in production
- Domain whitelist enforcement
- Plan-based quota limits
- Rate limiting per IP

---

### Session Routes

**Base Path:** `/api/sessions` and `/api/agents/:agentId/sessions`  
**File:** [sessionRoutes.js](../swaram-service/routes/sessionRoutes.js)  
**Controller:** [sessionController.js](../swaram-service/controllers/sessionController.js)

#### GET /api/agents/:agentId/sessions

**Purpose:** List all sessions for specific agent

**Authentication:** Required, ownership verified

**Response:**

- Array of session objects sorted by started_at descending

**Fields:**

- id, agent_id, livekit_room_name
- visitor_identity, started_at, ended_at
- duration_sec, transcript (if requested)

#### GET /api/sessions/:sessionId

**Purpose:** Get detailed session information including transcript

**Authentication:** Required, ownership verified (via agent)

**Response:**

- Complete session object with transcript array

**Transcript Format:**

- JSON array of message objects:
  - role: "user" | "agent"
  - text: message content
  - timestamp: ISO 8601 datetime

#### PATCH /api/sessions/:sessionId/end

**Purpose:** Mark session as ended (called by worker)

**Authentication:** Worker secret header (`X-Worker-Secret`)

**Request Body:**

- transcript (array, optional)
- durationSec (integer)

**Process:**

1. Verify worker authentication
2. Update ended_at timestamp
3. Store transcript JSON
4. Calculate and store duration
5. Return success

---

### Internal Routes

**Base Path:** `/api/internal`  
**File:** [internalRoutes.js](../swaram-service/routes/internalRoutes.js)  
**Controller:** [internalController.js](../swaram-service/controllers/internalController.js)

#### GET /api/internal/agents/:id/config

**Purpose:** Retrieve decrypted agent configuration for worker

**Authentication:** Worker secret header (`X-Worker-Secret`)

**Response:**

- Complete agent configuration with decrypted API keys
- All settings needed for voice pipeline initialization

**Security:**

- Only accessible to Python worker
- NOT exposed to public internet
- API keys decrypted server-side
- Never sent to frontend

**Usage:**

- Python worker fetches this when joining LiveKit room
- Uses metadata from room to get agentId
- Initializes Gemini LLM with decrypted key
- Initializes Sarvam STT/TTS with decrypted key

---

## ⚙️ Core Services

### LiveKit Service

**File:** [livekitService.js](../swaram-service/services/livekitService.js)

**Purpose:** Manage real-time communication infrastructure

**Functions:**

**createRoom(roomName, metadata)**

- Creates new LiveKit room with custom metadata
- Metadata includes agentId and sessionId for worker context
- Returns room object with name and ID

**dispatchAgent(roomName, agentName)**

- Explicitly dispatches Python worker to specific room
- Uses LiveKit's AgentDispatchClient
- Worker name: "my-agent" (configured in worker)
- Ensures worker joins room to handle conversation

**createLiveKitToken(roomName, identity, metadata)**

- Generates JWT token for participant access
- Identity: "visitor-{randomId}" for embed users
- Grants permissions: join room, publish/subscribe audio
- Returns signed token for WebSocket authentication

**getLivekitUrl()**

- Returns WebSocket URL for client connections
- Format: `wss://testbr.beyondresume.io`

**Configuration:**

- LIVEKIT_HOST: Server hostname
- LIVEKIT_API_KEY: Admin API key
- LIVEKIT_API_SECRET: Admin API secret
- LIVEKIT_URL: WebSocket URL for clients

### Quota Service

**File:** [quotaService.js](../swaram-service/services/quotaService.js)

**Purpose:** Enforce plan-based session limits

**Plan Limits:**

- Free: 10 concurrent sessions
- Pro: 20 concurrent sessions
- Business: 100 concurrent sessions

**Functions:**

**canStartSession(userId)**

- Counts active sessions for user (ended_at IS NULL)
- Gets user's current plan
- Compares active count vs plan limit
- Returns boolean + available slots

**Usage:**

- Called before creating LiveKit room
- Prevents exceeding plan quota
- Returns 429 error if limit reached

**Future Enhancements:**

- Total monthly session limits
- Per-agent limits
- Usage-based billing integration

---

## 📊 Data Models

### Database Configuration

**ORM:** Sequelize  
**Database:** PostgreSQL  
**Schema:** voiceagent  
**Config File:** [database.js](../swaram-service/config/database.js)

### User Model

**File:** [User.js](../swaram-service/models/User.js)  
**Table:** voiceagent.users

**Fields:**

| Field         | Type      | Constraints      | Description                           |
| ------------- | --------- | ---------------- | ------------------------------------- |
| id            | UUID      | Primary Key      | Unique user identifier                |
| email         | TEXT      | Unique, Not Null | User email address                    |
| password_hash | TEXT      | Not Null         | bcrypt hashed password                |
| plan          | TEXT      | Default: 'free'  | Subscription plan (free/pro/business) |
| created_at    | TIMESTAMP | Auto             | Account creation timestamp            |
| updated_at    | TIMESTAMP | Auto             | Last update timestamp                 |

**Relationships:**

- Has many Agents (one-to-many)

**Indexes:**

- Unique index on email

### Agent Model

**File:** [Agent.js](../swaram-service/models/Agent.js)  
**Table:** voiceagent.agents

**Fields:**

| Field                 | Type        | Constraints                 | Description                         |
| --------------------- | ----------- | --------------------------- | ----------------------------------- |
| id                    | UUID        | Primary Key                 | Unique agent identifier             |
| user_id               | UUID        | Foreign Key (users.id)      | Owner user reference                |
| name                  | TEXT        | Not Null                    | Display name of agent               |
| slug                  | TEXT        | Unique                      | URL-friendly identifier             |
| llm_provider          | TEXT        | Default: 'gemini'           | AI provider (currently only Gemini) |
| llm_model             | TEXT        | Default: 'gemini-2.5-flash' | Specific model version              |
| llm_api_key_enc       | TEXT        | Encrypted                   | AES-256-GCM encrypted API key       |
| system_prompt         | TEXT        | Default: ''                 | Agent personality/instructions      |
| welcome_message       | TEXT        | Default: ''                 | Initial greeting to visitors        |
| sarvam_api_key_enc    | TEXT        | Encrypted                   | Sarvam AI credentials               |
| stt_language_code     | TEXT        | Default: 'en-IN'            | Speech recognition language         |
| tts_voice             | TEXT        | Default: 'meera'            | Voice avatar selection              |
| tts_language_code     | TEXT        | Default: 'en-IN'            | Speech synthesis language           |
| max_call_duration_sec | INTEGER     | Default: 300                | Session timeout (5 minutes default) |
| allowed_domains       | ARRAY(TEXT) | Default: []                 | Domain whitelist for embedding      |
| embed_token           | UUID        | Unique, Not Null            | Public embed identifier             |
| is_active             | BOOLEAN     | Default: true               | Soft delete flag                    |
| created_at            | TIMESTAMP   | Auto                        | Creation timestamp                  |
| updated_at            | TIMESTAMP   | Auto                        | Last modification timestamp         |

**Relationships:**

- Belongs to User (many-to-one)
- Has many AgentSessions (one-to-many)

**Indexes:**

- Unique index on slug
- Unique index on embed_token
- Index on user_id for faster queries

**Encryption Details:**

- llm_api_key_enc format: `{iv}:{tag}:{encrypted}` (base64)
- sarvam_api_key_enc format: same as above
- Decryption only server-side via internal API

### AgentSession Model

**File:** [AgentSession.js](../swaram-service/models/AgentSession.js)  
**Table:** voiceagent.agent_sessions

**Fields:**

| Field             | Type        | Constraints                                 | Description                       |
| ----------------- | ----------- | ------------------------------------------- | --------------------------------- |
| id                | UUID        | Primary Key                                 | Unique session identifier         |
| agent_id          | UUID        | Foreign Key (agents.id), SET NULL on delete | Agent reference                   |
| livekit_room_name | TEXT        | Unique                                      | LiveKit room identifier           |
| visitor_identity  | TEXT        | Not Null                                    | Participant identifier            |
| started_at        | TIMESTAMPTZ | Not Null                                    | Session start time                |
| ended_at          | TIMESTAMPTZ | Nullable                                    | Session end time (null if active) |
| duration_sec      | INTEGER     | Nullable                                    | Total duration in seconds         |
| transcript        | JSONB       | Default: []                                 | Conversation transcript array     |

**Relationships:**

- Belongs to Agent (many-to-one, nullable on delete)

**Transcript Structure:**
Each transcript entry is a JSON object:

- role: "user" or "agent"
- text: Message content
- timestamp: ISO 8601 datetime string

**Indexes:**

- Index on agent_id for session queries
- Index on started_at for chronological sorting
- Index on ended_at for active session queries (WHERE ended_at IS NULL)

**Queries:**

- Active sessions: WHERE ended_at IS NULL
- Completed sessions: WHERE ended_at IS NOT NULL
- Agent sessions: WHERE agent_id = X ORDER BY started_at DESC
- User sessions (via join): JOIN agents ON agent_id WHERE user_id = X

---

## 🔐 Security Features

### Password Security

**Implementation:** [authController.js](../swaram-service/controllers/authController.js)

**Hashing:**

- Algorithm: bcrypt
- Rounds: 12 (configurable via BCRYPT_ROUNDS env var)
- Salt: Auto-generated per password
- Never stored in plain text

**Validation:**

- Minimum length: 6 characters
- Comparison using bcrypt.compare() for timing attack resistance

### JWT Authentication

**Implementation:** [jwtUtils.js](../swaram-service/utils/jwtUtils.js) and [authMiddleware.js](../swaram-service/middleware/authMiddleware.js)

**Token Generation:**

- Algorithm: HS256 (HMAC with SHA-256)
- Secret: JWT_SECRET environment variable
- Expiration: 24 hours (configurable)
- Payload: {userId, email, iat, exp}

**Token Usage:**

- Sent in Authorization header: `Bearer <token>`
- Validated on every protected route
- User object attached to req.user

**Storage:**

- Frontend: localStorage (secure for SPA)
- Automatic inclusion in Axios requests via [axiosClient.ts](src/services/axiosClient.ts)

### API Key Encryption

**Implementation:** [encryptUtils.js](../swaram-service/utils/encryptUtils.js)

**Context 1: Database Storage (AES-256-GCM)**

**Purpose:** Encrypt sensitive API keys in database

**Algorithm:** AES-256-GCM (Galois/Counter Mode)

- Provides authentication and encryption
- Prevents tampering with encrypted data
- 32-byte key from ENCRYPTION_KEY env var (64 hex characters)

**Format:** `{iv}:{tag}:{encryptedData}` (base64 components)

- IV (Initialization Vector): 16 bytes, random per encryption
- Tag: Authentication tag for integrity verification
- Encrypted Data: Actual ciphertext

**Encrypted Fields:**

- Agent.llm_api_key_enc (Gemini API key)
- Agent.sarvam_api_key_enc (Sarvam AI key)

**Decryption:**

- Only on internal API endpoint
- Only accessible to Python worker
- Never sent to frontend
- Decrypted in memory, not logged

**Context 2: Request/Response Encryption (AES-256-CBC)**

**Purpose:** Optional body encryption for sensitive requests

**Algorithm:** AES-256-CBC (Cipher Block Chaining)

- 32-byte key from AES_SECRET env var
- IV prepended to ciphertext
- Base64 encoded output

**Middleware:** [encryptMiddleware.js](../swaram-service/middleware/encryptMiddleware.js)

### Domain Whitelisting

**Implementation:** [embedController.js](../swaram-service/controllers/embedController.js)

**Purpose:** Restrict agent embedding to authorized domains

**Configuration:**

- Per-agent allowedDomains array
- Stored in Agent.allowed_domains (PostgreSQL ARRAY type)
- Empty array = allow all domains (development mode)

**Validation:**

- Extract Origin header from embed token request
- Compare against allowedDomains list
- Reject with 403 if not whitelisted (production only)

**Example:**

- Agent A allows: ["https://example.com", "https://subdomain.example.com"]
- Request from https://malicious.com → Rejected
- Request from https://example.com → Allowed

### Rate Limiting

**Implementation:** express-rate-limit middleware

**Global Rate Limit:**

- Window: 15 minutes
- Max requests: 200 per IP
- Applies to all API routes

**Embed Endpoint Rate Limit:**

- Window: 1 minute
- Max requests: 10 per IP
- Prevents abuse of public endpoint
- Returns 429 Too Many Requests when exceeded

**Storage:**

- Memory store (default)
- Can use Redis store for distributed systems

### Worker Authentication

**Implementation:** [workerAuthMiddleware.js](../swaram-service/middleware/workerAuthMiddleware.js)

**Purpose:** Protect internal API routes from public access

**Mechanism:**

- Shared secret between backend and worker
- Header: `X-Worker-Secret: {secret}`
- Secret stored in WORKER_SECRET env var
- Must match exactly

**Protected Routes:**

- GET /api/internal/agents/:id/config
- PATCH /api/sessions/:sessionId/end

**Security:**

- Worker secret never exposed to frontend
- Different from JWT secret
- Network-level isolation recommended (private subnet)

### Security Headers

**Implementation:** Helmet.js middleware

**Headers Applied:**

- X-Content-Type-Options: nosniff
- X-Frame-Options: SAMEORIGIN (or configured)
- X-XSS-Protection: 1; mode=block
- Strict-Transport-Security: HSTS enabled
- Content-Security-Policy: (configurable)

### CORS (Cross-Origin Resource Sharing)

**Configuration:** [server.js](../swaram-service/server.js)

**Settings:**

- Allowed origins: Configurable whitelist
- Credentials: Enabled for cookies/auth
- Methods: GET, POST, PATCH, DELETE
- Headers: Authorization, Content-Type, X-Worker-Secret

**Development vs Production:**

- Development: Often allows all origins (\*)
- Production: Strict whitelist enforcement

### Plan-Based Quotas

**Implementation:** [quotaService.js](../swaram-service/services/quotaService.js)

**Purpose:** Prevent resource exhaustion and enforce subscription limits

**Enforcement:**

- Checked before creating LiveKit room
- Active sessions counted (ended_at IS NULL)
- Returns 403 Forbidden when limit reached

**Prevention:**

- DoS attacks (resource exhaustion)
- Unauthorized usage scaling
- Revenue protection (upgrade required for more capacity)

---

## 🌐 Third-Party Integrations

### LiveKit Real-Time Infrastructure

**Purpose:** WebRTC signaling, media routing, and agent orchestration

**Deployment:** Self-hosted instance at `wss://testbr.beyondresume.io`

**Components:**

**LiveKit Server**

- Handles WebRTC signaling (STUN/TURN)
- Routes audio streams between participants
- Manages room lifecycle
- Dispatches agent workers to rooms
- Provides webhook notifications

**Node.js SDK (livekit-server-sdk v2.8)**

Classes used:

- RoomServiceClient: Room creation and management
- AgentDispatchClient: Worker dispatch by name
- AccessToken: JWT generation for participants

Functions in [livekitService.js](../swaram-service/services/livekitService.js):

- Create rooms with metadata
- Dispatch workers to specific rooms
- Issue participant tokens
- Configure permissions (publish/subscribe)

**Frontend SDK (livekit-client v2.17)**

Used in [EmbedPage.tsx](src/pages/Embed/EmbedPage.tsx):

- Room connection via WebSocket
- Audio track publishing and subscription
- Data channel for transcript streaming
- Event handling (track subscribed, data received, disconnected)
- Automatic reconnection logic

**Python SDK (livekit-agents v1.3)**

Used in [agent.py](../swaram-agent-worker/agent.py):

- Worker registration with AgentServer
- Job context and room metadata access
- VoicePipelineAgent orchestration
- Audio stream processing

**Data Flow:**

1. Backend creates room with metadata: `{agentId, sessionId}`
2. Backend dispatches worker by name "my-agent"
3. Backend issues visitor JWT token
4. Visitor connects to room via WebSocket
5. Worker joins room, reads metadata
6. Worker fetches agent config from internal API
7. Worker initializes voice pipeline
8. Real-time audio exchange begins
9. Transcript sent via data channel
10. Session ends, worker calls backend to update

### Google Gemini LLM

**Purpose:** Conversational intelligence and natural language understanding

**Integration:** livekit-plugins-google

**Models Supported:**

- gemini-2.5-flash: Optimized for speed and cost, <500ms response
- gemini-1.5-flash: Faster variant of 1.5 generation
- gemini-1.5-pro: Advanced reasoning and complex instructions

**Configuration:**

- User-provided API keys (encrypted in database)
- Temperature: 0.3 (balanced creativity/consistency)
- Max tokens: Configurable
- Preemptive generation: Enabled for lower latency

**Usage in Worker:**

- Initialized in VoicePipelineAgent
- Receives user transcript from STT
- Generates conversational response
- Feeds text to TTS for speech synthesis

**Features:**

- Context window: Up to 2M tokens (model dependent)
- Streaming responses: Partial results for faster TTS
- System instructions: Custom personality via system_prompt
- Safety settings: Configurable content filtering

### Sarvam AI Voice Services

**Purpose:** Indian language speech recognition and synthesis

**Website:** https://sarvam.ai

**Integration:** Custom API integration in Python worker

**STT: Saarika v2.5 (Speech-to-Text)**

Languages Supported:

- en-IN: English (India)
- hi-IN: Hindi
- ta-IN: Tamil
- te-IN: Telugu
- kn-IN: Kannada
- bn-IN: Bengali
- mr-IN: Marathi

Features:

- Real-time streaming recognition
- High accuracy for Indian accents
- Code-switching support (mixing languages)
- Punctuation and capitalization

**TTS: Bulbul v2 (Text-to-Speech)**

Voice Avatars:

- Female: meera, anushka, riya, sonia, manisha, vidya, arya
- Male: kairav, arjun, abhilash, karun, hitesh

Features:

- Neural voice synthesis
- Natural prosody and intonation
- Expressive speech (emotion capable)
- Low latency generation

Languages:

- Same as STT (en-IN, hi-IN, ta-IN, te-IN, kn-IN, bn-IN, mr-IN)

**Configuration:**

- User-provided API keys (encrypted)
- Language codes set per agent
- Voice avatar selection in creation wizard

**Usage in Worker:**

- STT: Converts visitor speech to text
- Text → Gemini for response generation
- Response text → TTS for audio
- Audio played to visitor via LiveKit

### PostgreSQL Database

**Purpose:** Primary persistent data store

**Schema:** voiceagent

**Tables:** 3 (users, agents, agent_sessions)

**Configuration:** [database.js](../swaram-service/config/database.js)

**Connection:**

- Host: Configurable via DB_HOST
- Port: 5432 (default)
- Username: DB_USER env var
- Password: DB_PASSWORD env var
- Database: DB_NAME env var

**ORM:** Sequelize

**Features:**

- Automatic schema synchronization (development)
- Migrations recommended for production
- Connection pooling
- Transaction support

**Initialization:**

- SQL file execution for schema setup
- Model associations (foreign keys, relationships)
- Indexes for performance

### Redis Cache

**Purpose:** Performance optimization and distributed state

**Implementation:** [redis.js](../swaram-service/config/redis.js)

**Configuration:**

- Host: REDIS_HOST env var
- Port: REDIS_PORT (default 6379)
- Password: REDIS_PASSWORD (optional)
- Can be disabled: DISABLE_REDIS=1

**Usage:**

**Response Caching** ([cacheMiddleware.js](../swaram-service/middleware/cacheMiddleware.js))

- Cache keys:
  - `agents:user:{userId}` - User's agent list
  - `agents:{agentId}` - Individual agent data
- TTL: Configurable (default 300 seconds)
- Invalidation: On create/update/delete operations

**Rate Limiting** (optional)

- Store for express-rate-limit
- Distributed rate limiting across instances
- Persistent counters

**Benefits:**

- Reduced database load
- Faster response times for repeated queries
- Horizontal scaling support

**Fallback:**

- If Redis unavailable, app continues without caching
- Error handling prevents crashes

---

## 🤖 Agent Capabilities

### Voice Interaction

**Real-Time Conversation:**

- Bidirectional audio streaming via WebRTC
- Sub-500ms latency from speech to response
- Voice Activity Detection (Silero VAD)
- Automatic turn-taking with multilingual turn detection

**Speech Recognition (STT):**

- Powered by Sarvam AI Saarika v2.5
- 7+ Indian languages plus English
- Real-time streaming recognition
- Noise robustness for various environments

**Speech Synthesis (TTS):**

- Powered by Sarvam AI Bulbul v2
- Multiple voice avatars (male/female)
- Neural voice quality
- Expressive and natural intonation

**Audio Processing:**

- Echo cancellation
- Noise suppression
- Automatic gain control
- Adaptive bitrate streaming

### Language Support

**Supported Languages:**

| Language        | STT Code | TTS Code | Native Name |
| --------------- | -------- | -------- | ----------- |
| English (India) | en-IN    | en-IN    | English     |
| Hindi           | hi-IN    | hi-IN    | हिन्दी      |
| Tamil           | ta-IN    | ta-IN    | தமிழ்       |
| Telugu          | te-IN    | te-IN    | తెలుగు      |
| Kannada         | kn-IN    | kn-IN    | ಕನ್ನಡ       |
| Bengali         | bn-IN    | bn-IN    | বাংলা       |
| Marathi         | mr-IN    | mr-IN    | मराठी       |

**Features:**

- Independent input/output language selection
- Code-switching support (mixing languages)
- Regional accent handling
- Translation scenarios (speak Hindi, respond in English)

### Conversational Intelligence

**LLM Integration:**

- Powered by Google Gemini models
- Context-aware conversation
- Long context window (up to 2M tokens)
- Streaming response generation

**Customization:**

- System Prompt: Define agent personality, expertise, boundaries
- Welcome Message: First impression and engagement
- Temperature: Control response creativity (default 0.3)

**Capabilities:**

- Question answering
- Task guidance
- Information collection (forms, surveys)
- Contextual conversation flow
- Multi-turn dialogue management

**Example Personalities:**

- Customer support agent
- Event registration assistant
- FAQ answering bot
- Portfolio introduction agent
- Lead qualification specialist

### Session Management

**Duration Control:**

- Configurable max duration (30-1800 seconds)
- Default: 300 seconds (5 minutes)
- Automatic session termination on timeout
- User-initiated end call

**Session Tracking:**

- Start timestamp (TIMESTAMPTZ)
- End timestamp (nullable for active sessions)
- Total duration calculation
- Visitor identity tracking

**Transcript Storage:**

- Full conversation history in JSONB
- Structured format with roles and timestamps
- Available for analytics and review
- Privacy-compliant storage

### Embedding & Deployment

**Integration Method:**

- iframe embed code
- One-line implementation
- No JavaScript knowledge required

**Embed Token:**

- Unique UUID per agent
- Public identifier (safe to expose)
- Used in embed API endpoint

**Example Embed Code:**

```
<iframe src="https://app.example.com/embed?token={embedToken}"
        width="400" height="600" frameborder="0">
</iframe>
```

**Domain Security:**

- Whitelist authorized domains
- Origin header validation
- Prevents unauthorized usage

**Customization:**

- iframe size adjustable
- Responsive design adapts to container
- Mobile-friendly interface

### Analytics & Insights

**Session Metrics:**

- Total conversation count
- Average session duration
- Completion rate (vs abandoned)
- Unique visitor count

**Agent Performance:**

- Per-agent session count
- 30-day rolling window stats
- Status indicators (Active/Idle)

**Data Export:**

- Session transcripts available via API
- Structured JSON format
- Integration-friendly for CRM/analytics tools

**Future Capabilities (Planned):**

- Sentiment analysis
- Conversation quality scoring
- Topic extraction
- User intent classification

### Security & Privacy

**Data Isolation:**

- Multi-tenant architecture
- User data segregated by user_id
- Agent ownership verification on all operations

**API Key Security:**

- Encrypted at rest (AES-256-GCM)
- Never exposed to frontend
- Decrypted only for worker initialization

**Visitor Privacy:**

- Anonymous identities (visitor-{randomId})
- No PII required to use agent
- Transcripts accessible only to agent owner

**Compliance:**

- GDPR-friendly data practices
- Configurable data retention
- Session deletion available

---

## 📝 Summary

Swaram Voice Agent Platform is a **production-ready, multi-tenant SaaS solution** for deploying AI-powered voice agents on websites. It combines cutting-edge AI technologies (Google Gemini, Sarvam AI) with robust infrastructure (LiveKit, PostgreSQL, Redis) to deliver:

✅ **Low-latency voice interaction** (<500ms)  
✅ **10+ language support** including major Indian languages  
✅ **Simple iframe embedding** with one-line integration  
✅ **Enterprise-grade security** with encryption and domain whitelisting  
✅ **Flexible customization** via system prompts and voice selection  
✅ **Comprehensive analytics** for performance monitoring  
✅ **Scalable architecture** with plan-based quotas

**Target Users:**

- Businesses adding voice AI to websites
- Developers building conversational interfaces
- Event organizers needing registration assistants
- Customer support teams automating FAQs

**Tech Stack Highlights:**

- Frontend: React 19 + TypeScript + Vite
- Backend: Node.js + Express + PostgreSQL + Redis
- Worker: Python + LiveKit Agents + Gemini + Sarvam AI
- Infrastructure: Self-hosted LiveKit for WebRTC

**File Structure:**

- [swaram-ui/](.) - React frontend application
- [swaram-service/](../swaram-service/) - Node.js backend API
- [swaram-agent-worker/](../swaram-agent-worker/) - Python voice agent worker

For technical implementation details, see:

- [frontend_walkthrough.md](frontend_walkthrough.md) - Frontend architecture
- [voice-agent-platform-docs.md](../voice-agent-platform-docs.md) - Platform implementation guide
- [USAGE_GUIDE.md](USAGE_GUIDE.md) - End-user guide

---

**Document Version:** 1.0  
**Platform Version:** Production Ready  
**Last Review:** February 20, 2026
