// src/pages/Dashboard/ProfilePage.tsx
import { useState } from "react";
import Layout from "../../components/layout/Layout";
import { useAuth } from "../../components/context/AuthContext";
import { User, Shield, CreditCard, Key } from "lucide-react";
import "./ProfilePage.css";

const ProfilePage = () => {
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);

  const mockApiKey = "va_live_4f8k2m9n3p6q7r5t";

  const handleCopy = () => {
    navigator.clipboard.writeText(mockApiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Layout>
      <div className="profile-page">
        <header className="page-header">
          <h1 className="page-title">Profile</h1>
          <p className="page-subtitle">Manage your account and developer credentials</p>
        </header>

        <div className="profile-grid">
          {/* Account Details */}
          <div className="profile-card animate-in">
            <div className="card-header">
              <div className="card-icon-wrapper">
                <User size={18} />
              </div>
              <h3 className="card-title">Personal Information</h3>
            </div>
            <div className="card-body">
              <div className="info-field">
                <label>Email Address</label>
                <div className="field-value">{user?.email || "user@example.com"}</div>
              </div>
              <div className="info-field">
                <label>Organization</label>
                <div className="field-value">Default Workspace</div>
              </div>
            </div>
          </div>

          {/* API Keys */}
          <div className="profile-card animate-in" style={{ animationDelay: '100ms' }}>
            <div className="card-header">
              <div className="card-icon-wrapper">
                <Key size={18} />
              </div>
              <h3 className="card-title">Developer Credentials</h3>
            </div>
            <div className="card-body">
              <p className="field-desc">Use this key to authenticate with the Swaram API.</p>
              <div className="api-key-wrapper">
                <code className="api-key">{mockApiKey}</code>
                <button className="copy-btn" onClick={handleCopy}>
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
            </div>
          </div>

          {/* Subscription */}
          <div className="profile-card animate-in" style={{ animationDelay: '200ms' }}>
            <div className="card-header">
              <div className="card-icon-wrapper">
                <CreditCard size={18} />
              </div>
              <h3 className="card-title">Subscription</h3>
            </div>
            <div className="card-body">
              <div className="plan-badge">Free Plan</div>
              <p className="field-desc">You are currently using the limited starter plan.</p>
              <button className="btn-primary" style={{ width: '100%', marginTop: '16px' }}>
                Upgrade to Pro
              </button>
            </div>
          </div>

          {/* Security */}
          <div className="profile-card animate-in" style={{ animationDelay: '300ms' }}>
            <div className="card-header">
              <div className="card-icon-wrapper">
                <Shield size={18} />
              </div>
              <h3 className="card-title">Account Security</h3>
            </div>
            <div className="card-body">
              <button className="btn-secondary" style={{ width: '100%' }}>
                Change Password
              </button>
              <button className="btn-ghost" style={{ width: '100%', marginTop: '8px', color: 'var(--error)' }}>
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
